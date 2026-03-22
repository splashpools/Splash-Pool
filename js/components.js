/**
 * Global Components for Splash Pools
 * This script injects the Header and Footer into placeholders.
 * It works even when opening the HTML file directly (file:// protocol).
 */

const headerHTML = `
<header>
    <div class="content header-flex">
        <a href="/" class="logo-wrapper">
            <img src="img/logo.png" alt="Splash Pools Logo" class="logo-img">
        </a>
        <button class="hamburger-btn" aria-label="Toggle navigation">
            <span class="material-symbols-outlined">menu</span>
        </button>
        <nav class="main-nav">
            <a class="nav-link" href="/">Home</a>
            <a class="nav-link" href="/services">Services</a>
            <!--<a class="nav-link" href="#">Portfolio</a>
            <a class="nav-link" href="#">Testimonials</a>-->
            <a class="nav-link" href="/contact-us">Contact</a>
            <a href="#contact" class="btn btn-primary">Get a Quote</a>
        </nav>
    </div>
</header>
`;

const footerHTML = `
<footer>
    <div class="content footer-grid">
        <div class="footer-section">
            <a href="/" class="logo-wrapper mb-10">
                <img src="img/logo-white.png" alt="Splash Pools Logo" class="logo-img">
            </a>
            <p class="text-muted" style="font-size: 0.875rem; line-height: 1.6; margin-bottom: 2rem;">
                Building premium aquatic experiences since 1998. Quality craftsmanship meets modern
                engineering in every project.
            </p>
        </div>

        <div class="footer-section">
            <h4>Quick Links</h4>
            <ul class="footer-links">
                <li><a href="/services">Services</a></li>
                <li><a href="/services#pool-opening">Pool Opening Service</a></li>
                <li><a href="/services#pool-closing">Pool Closing Service</a></li>
                <li><a href="/contact-us">Contact Us</a></li>
            </ul>
        </div>

        <div class="footer-section">
            <h4>Contact Us</h4>
            <ul class="footer-links">
                <li style="display: flex; gap: 0.75rem;"><span
                        class="material-symbols-outlined text-primary">location_on</span> P.O. Box 618, Reisterstown, MD. 21136.</li>
                <li style="display: flex; gap: 0.75rem;">
                <a class="footer-link-phone" href="tel:+14109632370">
                <span
                        class="material-symbols-outlined text-primary">call</span> +1 410 963 2370</a></li>
                <li style="display: flex; gap: 0.75rem;">
                <a class="footer-link-email" href="mailto:splashpools@live.com">
                <span
                        class="material-symbols-outlined text-primary">mail</span> splashpools@live.com</a>
                </li>
                <li style="display: flex; gap: 0.75rem;"><span
                        class="material-symbols-outlined text-primary">schedule</span> Mon - Fri: 8am - 6pm
                </li>
            </ul>
        </div>

        <div class="footer-section">
            <h4>Our Location</h4>
            <div style="width: 100%; height: 160px; border-radius: 0.75rem; overflow: hidden; filter: grayscale(1);">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZl85kPtptAGYgkSPR7qoltbl3I-iQacF2Mzb8cBe6poEILRB7ftY9yc9LWgoKXM380wpKxKjclSRuMLXdqOHNLEjTnLU_cGgb_yh85yr8CVfwYbdIWNhljhgjUN1YPsz6JP4x6pRle1HqLpkbFAvjOR3VCKesMndIENWs5A1yIwNN8fESphr1AxhISmtIygZ-dTzgVR81yiYwF_tNpjm332NMLSOXn9S7o1GfxjvMavmIB69rzMBQ1IsHar0KO4VMLpMFwlnHXg"
                    alt="Map" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
        </div>
    </div>

    <div class="max-w-1200 policy-links"
        style="padding-top: 2rem; display: flex; justify-content: space-between; align-items: center; color: var(--slate-400); font-size: 0.75rem;">
        <p>© 2026 Splash Pools & Construction Inc. All rights reserved.</p>
        <div style="display: flex; gap: 1.5rem;">
            <a href="policies.html">Policies</a>
            <!--<a href="/terms-of-service">Terms of Service</a>-->
        </div>
    </div>
</footer>
`;

document.addEventListener("DOMContentLoaded", () => {
    const headerPlaceholder = document.getElementById('header-placeholder');
    const footerPlaceholder = document.getElementById('footer-placeholder');

    if (headerPlaceholder) {
        headerPlaceholder.innerHTML = headerHTML;

        const hamburgerBtn = document.querySelector('.hamburger-btn');
        const mainNav = document.querySelector('.main-nav');
        if (hamburgerBtn && mainNav) {
            hamburgerBtn.addEventListener('click', () => {
                mainNav.classList.toggle('active');
                const icon = hamburgerBtn.querySelector('.material-symbols-outlined');
                if (mainNav.classList.contains('active')) {
                    icon.textContent = 'close';
                } else {
                    icon.textContent = 'menu';
                }
            });
        }
    }

    if (footerPlaceholder) {
        footerPlaceholder.innerHTML = footerHTML;
    }

    // Scroll Reveal Logic
    function reveal() {
        var reveals = document.querySelectorAll(".reveal");
        for (var i = 0; i < reveals.length; i++) {
            var windowHeight = window.innerHeight;
            var elementTop = reveals[i].getBoundingClientRect().top;
            var elementVisible = 150;
            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add("active");
            } else {
                reveals[i].classList.remove("active");
            }
        }
    }
    window.addEventListener("scroll", reveal);

    // Trigger once on load
    reveal();

    // AJAX Form Handling
    const forms = document.querySelectorAll('form[action^="https://formspree.io"]');
    forms.forEach(form => {
        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;

            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="material-symbols-outlined icon-small" style="animation: spin 1s linear infinite">sync</span> Sending...';

            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: new FormData(form),
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    window.location.href = 'thank-you.html';
                } else {
                    const data = await response.json();
                    alert(data.errors ? data.errors.map(e => e.message).join(", ") : "Oops! There was a problem.");
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnText;
                }
            } catch (error) {
                alert("Oops! There was a connection problem.");
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            }
        });
    });
});

// Image Modal Logic
function openImageModal(imgSrc, captionText) {
    var modal = document.getElementById("imageModal");
    var modalImg = document.getElementById("img01");
    var caption = document.getElementById("imageModalCaption");
    if (modal && modalImg && caption) {
        modal.style.display = "block";
        modalImg.src = imgSrc;
        caption.innerHTML = captionText;
    }
}

function closeImageModal() {
    var modal = document.getElementById("imageModal");
    if (modal) modal.style.display = "none";
}
