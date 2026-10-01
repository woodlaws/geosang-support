"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

type Props = { measurementId: string };

export function GoogleAnalyticsPageView({ measurementId }: Props) {
  const pathname = usePathname();
  const lastTrackedPath = useRef<string | null>(null);

  useEffect(() => {
    if (!window.gtag || lastTrackedPath.current === pathname) return;

    lastTrackedPath.current = pathname;
    window.gtag("event", "page_view", {
      send_to: measurementId,
      page_location: window.location.href,
      page_path: `${window.location.pathname}${window.location.search}`,
      page_title: document.title,
    });
  }, [measurementId, pathname]);

  return null;
}
