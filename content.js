(() => {
  "use strict";

  const FOLLOWING_VARIANT = "following";
  const SOURCE_LABELS = ["for you", "fuer dich", "für dich"];

  let manualSourceSelected = false;
  let routeDebounce = 0;

  const normalize = (value) =>
    (value || "")
      .toLocaleLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, " ")
      .trim();

  const labelMatches = (value, labels) => {
    const normalized = normalize(value);
    return labels.some((label) => normalized === normalize(label));
  };

  const elementText = (element) =>
    [
      element.textContent,
      element.getAttribute("aria-label"),
      element.getAttribute("title")
    ]
      .filter(Boolean)
      .join(" ");

  const onInstagramHome = () => {
    const path = window.location.pathname.replace(/\/+$/, "");
    return path === "" || path === "/";
  };

  const redirectToFollowingVariant = () => {
    if (!onInstagramHome()) {
      manualSourceSelected = false;
      return;
    }

    if (manualSourceSelected) {
      return;
    }

    const url = new URL(window.location.href);
    const currentVariant = url.searchParams.get("variant");
    if (currentVariant) {
      return;
    }

    url.searchParams.set("variant", FOLLOWING_VARIANT);
    window.location.replace(url.toString());
  };

  const scheduleRedirect = () => {
    window.clearTimeout(routeDebounce);
    routeDebounce = window.setTimeout(redirectToFollowingVariant, 100);
  };

  const wrapHistoryMethod = (methodName) => {
    const original = window.history[methodName];
    window.history[methodName] = function wrappedHistoryMethod(...args) {
      const result = original.apply(this, args);
      scheduleRedirect();
      return result;
    };
  };

  wrapHistoryMethod("pushState");
  wrapHistoryMethod("replaceState");

  window.addEventListener("popstate", scheduleRedirect);
  window.addEventListener(
    "click",
    (event) => {
      const clicked = event.target instanceof Element ? event.target : null;
      const tab = clicked?.closest('a, button, [role="tab"], [role="button"]');
      if (tab && labelMatches(elementText(tab), SOURCE_LABELS)) {
        manualSourceSelected = true;
      }
    },
    true
  );

  scheduleRedirect();
})();
