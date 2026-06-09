"use client";

import { useEffect } from "react";

const styleId = "nrw-estimate-enhancer-styles";

export function EstimateFormEnhancer() {
  useEffect(() => {
    ensureEnhancerStyles();

    const form = document.querySelector<HTMLFormElement>("#estimate");
    const offerCard = document.querySelector<HTMLElement>(".offer-card");
    const uploadInput = form?.querySelector<HTMLInputElement>('input[name="photos"]');
    const uploadBox = form?.querySelector<HTMLElement>(".upload-box");

    if (form) {
      form.enctype = "multipart/form-data";
      installFormCue(form);
    }

    if (uploadInput) {
      uploadInput.accept = "image/*";
      uploadInput.multiple = true;
      installUploadPreview(uploadInput, uploadBox);
    }

    if (uploadBox) {
      installUploadCue(uploadBox);
    }

    if (offerCard) {
      installCouponCue(offerCard);
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

function installCouponCue(offerCard: HTMLElement) {
  if (offerCard.querySelector(".nrw-coupon-cue")) {
    return;
  }

  const cue = document.createElement("div");
  cue.className = "nrw-coupon-cue";
  cue.innerHTML = `
    <img src="/images/estimate-coupon-proposal.svg" alt="15% off coupon opens the online estimate and proposal workflow" />
    <span>Tap the 15% coupon to start the online estimate</span>
  `;
  offerCard.appendChild(cue);
}

function installFormCue(form: HTMLFormElement) {
  if (form.querySelector(".nrw-form-cue")) {
    return;
  }

  const heading = form.querySelector("h2");
  const cue = document.createElement("div");
  cue.className = "nrw-form-cue";
  cue.innerHTML = `
    <strong>Online Estimate Center</strong>
    <span>Contact info, floor details, measurements, and phone photos all go in one place.</span>
  `;
  heading?.insertAdjacentElement("afterend", cue);
}

function installUploadCue(uploadBox: HTMLElement) {
  if (uploadBox.querySelector(".nrw-upload-cue")) {
    return;
  }

  const cue = document.createElement("div");
  cue.className = "nrw-upload-cue";
  cue.innerHTML = `
    <img src="/images/estimate-upload-phone.svg" alt="Upload project photos from your phone" />
    <strong>Tap here to add floor photos</strong>
    <span>Close-up, far-away, and damage/detail photos help us price faster.</span>
  `;
  uploadBox.insertBefore(cue, uploadBox.querySelector("input"));
}

function installUploadPreview(uploadInput: HTMLInputElement, uploadBox?: HTMLElement | null) {
  if (!uploadBox || uploadBox.querySelector(".nrw-upload-preview")) {
    return;
  }

  const preview = document.createElement("div");
  preview.className = "nrw-upload-preview";
  preview.textContent = "No photos selected yet.";
  uploadBox.appendChild(preview);

  uploadInput.addEventListener("change", () => {
    const files = Array.from(uploadInput.files || []);
    preview.textContent = files.length
      ? `${files.length} photo${files.length === 1 ? "" : "s"} selected: ${files.map((file) => file.name).slice(0, 3).join(", ")}${files.length > 3 ? "..." : ""}`
      : "No photos selected yet.";
  });
}

function ensureEnhancerStyles() {
  if (document.getElementById(styleId)) {
    return;
  }

  const style = document.createElement("style");
  style.id = styleId;
  style.textContent = `
    .offer-card{position:relative;isolation:isolate;overflow:hidden}.nrw-coupon-cue{display:grid;grid-template-columns:86px minmax(0,1fr);gap:12px;align-items:center;margin-top:14px;padding:10px;border:1px solid rgba(93,233,255,.46);border-radius:7px;background:rgba(2,10,12,.58);color:#eaffff}.nrw-coupon-cue img{width:86px;height:58px;object-fit:cover;border-radius:5px;box-shadow:0 10px 24px rgba(0,0,0,.3)}.nrw-coupon-cue span{font-size:.72rem;font-weight:900;line-height:1.2;text-transform:uppercase;letter-spacing:0}.nrw-form-cue{margin:8px 0 14px;padding:10px 12px;border-left:4px solid #00a8d8;background:rgba(0,168,216,.1);color:#f7fbfc}.nrw-form-cue strong,.nrw-form-cue span{display:block}.nrw-form-cue strong{font-size:.82rem;text-transform:uppercase}.nrw-form-cue span{margin-top:3px;font-size:.76rem;line-height:1.35;color:rgba(247,251,252,.78)}.upload-box{position:relative;overflow:hidden}.nrw-upload-cue{display:grid;gap:9px;margin:10px 0 12px;padding:10px;border:1px solid rgba(0,168,216,.42);border-radius:8px;background:linear-gradient(135deg,rgba(0,168,216,.14),rgba(199,116,41,.12));text-align:left}.nrw-upload-cue img{display:block;width:100%;max-height:118px;object-fit:cover;border-radius:7px;box-shadow:0 12px 24px rgba(0,0,0,.22)}.nrw-upload-cue strong{font-size:.82rem;color:#fff;text-transform:uppercase}.nrw-upload-cue span{font-size:.76rem;line-height:1.35;color:rgba(255,255,255,.78)}.nrw-upload-preview{margin-top:8px;padding:8px 10px;border-radius:6px;background:rgba(255,255,255,.1);font-size:.72rem;font-weight:800;line-height:1.35;color:#eaffff}@media(max-width:720px){.nrw-coupon-cue{grid-template-columns:74px minmax(0,1fr)}.nrw-coupon-cue img{width:74px;height:54px}.nrw-upload-cue img{max-height:96px}}
  `;
  document.head.appendChild(style);
}
