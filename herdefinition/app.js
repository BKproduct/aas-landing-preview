(function () {
  const PASS = "herdefinition2026";
  const KEY = "herdefinition-draft-auth";

  function unlock() {
    document.getElementById("gate")?.classList.add("hidden");
    document.body.classList.remove("gate-locked");
    if (window.location.hash) {
      window.setTimeout(() => {
        document.querySelector(window.location.hash)?.scrollIntoView({ block: "start" });
      }, 80);
    }
  }

  window.checkGate = function () {
    const input = document.getElementById("gate-input");
    const err = document.getElementById("gate-err");
    if (!input) return;

    if (input.value.trim() === PASS) {
      try {
        sessionStorage.setItem(KEY, "1");
      } catch (_) {}
      unlock();
      if (err) err.textContent = "";
    } else if (err) {
      err.textContent = "Incorrect access code.";
    }
  };

  document.addEventListener("DOMContentLoaded", () => {
    if (window.location.protocol === "file:" && new URLSearchParams(window.location.search).get("qa") === "1") {
      unlock();
    }

    try {
      if (sessionStorage.getItem(KEY) === "1") {
        unlock();
      }
    } catch (_) {}

    document.getElementById("gate-input")?.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        window.checkGate();
      }
    });

    const topbar = document.querySelector(".topbar");
    const revealNodes = document.querySelectorAll(".reveal");

    const onScroll = () => {
      if (!topbar) return;
      topbar.classList.toggle("is-scrolled", window.scrollY > 12);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    if (revealNodes.length) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12 }
      );

      revealNodes.forEach((node) => observer.observe(node));
    }
  });
})();
