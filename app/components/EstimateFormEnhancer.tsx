"use client";

import { useEffect } from "react";

const styleId = "nrw-estimate-enhancer-styles";
const signUpScheduleImage = "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/nashville-resin-worx-sign-up-schedule-job.png?v=1780967924";

export function EstimateFormEnhancer() {
  useEffect(() => {
    ensureEnhancerStyles();
    installSignUpScheduleImage();

    const form = document.querySelector<HTMLFormElement>("#estimate");
    const offerCard = document.querySelector<HTMLElement>(".offer-card");
    const uploadInput = form?.querySelector<HTMLInputElement>('input[name="photos"]');
    const uploadBox = form?.querySelector<HTMLElement>(".upload-box");

    if (form) {
      form.enctype = "multipart/form-data";
    }

    if (uploadInput) {
      uploadInput.accept = "image/*";
      uploadInput.multiple = true;
      installUploadPreview(uploadInput, uploadBox);
    }

    if (!form || !offerCard) {
      return;
    }

    const openEstimateForm = (event?: Event) => {
      const target = event?.target as HTMLElement | null;

      if (target?.closest("a, button, input, select, textarea, label")) {
        return;
      }

      event?.preventDefault();
      form.scrollIntoView({ behavior: "smooth", block: "start" });
      window.setTimeout(() => {
        form.querySelector<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>("input, select, textarea")?.focus();
      }, 350);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter" || event.key === " ") {
        openEstimateForm(event);
      }
    };

    offerCard.setAttribute("role", "button");
    offerCard.setAttribute("tabindex", "0");
    offerCard.setAttribute("aria-label", "Claim 15% off and open the online estimate form");
    offerCard.style.cursor = "pointer";
    offerCard.addEventListener("click", openEstimateForm);
    offerCard.addEventListener("keydown", handleKeyDown);

    return () => {
      offerCard.removeEventListener("click", openEstimateForm);
      offerCard.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return null;
}

function installSignUpScheduleImage() {
  const stepCards = Array.from(document.querySelectorAll<HTMLElement>(".step-card"));
  const signUpCard = stepCards.find((card) => card.querySelector("h3")?.textContent?.trim() === "Sign Up & Schedule Job");
  const image = signUpCard?.querySelector<HTMLImageElement>("img");

  if (!image || image.src === signUpScheduleImage) {
    return;
  }

  image.src = signUpScheduleImage;
  image.alt = "Nashville Resin Worx sign up and schedule a job";
}

function installUploadPreview(uploadInput: HTMLInputElement, uploadBox?: HTMLElement | null) {
  if (!uploadBox || uploadBox.querySelector(".nrw-upload-preview")) {
    return;
  }

  const preview = document.createElement("div");
  preview.className = "nrw-upload-preview";
  preview.textContent = "Photos optional. You can submit without images.";
  uploadBox.appendChild(preview);

  uploadInput.addEventListener("change", () => {
    const files = Array.from(uploadInput.files || []);
    preview.textContent = files.length
      ? `${files.length} photo${files.length === 1 ? "" : "s"} selected.`
      : "Photos optional. You can submit without images.";
  });
}

function ensureEnhancerStyles() {
  if (document.getElementById(styleId)) {
    return;
  }

  const style = document.createElement("style");
  style.id = styleId;
  style.textContent = `
    .nrw-upload-preview{margin-top:6px;font-size:.68rem;font-weight:800;line-height:1.25;color:rgba(255,255,255,.72)}
  `;
  document.head.appendChild(style);
}
