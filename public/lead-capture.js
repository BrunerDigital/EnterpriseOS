(function () {
  function utmData() {
    var params = new URLSearchParams(window.location.search);
    var keys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gclid", "fbclid"];
    var data = {};

    keys.forEach(function (key) {
      var fromUrl = params.get(key);
      if (fromUrl) {
        window.localStorage.setItem("bd_" + key, fromUrl);
      }
      data[key] = fromUrl || window.localStorage.getItem("bd_" + key) || "";
    });

    return data;
  }

  function serialize(form) {
    var data = utmData();
    new FormData(form).forEach(function (value, key) {
      data[key] = value;
    });
    data.page_url = window.location.href;
    data.referrer = document.referrer || "";
    data.source = data.source || form.getAttribute("data-source") || document.title;
    data.thank_you_path = data.thank_you_path || form.getAttribute("data-thank-you") || "/demo/thank-you/";
    return data;
  }

  function status(form, message, isError) {
    var el = form.querySelector("[data-lead-status]");
    if (!el) return;
    el.textContent = message;
    el.classList.toggle("text-rose-300", Boolean(isError));
    el.classList.toggle("text-emerald-300", !isError);
  }

  document.addEventListener("submit", function (event) {
    var form = event.target;
    if (!form.matches("[data-lead-form]")) return;

    event.preventDefault();
    status(form, "Sending...", false);

    fetch(form.getAttribute("action") || "/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(serialize(form))
    })
      .then(function (response) {
        return response.json().then(function (json) {
          if (!response.ok || !json.success) {
            throw new Error(json.message || "Submission failed.");
          }
          return json;
        });
      })
      .then(function (json) {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "bruner_digital_lead_submitted",
          lead_id: json.lead_id || "",
          source: json.source || form.getAttribute("data-source") || ""
        });

        if (typeof window.gtag === "function") {
          window.gtag("event", "bruner_digital_lead_submitted", {
            lead_id: json.lead_id || "",
            source: json.source || form.getAttribute("data-source") || ""
          });
        }

        if (typeof window.fbq === "function") {
          window.fbq("track", "Lead", {
            content_name: json.source || form.getAttribute("data-source") || "Bruner Digital Funnel"
          });
        }

        status(form, json.message || "Thanks. Your request was received.", false);

        if (json.redirect) {
          window.setTimeout(function () {
            window.location.href = json.redirect;
          }, 650);
        }
      })
      .catch(function (error) {
        status(form, error.message || "Something went wrong. Please try again.", true);
      });
  });
})();
