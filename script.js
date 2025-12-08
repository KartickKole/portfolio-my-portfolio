document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const toggleBtn = document.getElementById("theme-toggle");
    const yearSpan = document.getElementById("year");
    const navToggle = document.getElementById("nav-toggle");
    const navLinks = document.getElementById("nav-links");

    /* Footer year */
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    /* Saved theme */
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
        body.classList.add("light");
    }

    /* Theme icon */
    function updateIcon() {
        if (!toggleBtn) return;
        toggleBtn.textContent = body.classList.contains("light") ? "☀️" : "🌙";
    }
    updateIcon();

    /* Theme toggle click */
    if (toggleBtn) {
        toggleBtn.addEventListener("click", () => {
            body.classList.toggle("light");
            const isLight = body.classList.contains("light");
            localStorage.setItem("theme", isLight ? "light" : "dark");
            updateIcon();
        });
    }

    /* =========================
       Mobile nav toggle
       ========================= */
    if (navToggle && navLinks) {
        navToggle.addEventListener("click", () => {
            navLinks.classList.toggle("open");

            // Change icon (bars <-> X)
            const icon = navToggle.querySelector("i");
            if (icon) {
                icon.classList.toggle("fa-bars");
                icon.classList.toggle("fa-xmark");
            }
        });

        // Close menu when clicking link on mobile
        navLinks.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                if (navLinks.classList.contains("open")) {
                    navLinks.classList.remove("open");
                    const icon = navToggle.querySelector("i");
                    if (icon) {
                        icon.classList.add("fa-bars");
                        icon.classList.remove("fa-xmark");
                    }
                }
            });
        });
    }

    /* =========================
       Contact form + EmailJS
       ========================= */
    const contactForm = document.getElementById("contact-form");
    const formNote = document.querySelector(".form-note");

    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();

            if (formNote) {
                formNote.textContent = "Sending message...";
            }

            const serviceId = "service_796qrch";
            const templateId = "template_2ctfulb";

            if (typeof emailjs === "undefined") {
                console.error("EmailJS library not loaded.");
                if (formNote) {
                    formNote.textContent =
                        "❌ Message send failed. Email service not configured.";
                }
                return;
            }

            emailjs
                .sendForm(serviceId, templateId, "#contact-form")
                .then(() => {
                    if (formNote) {
                        formNote.textContent = "✅ Message sent successfully!";
                    }
                    contactForm.reset();
                })
                .catch((error) => {
                    console.error("EmailJS error:", error);
                    if (formNote) {
                        formNote.textContent =
                            "❌ Message send failed. Please try again later.";
                    }
                });
        });
    }
});
