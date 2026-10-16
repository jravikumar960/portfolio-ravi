document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("nav");
  const navLinks = nav ? nav.querySelectorAll("a") : [];

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
      menuToggle.textContent = isOpen ? "×" : "☰";
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
        menuToggle.textContent = "☰";
      });
    });
  }

  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, instance) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          instance.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("visible"));
  }

  const progress = document.getElementById("scroll-progress");
  const updateProgress = () => {
    if (!progress) return;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const percentage = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
    progress.style.width = `${Math.min(100, percentage)}%`;
  };
  window.addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();

  const roles = ["Generative AI Developer", "Machine Learning Developer", "Python Developer"];
  const roleElement = document.getElementById("rotating-role");
  let roleIndex = 0;
  if (roleElement && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.setInterval(() => {
      roleIndex = (roleIndex + 1) % roles.length;
      roleElement.animate(
        [{ opacity: 0, transform: "translateY(5px)" }, { opacity: 1, transform: "translateY(0)" }],
        { duration: 350, easing: "ease-out" }
      );
      roleElement.textContent = roles[roleIndex];
    }, 2800);
  }

  const copyButton = document.getElementById("copy-email");
  const copyStatus = document.getElementById("copy-status");
  if (copyButton) {
    copyButton.addEventListener("click", async () => {
      const email = copyButton.dataset.email;
      try {
        await navigator.clipboard.writeText(email);
        if (copyStatus) copyStatus.textContent = "Email copied.";
      } catch {
        if (copyStatus) copyStatus.textContent = `Email: ${email}`;
      }
    });
  }

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const sections = document.querySelectorAll("main section[id]");
  if ("IntersectionObserver" in window) {
    const activeObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      });
    }, { rootMargin: "-35% 0px -55% 0px" });
    sections.forEach((section) => activeObserver.observe(section));
  }
});
