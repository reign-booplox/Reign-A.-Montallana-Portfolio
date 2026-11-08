
// ========================================
// REIGN MONTALLANA - PORTFOLIO JAVASCRIPT
// ========================================

document.addEventListener("DOMContentLoaded", function () {

    // ========================================
    // 1. SCROLL REVEAL ANIMATION
    // ========================================

    const revealElements = document.querySelectorAll(
        "main > section, .art-card, .video-card"
    );

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!prefersReducedMotion && "IntersectionObserver" in window) {

        const revealStyle = document.createElement("style");

        revealStyle.textContent = `
            .js-reveal {
                opacity: 0;
                transform: translateY(30px);
                transition: opacity 0.7s ease, transform 0.7s ease;
            }

            .js-reveal.is-visible {
                opacity: 1;
                transform: translateY(0);
            }

            @media (prefers-reduced-motion: reduce) {
                .js-reveal {
                    opacity: 1;
                    transform: none;
                    transition: none;
                }
            }
        `;

        document.head.appendChild(revealStyle);

        const revealObserver = new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }

                });

            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach(function (element) {
            element.classList.add("js-reveal");
            revealObserver.observe(element);
        });

    }


    // ========================================
    // 2. FLOATING BACK-TO-TOP BUTTON
    // ========================================

    const backToTopButton = document.createElement("button");

    backToTopButton.textContent = "↑";
    backToTopButton.setAttribute("aria-label", "Back to top");

    backToTopButton.style.cssText = `
        position: fixed;
        bottom: 25px;
        right: 25px;
        width: 45px;
        height: 45px;
        border: none;
        border-radius: 50%;
        background-color: #7165ff;
        color: white;
        font-size: 25px;
        cursor: pointer;
        display: none;
        z-index: 1000;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    `;

    document.body.appendChild(backToTopButton);

    window.addEventListener("scroll", function () {

        if (window.scrollY > 300) {
            backToTopButton.style.display = "block";
        } else {
            backToTopButton.style.display = "none";
        }

    });

    backToTopButton.addEventListener("click", function () {

        window.scrollTo({
            top: 0,
            behavior: prefersReducedMotion ? "instant" : "smooth"
        });

    });


    // ========================================
    // 3. AUTOMATICALLY PAUSE OFF-SCREEN VIDEOS
    // ========================================

    const videos = document.querySelectorAll("video");

    if ("IntersectionObserver" in window) {

        const videoObserver = new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    const video = entry.target;

                    if (!entry.isIntersecting && !video.paused) {
                        video.pause();
                    }

                });

            },
            {
                threshold: 0.15
            }
        );

        videos.forEach(function (video) {
            videoObserver.observe(video);
        });

    }

});
