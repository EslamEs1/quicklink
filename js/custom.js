// QUICK LINK - Custom JavaScript

// When the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    // Navbar scroll effect
    window.addEventListener("scroll", function () {
        const navbar = document.querySelector(".navbar");
        if (window.scrollY > 50) {
            navbar.classList.add("navbar-scrolled");
        } else {
            navbar.classList.remove("navbar-scrolled");
        }
    });

    // Animate elements on scroll
    const animateElements = document.querySelectorAll(".animate-on-scroll");

    const animateOnScroll = function () {
        animateElements.forEach(function (element) {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementPosition < windowHeight - 100) {
                element.classList.add("animated");
            }
        });
    };

    // Run once on page load
    animateOnScroll();

    // Run on scroll
    window.addEventListener("scroll", animateOnScroll);

    // Counter animation
    const counterElements = document.querySelectorAll(".counter");

    const startCounterAnimation = function (entries, observer) {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute("data-target"));
                const duration = 2000; // 2 seconds
                const step = Math.ceil(target / (duration / 20)); // Update every 20ms

                let current = 0;
                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        counter.textContent = target;
                        clearInterval(timer);
                    } else {
                        counter.textContent = current;
                    }
                }, 20);

                // Unobserve after animation starts
                observer.unobserve(counter);
            }
        });
    };

    // Set up Intersection Observer for counters
    const counterObserver = new IntersectionObserver(startCounterAnimation, {
        root: null,
        threshold: 0.1,
    });

    // Observe all counter elements
    counterElements.forEach((counter) => {
        counterObserver.observe(counter);
    });

    // Business cards hover effect
    const businessCards = document.querySelectorAll(".business-card");
    businessCards.forEach((card) => {
        card.addEventListener("mouseenter", function () {
            const icon = this.querySelector(".business-card-icon i");
            if (icon) {
                icon.style.transform = "rotateY(360deg)";
                icon.style.transition = "transform 0.8s ease";
            }
        });
    });

    // Team member social links
    const teamMembers = document.querySelectorAll(".team-member");
    teamMembers.forEach((member) => {
        member.addEventListener("mouseenter", function () {
            const socialLinks = this.querySelector(".team-social");
            if (socialLinks) {
                socialLinks.style.bottom = "0";
            }
        });

        member.addEventListener("mouseleave", function () {
            const socialLinks = this.querySelector(".team-social");
            if (socialLinks) {
                socialLinks.style.bottom = "-50px";
            }
        });
    });
});
