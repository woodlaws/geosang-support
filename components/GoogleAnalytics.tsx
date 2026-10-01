import Script from "next/script";
import { GoogleAnalyticsPageView } from "@/components/GoogleAnalyticsPageView";

const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();
const validMeasurementId = measurementId && /^G-[A-Z0-9]+$/i.test(measurementId) ? measurementId : null;

export function GoogleAnalytics() {
  if (!validMeasurementId) return null;

  return (
    <>
      <Script
        id="ga4-loader"
        strategy="beforeInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${validMeasurementId}`}
      />
      <Script
        id="ga4-bootstrap"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${validMeasurementId}',{send_page_view:false});`,
        }}
      />
      <GoogleAnalyticsPageView measurementId={validMeasurementId} />
    </>
  );
}
