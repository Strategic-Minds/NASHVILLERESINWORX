"use client";

import { useEffect } from "react";

const styleId = "nrw-estimate-enhancer-styles";
const signUpScheduleImage = "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/nashville-resin-worx-sign-up-schedule-job.png?v=1780967924";
const prepWorkImage = "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/nashville-resin-worx-prep-work-garage-grinder-larger.png?v=1780969460";
const baseCoatImage = "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/nashville-resin-worx-basecoat-jeremy-left-eden-spikes.png?v=1780971616";
const beautyCoatImage = "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/nashville-resin-worx-beauty-coat-gray-base-under-workers.jpg?v=1780976904";

export function EstimateFormEnhancer() {
  useEffect(() => {
    ensureEnhancerStyles();
    installProcessStepImage("Sign Up & Schedule Job", signUpScheduleImage, "Nashville Resin Worx sign up and schedule a job");
    installProcessStepImage("Prep Work", prepWorkImage, "Nashville Resin Worx prep work garage with larger concrete grinder");
    installProcessStepImage("Base Coat", baseCoatImage, "Nashville Resin Worx base coat Jeremy and Eden wearing spike shoes");
    installProcessStepImage("Beauty Coat", beautyCoatImage, "Nashville Resin Worx beauty coat over high gloss light gray epoxy base coat");

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

function installProcessStepImage(title: string, imageUrl: string, altText: string) {
  const stepCards = Array.from(document.querySelectorAll<HTMLElement>(".step-card"));
  const matchingCard = stepCards.find((card) => card.querySelector("h3")?.textContent?.trim() === title);
  const image = matchingCard?.querySelector<HTMLImageElement>("img");

  if (!image || image.src === imageUrl) {
    return;
  }

  image.src = imageUrl;
  image.alt = altText;
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
