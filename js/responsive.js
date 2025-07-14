/**
 * QUICK LINK - Responsive JavaScript
 * Handles all responsive functionality for the website
 */

document.addEventListener("DOMContentLoaded", function () {
    // Add scroll class to navbar
    const navbar = document.querySelector(".navbar");

    window.addEventListener("scroll", function () {
        if (window.scrollY > 50) {
            navbar.classList.add("navbar-scrolled");
        } else {
            navbar.classList.remove("navbar-scrolled");
        }
    });

    // Animate elements on scroll
    const animateElements = document.querySelectorAll(".animate-on-scroll");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("animated");
                }
            });
        },
        {
            threshold: 0.1,
        }
    );

    animateElements.forEach((element) => {
        observer.observe(element);
    });

    // Initialize counters
    const counters = document.querySelectorAll(".counter");

    const counterObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(
                        counter.getAttribute("data-target")
                    );
                    const duration = 2000; // 2 seconds
                    const step = target / (duration / 16); // 60fps

                    let current = 0;
                    const updateCounter = () => {
                        current += step;
                        if (current < target) {
                            counter.textContent = Math.ceil(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target;
                        }
                    };

                    updateCounter();
                    counterObserver.unobserve(counter);
                }
            });
        },
        {
            threshold: 0.5,
        }
    );

    counters.forEach((counter) => {
        counterObserver.observe(counter);
    });

    // Adjust carousel caption based on screen size
    function adjustCarouselCaption() {
        const carouselCaptions = document.querySelectorAll(".carousel-caption");
        const isMobile = window.innerWidth < 768;
        const isSmallMobile = window.innerWidth < 576;
        const isVerySmallMobile = window.innerWidth < 400;

        carouselCaptions.forEach((caption) => {
            // Reset text alignment
            if (isMobile) {
                caption.style.textAlign = "center";
                caption.style.padding = "0 15px";
            } else {
                caption.style.textAlign = "";
                caption.style.padding = "";
            }

            // Adjust buttons container
            const buttonContainer =
                caption.querySelector(".mt-4") ||
                caption.querySelector(".mt-3");
            if (buttonContainer) {
                if (isSmallMobile) {
                    buttonContainer.classList.add(
                        "d-flex",
                        "flex-column",
                        "align-items-center",
                        "gap-2"
                    );

                    // Adjust button spacing
                    const buttons = buttonContainer.querySelectorAll(".btn");
                    buttons.forEach((btn) => {
                        btn.style.marginBottom = "10px";
                        btn.style.marginLeft = "0";
                        btn.style.marginRight = "0";

                        if (isVerySmallMobile) {
                            btn.style.minWidth = "100px";
                            btn.style.fontSize = "0.65rem";
                            btn.style.padding = "0.4rem 0.8rem";
                        }
                    });
                } else {
                    buttonContainer.classList.remove("flex-column");

                    // Reset button spacing
                    const buttons = buttonContainer.querySelectorAll(".btn");
                    buttons.forEach((btn) => {
                        btn.style.marginBottom = "";
                        btn.style.marginLeft = "";
                        btn.style.marginRight = "";
                        btn.style.minWidth = "";
                        btn.style.fontSize = "";
                        btn.style.padding = "";
                    });
                }
            }
        });
    }

    // Adjust carousel height based on screen size
    function adjustCarouselHeight() {
        const carouselItems = document.querySelectorAll(
            ".hero-section .carousel-item"
        );
        const isMobile = window.innerWidth < 768;
        const isSmallMobile = window.innerWidth < 576;
        const isVerySmallMobile = window.innerWidth < 400;

        let height = "100vh";
        let minHeight = "700px";

        if (isMobile) {
            height = "80vh";
            minHeight = "600px";
        }

        if (isSmallMobile) {
            height = "70vh";
            minHeight = "500px";
        }

        if (isVerySmallMobile) {
            height = "60vh";
            minHeight = "450px";
        }

        carouselItems.forEach((item) => {
            item.style.height = height;
            item.style.minHeight = minHeight;
        });

        const heroSection = document.querySelector(".hero-section");
        if (heroSection) {
            heroSection.style.height = height;
            heroSection.style.minHeight = minHeight;
        }
    }

    // Run adjustments on load and resize
    adjustCarouselCaption();
    adjustCarouselHeight();

    window.addEventListener("resize", function () {
        adjustCarouselCaption();
        adjustCarouselHeight();
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();

            const targetId = this.getAttribute("href");
            if (targetId === "#") return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight =
                    document.querySelector(".navbar").offsetHeight;
                const targetPosition =
                    targetElement.getBoundingClientRect().top +
                    window.pageYOffset -
                    navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth",
                });

                // Close mobile menu if open
                const navbarToggler = document.querySelector(".navbar-toggler");
                const navbarCollapse =
                    document.querySelector(".navbar-collapse");
                if (
                    navbarCollapse &&
                    navbarCollapse.classList.contains("show")
                ) {
                    navbarToggler.click();
                }
            }
        });
    });
});
