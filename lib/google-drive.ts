import { createSign } from "crypto";

const defaultDriveFolderId = "15wlZy0-oN0aDML4hoOERGhPVe4pVwD5X";
const driveScope = "https://www.googleapis.com/auth/drive.file";
const tokenEndpoint = "https://oauth2.googleapis.com/token";
const driveFilesEndpoint = "https://www.googleapis.com/drive/v3/files";
const driveUploadEndpoint = "https://www.googleapis.com/upload/drive/v3/files";
const maxUploadBytes = 20 * 1024 * 1024;
const acceptedImageTypes = new Set(["image/jpeg", "image/png", "image/webp"]);

export type DriveUploadedFile = {
  field: "photos" | "inspirationPhotos";
  name: string;
  url: string;
  size: number;
};

export type DriveUploadResult = {
  folderUrl: string | null;
  uploadedFiles: DriveUploadedFile[];
  error: string | null;
};

type DriveFileToUpload = {
  field: "photos" | "inspirationPhotos";
  file: File;
};

type DriveConfig = {
  folderId: string;
  clientEmail: string;
  privateKey: string;
};

export async function uploadEstimatePhotosToDrive(formData: FormData): Promise<DriveUploadResult> {
  const files = getFilesToUpload(formData);
  if (!files.length) {
    return { folderUrl: null, uploadedFiles: [], error: null };
  }

  const config = getDriveConfig();
  if (!config) {
    return {
      folderUrl: null,
      uploadedFiles: [],
      error:
        "Google Drive upload is not configured. Add GOOGLE_SERVICE_ACCOUNT_EMAIL and GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY to Vercel, then share the Drive folder with that service account."
    };
  }

  try {
    const accessToken = await getAccessToken(config);
    const folder = await createEstimateFolder(accessToken, config.folderId, buildEstimateFolderName(formData));
    const uploadedFiles: DriveUploadedFile[] = [];

    for (const item of files) {
      const uploaded = await uploadDriveFile(accessToken, folder.id, item);
      uploadedFiles.push(uploaded);
    }

    return { folderUrl: folder.webViewLink, uploadedFiles, error: null };
  } catch (error) {
    return {
      folderUrl: null,
      uploadedFiles: [],
      error: error instanceof Error ? error.message : "Google Drive upload failed."
    };
  }
}

function getDriveConfig(): DriveConfig | null {
  const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID || defaultDriveFolderId;
  const jsonConfig = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;

  if (jsonConfig) {
    try {
      const parsed = JSON.parse(jsonConfig) as { client_email?: string; private_key?: string };
      if (parsed.client_email && parsed.private_key) {
        return {
          folderId,
          clientEmail: parsed.client_email,
          privateKey: normalizePrivateKey(parsed.private_key)
        };
      }
    } catch {
      return null;
    }
  }

  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;
  if (!clientEmail || !privateKey) {
    return null;
  }

  return {
    folderId,
    clientEmail,
    privateKey: normalizePrivateKey(privateKey)
  };
}

function getFilesToUpload(formData: FormData) {
  const files: DriveFileToUpload[] = [];

  for (const field of ["photos", "inspirationPhotos"] as const) {
    for (const value of formData.getAll(field)) {
      if (typeof value === "string" || !value.name || value.size <= 0) {
        continue;
      }

      if (!acceptedImageTypes.has(value.type)) {
        continue;
      }

      if (value.size > maxUploadBytes) {
        continue;
      }

      files.push({ field, file: value });
    }
  }

  return files;
}

async function getAccessToken(config: DriveConfig) {
  const now = Math.floor(Date.now() / 1000);
  const jwt = signJwt(
    {
      alg: "RS256",
      typ: "JWT"
    },
    {
      iss: config.clientEmail,
      scope: driveScope,
      aud: tokenEndpoint,
      exp: now + 3600,
      iat: now
    },
    config.privateKey
  );

  const response = await fetch(tokenEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt
    })
  });

  const body = (await response.json()) as { access_token?: string; error_description?: string; error?: string };
  if (!response.ok || !body.access_token) {
    throw new Error(body.error_description || body.error || "Google Drive token request failed.");
  }

  return body.access_token;
}

async function createEstimateFolder(accessToken: string, parentFolderId: string, name: string) {
  const response = await fetch(`${driveFilesEndpoint}?supportsAllDrives=true&fields=id,name,webViewLink`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name,
      mimeType: "application/vnd.google-apps.folder",
      parents: [parentFolderId]
    })
  });

  const body = (await response.json()) as { id?: string; webViewLink?: string; error?: { message?: string } };
  if (!response.ok || !body.id) {
    throw new Error(body.error?.message || "Could not create the Google Drive estimate folder.");
  }

  return { id: body.id, webViewLink: body.webViewLink || driveFolderUrl(body.id) };
}

async function uploadDriveFile(accessToken: string, folderId: string, item: DriveFileToUpload): Promise<DriveUploadedFile> {
  const file = item.file;
  const metadata = {
    name: `${item.field === "photos" ? "existing-floor" : "inspiration"}-${sanitizeFileName(file.name)}`,
    parents: [folderId]
  };
  const { body, boundary } = await buildMultipartBody(metadata, file);

  const response = await fetch(`${driveUploadEndpoint}?uploadType=multipart&supportsAllDrives=true&fields=id,name,webViewLink,size`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": `multipart/related; boundary=${boundary}`
    },
    body
  });

  const responseBody = (await response.json()) as { id?: string; name?: string; webViewLink?: string; error?: { message?: string } };
  if (!response.ok || !responseBody.id) {
    throw new Error(responseBody.error?.message || `Could not upload ${file.name} to Google Drive.`);
  }

  return {
    field: item.field,
    name: responseBody.name || file.name,
    url: responseBody.webViewLink || driveFolderUrl(responseBody.id),
    size: file.size
  };
}

async function buildMultipartBody(metadata: Record<string, unknown>, file: File) {
  const boundary = `nrw-${crypto.randomUUID()}`;
  const metadataPart = Buffer.from(
    `--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${JSON.stringify(metadata)}\r\n`
  );
  const fileHeader = Buffer.from(`--${boundary}\r\nContent-Type: ${file.type || "application/octet-stream"}\r\n\r\n`);
  const fileBody = Buffer.from(await file.arrayBuffer());
  const footer = Buffer.from(`\r\n--${boundary}--`);

  return {
    boundary,
    body: Buffer.concat([metadataPart, fileHeader, fileBody, footer])
  };
}

function signJwt(header: Record<string, unknown>, payload: Record<string, unknown>, privateKey: string) {
  const encodedHeader = base64Url(JSON.stringify(header));
  const encodedPayload = base64Url(JSON.stringify(payload));
  const signingInput = `${encodedHeader}.${encodedPayload}`;
  const signature = createSign("RSA-SHA256").update(signingInput).sign(privateKey, "base64url");

  return `${signingInput}.${signature}`;
}

function buildEstimateFolderName(formData: FormData) {
  const name = [formData.get("firstName"), formData.get("lastName")]
    .map((value) => String(value || "").trim())
    .filter(Boolean)
    .join(" ");
  const fullName = String(formData.get("fullName") || "").trim();
  const phone = String(formData.get("phone") || "").replace(/[^0-9]/g, "");
  const stamp = new Date().toISOString().slice(0, 10);
  const identity = sanitizeFileName(name || fullName || phone || "website-lead").slice(0, 72);

  return `${stamp} - ${identity}`;
}

function sanitizeFileName(name: string) {
  return name.replace(/[^a-zA-Z0-9._ -]/g, "-").replace(/\s+/g, " ").trim() || "upload";
}

function normalizePrivateKey(privateKey: string) {
  return privateKey.replace(/\\n/g, "\n");
}

function driveFolderUrl(id: string) {
  return `https://drive.google.com/drive/folders/${id}`;
}

function base64Url(value: string) {
  return Buffer.from(value).toString("base64url");
}
