(function () {
  var requests = new WeakMap();
  var attribution = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
  var walkthroughForm = document.querySelector("[data-walkthrough-form]");
  if (!walkthroughForm) return;
  walkthroughForm.querySelector("button[type=submit]").disabled = false;

  function payloadFor(form) {
    var values = Object.fromEntries(new FormData(form));
    var params = new URLSearchParams(window.location.search);
    attribution.forEach(function (key) {
      var value = params.get(key)?.trim();
      var format = key === "utm_term" ? /^[A-Za-z0-9][A-Za-z0-9 ._+/-]{0,119}$/ : /^[A-Za-z0-9][A-Za-z0-9._-]{0,119}$/;
      if (value && format.test(value)) values[key] = value;
    });
    return values;
  }

  function status(form, message, isError) {
    var element = form.querySelector("[data-lead-status]");
    element.textContent = message;
    element.classList.toggle("text-rose-300", isError);
    element.classList.toggle("text-emerald-300", !isError);
  }

  document.addEventListener("submit", async function (event) {
    var form = event.target;
    if (!form.matches("[data-walkthrough-form]")) return;
    event.preventDefault();

    var button = form.querySelector("button[type=submit]");
    if (button.disabled) return;
    button.disabled = true;
    form.setAttribute("aria-busy", "true");
    status(form, "Sending…", false);

    try {
      var values = payloadFor(form);
      var snapshot = JSON.stringify(values);
      var prior = requests.get(form);
      var requestId = prior?.snapshot === snapshot ? prior.id : window.crypto.randomUUID();
      requests.set(form, { snapshot: snapshot, id: requestId });
      var response = await fetch(form.getAttribute("action"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, request_id: requestId }),
        signal: AbortSignal.timeout(15000)
      });
      var result = await response.json();
      if (!response.ok || !result.accepted || result.receipt_id !== requestId) {
        throw new Error(result.message || "We could not confirm your request. Please retry.");
      }

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: "digital360_walkthrough_request_acknowledged", surface: "demo" });
      status(form, result.message + " Receipt " + result.receipt_id + ".", false);
      window.location.assign("/demo/thank-you/");
    } catch (error) {
      var message = error.name === "TimeoutError" || error instanceof TypeError || error instanceof SyntaxError
        ? "The request could not be confirmed. Retry to check the same request."
        : error.message;
      status(form, message, true);
      button.disabled = false;
    } finally {
      form.removeAttribute("aria-busy");
    }
  });
})();
