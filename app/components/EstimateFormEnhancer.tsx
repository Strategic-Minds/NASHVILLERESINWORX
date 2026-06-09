"use client";

import { useEffect } from "react";

export function EstimateFormEnhancer() {
  useEffect(() => {
    const form = document.querySelector<HTMLFormElement>("#estimate");
    const offerCard = document.querySelector<HTMLElement>(".offer-card");
    const uploadInput = form?.querySelector<HTMLInputElement>('input[name="photos"]');

    if (form) {
      form.enctype = "multipart/form-data";
    }

    if (uploadInput) {
      uploadInput.accept = "image/*";
      uploadInput.multiple = true;
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
