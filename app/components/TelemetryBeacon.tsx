"use client";

import { useEffect } from "react";

export function TelemetryBeacon() {
  useEffect(() => {
    const payload = {
      event_name: "page_view",
      path: window.location.pathname,
      referrer: document.referrer || null,
      session_id: getSessionId(),
      metadata: {
        title: document.title,
        user_agent_family: navigator.userAgentData?.brands?.[0]?.brand || "browser"
      }
    };

    fetch("/api/telemetry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true
    }).catch(() => undefined);
  }, []);

  return null;
}

function getSessionId() {
  const key = "nrw_session_id";
  const existing = window.sessionStorage.getItem(key);
  if (existing) return existing;

  const next = crypto.randomUUID();
  window.sessionStorage.setItem(key, next);
  return next;
}
