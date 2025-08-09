document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll(".fade-in");
    sections.forEach((section, i) => {
        setTimeout(() => {
            section.style.animationDelay = `${i * 0.3}s`;
            section.classList.add("visible");
        }, 200);
    });

    const themeToggle = document.getElementById("theme-toggle");
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark");
        themeToggle.textContent = 
            document.body.classList.contains("dark") ? "☀ Light Mode" : "🌙 Dark Mode";
    });
});
