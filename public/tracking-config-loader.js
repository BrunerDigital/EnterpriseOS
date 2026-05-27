(function () {
  if (window.__digital360TrackingConfigLoader) return;
  window.__digital360TrackingConfigLoader = true;

  function loadScript(id, src, callback) {
    if (document.getElementById(id)) {
      if (callback) callback();
      return;
    }

    var script = document.createElement("script");
    script.id = id;
    script.async = true;
    script.src = src;
    if (callback) script.onload = callback;
    document.head.appendChild(script);
  }

  function configureGtag(config) {
    var gtagId = config.gaMeasurementId || config.googleAdsId;
    if (!gtagId) return;

    loadScript("digital360-gtag-loader", "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(gtagId), function () {
      window.dataLayer = window.dataLayer || [];
      window.gtag =
        window.gtag ||
        function () {
          window.dataLayer.push(arguments);
        };
      window.gtag("js", new Date());
      if (config.gaMeasurementId) window.gtag("config", config.gaMeasurementId);
      if (config.googleAdsId) window.gtag("config", config.googleAdsId);
    });
  }

  function configureMeta(config) {
    if (!config.metaPixelId || window.fbq) return;

    var fbq = function () {
      if (fbq.callMethod) {
        fbq.callMethod.apply(fbq, arguments);
      } else {
        fbq.queue.push(arguments);
      }
    };
    window.fbq = fbq;
    window._fbq = window._fbq || fbq;
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = "2.0";
    fbq.queue = [];

    loadScript("digital360-meta-pixel-loader", "https://connect.facebook.net/en_US/fbevents.js", function () {
      window.fbq("init", config.metaPixelId);
      window.fbq("track", "PageView");
    });
  }

  function configureLinkedIn(config) {
    if (!config.linkedInPartnerId || window.lintrk) return;

    window._linkedin_partner_id = config.linkedInPartnerId;
    window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
    window._linkedin_data_partner_ids.push(config.linkedInPartnerId);
    window.lintrk = function (a, b) {
      window.lintrk.q.push([a, b]);
    };
    window.lintrk.q = [];
    loadScript("digital360-linkedin-loader", "https://snap.licdn.com/li.lms-analytics/insight.min.js");
  }

  function applyConfig(config) {
    window.digital360Tracking = Object.assign({}, window.digital360Tracking, {
      googleAdsId: config.googleAdsId,
      googleAdsConversionLabel: config.googleAdsConversionLabel,
      linkedInConversionId: config.linkedInConversionId
    });

    configureGtag(config);
    configureMeta(config);
    configureLinkedIn(config);
  }

  fetch("/api/public/tracking-config", { credentials: "same-origin" })
    .then(function (response) {
      return response.ok ? response.json() : {};
    })
    .then(applyConfig)
    .catch(function () {});
})();
