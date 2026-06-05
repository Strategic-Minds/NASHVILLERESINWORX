export function canAccessContentOps(request: Request) {
  const configuredToken = process.env.CONTENT_OPS_DRY_RUN_TOKEN;

  if (!configuredToken && process.env.NODE_ENV !== "production") {
    return true;
  }

  if (!configuredToken) {
    return false;
  }

  const authorization = request.headers.get("authorization") || "";
  return authorization === `Bearer ${configuredToken}`;
}
