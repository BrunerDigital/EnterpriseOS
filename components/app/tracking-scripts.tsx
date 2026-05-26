import Script from "next/script";

function value(name: string) {
  const raw = process.env[name];
  return raw && raw.trim().length > 0 ? raw.trim() : undefined;
}

export function TrackingScripts() {
  const gaMeasurementId = value("NEXT_PUBLIC_GA_MEASUREMENT_ID");
  const googleAdsId = value("NEXT_PUBLIC_GOOGLE_ADS_ID");
  const googleAdsConversionLabel = value("NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL");
  const metaPixelId = value("NEXT_PUBLIC_META_PIXEL_ID");
  const linkedInPartnerId = value("NEXT_PUBLIC_LINKEDIN_PARTNER_ID");
  const linkedInConversionId = value("NEXT_PUBLIC_LINKEDIN_CONVERSION_ID");
  const vercelAnalyticsEnabled = process.env.NEXT_PUBLIC_ENABLE_VERCEL_ANALYTICS === "true";
  const gtagId = gaMeasurementId ?? googleAdsId;

  const clientConfig = {
    googleAdsId,
    googleAdsConversionLabel,
    linkedInConversionId
  };

  return (
    <>
      <Script
        id="digital360-tracking-config"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `window.digital360Tracking=${JSON.stringify(clientConfig)};`
        }}
      />

      {gtagId ? <Script src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gtagId)}`} strategy="afterInteractive" /> : null}
      {gtagId ? (
        <Script
          id="digital360-gtag"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());
              ${gaMeasurementId ? `gtag('config', '${gaMeasurementId}');` : ""}
              ${googleAdsId ? `gtag('config', '${googleAdsId}');` : ""}
            `
          }}
        />
      ) : null}

      {metaPixelId ? (
        <Script
          id="digital360-meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${metaPixelId}');
              fbq('track', 'PageView');
            `
          }}
        />
      ) : null}

      {linkedInPartnerId ? (
        <Script
          id="digital360-linkedin-insight"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              _linkedin_partner_id = "${linkedInPartnerId}";
              window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
              window._linkedin_data_partner_ids.push(_linkedin_partner_id);
              (function(l) {
                if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])}; window.lintrk.q=[]}
                var s = document.getElementsByTagName("script")[0];
                var b = document.createElement("script");
                b.type = "text/javascript"; b.async = true;
                b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
                s.parentNode.insertBefore(b, s);
              })(window.lintrk);
            `
          }}
        />
      ) : null}

      {vercelAnalyticsEnabled ? <Script src="/_vercel/insights/script.js" strategy="afterInteractive" /> : null}
    </>
  );
}
