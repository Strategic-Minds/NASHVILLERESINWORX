"use client";

import { useEffect } from "react";

const sessionKey = "nrw_session_id";

export function TelemetryBeacon() {
  useEffect(() => {
    if (window.location.pathname.startsWith("/admin")) {
      return;
    }

    fetch("/api/telemetry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event_name: "page_view",
        path: window.location.pathname,
        referrer: document.referrer || null,
        session_id: getSessionId(),
        metadata: { title: document.title }
      }),
      keepalive: true
    }).catch(() => undefined);
  }, []);

  return null;
}

function getSessionId() {
  try {
    const existing = window.sessionStorage.getItem(sessionKey);
    if (existing) {
      return existing;
    }

    const next = crypto.randomUUID();
    window.sessionStorage.setItem(sessionKey, next);
    return next;
  } catch {
    return null;
  }
}
