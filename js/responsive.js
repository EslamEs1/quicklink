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

    // Observe all counter elements
    counters.forEach((counter) => {
        counterObserver.observe(counter);
    });

    // Mobile navbar fixes
    const navbarToggler = document.querySelector(".navbar-toggler");
    const navbarCollapse = document.querySelector(".navbar-collapse");
    const body = document.body;

    // Handle mobile menu toggle
    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener("click", function () {
            const isOpen = navbarCollapse.classList.contains("show");

            if (isOpen) {
                body.classList.remove("navbar-open");
            } else {
                body.classList.add("navbar-open");
            }
        });

        // Close mobile menu when clicking outside
        document.addEventListener("click", function (event) {
            if (
                navbarCollapse.classList.contains("show") &&
                !navbarCollapse.contains(event.target) &&
                !navbarToggler.contains(event.target)
            ) {
                navbarToggler.click();
            }
        });

        // Close mobile menu on escape key
        document.addEventListener("keydown", function (event) {
            if (
                event.key === "Escape" &&
                navbarCollapse.classList.contains("show")
            ) {
                navbarToggler.click();
            }
        });
    }

    // Fix dropdown behavior on mobile
    const dropdownToggles = document.querySelectorAll(".dropdown-toggle");

    dropdownToggles.forEach((toggle) => {
        toggle.addEventListener("click", function (e) {
            if (window.innerWidth <= 991.98) {
                e.preventDefault();
                e.stopPropagation();

                const dropdown = this.closest(".dropdown");
                const isOpen = dropdown.classList.contains("show");
                const dropdownMenu = dropdown.querySelector(".dropdown-menu");

                // Close all other dropdowns
                document
                    .querySelectorAll(".dropdown.show")
                    .forEach((openDropdown) => {
                        if (openDropdown !== dropdown) {
                            openDropdown.classList.remove("show");
                            const otherMenu =
                                openDropdown.querySelector(".dropdown-menu");
                            if (otherMenu) {
                                otherMenu.style.display = "none";
                                otherMenu.style.opacity = "0";
                                otherMenu.style.visibility = "hidden";
                                otherMenu.style.transform = "translateY(-10px)";
                                otherMenu.style.margin = "0";
                                otherMenu.style.padding = "0";
                                otherMenu.style.height = "0";
                                otherMenu.style.overflow = "hidden";
                            }
                        }
                    });

                // Toggle current dropdown
                if (isOpen) {
                    dropdown.classList.remove("show");
                    if (dropdownMenu) {
                        dropdownMenu.style.display = "none";
                        dropdownMenu.style.opacity = "0";
                        dropdownMenu.style.visibility = "hidden";
                        dropdownMenu.style.transform = "translateY(-10px)";
                        dropdownMenu.style.margin = "0";
                        dropdownMenu.style.padding = "0";
                        dropdownMenu.style.height = "0";
                        dropdownMenu.style.overflow = "hidden";
                    }
                } else {
                    dropdown.classList.add("show");
                    if (dropdownMenu) {
                        dropdownMenu.style.display = "block";
                        dropdownMenu.style.opacity = "1";
                        dropdownMenu.style.visibility = "visible";
                        dropdownMenu.style.transform = "translateY(0)";
                        dropdownMenu.style.margin = "";
                        dropdownMenu.style.padding = "";
                        dropdownMenu.style.height = "";
                        dropdownMenu.style.overflow = "";
                    }
                }
            }
        });
    });

    // // Close dropdowns when clicking outside
    // document.addEventListener("click", function (event) {
    //     if (window.innerWidth <= 991.98) {
    //         const dropdowns = document.querySelectorAll(".dropdown.show");
    //         dropdowns.forEach((dropdown) => {
    //             if (!dropdown.contains(event.target)) {
    //                 dropdown.classList.remove("show");
    //                 const dropdownMenu =
    //                     dropdown.querySelector(".dropdown-menu");
    //                 if (dropdownMenu) {
    //                     dropdownMenu.style.display = "none";
    //                     dropdownMenu.style.opacity = "0";
    //                     dropdownMenu.style.visibility = "hidden";
    //                     dropdownMenu.style.transform = "translateY(-10px)";
    //                     dropdownMenu.style.margin = "0";
    //                     dropdownMenu.style.padding = "0";
    //                     dropdownMenu.style.height = "0";
    //                     dropdownMenu.style.overflow = "hidden";
    //                 }
    //             }
    //         });
    //     }
    // });

    // Prevent dropdown hover on mobile
    if (window.innerWidth <= 991.98) {
        const dropdowns = document.querySelectorAll(".dropdown");
        dropdowns.forEach((dropdown) => {
            dropdown.addEventListener("mouseenter", function (e) {
                e.preventDefault();
                e.stopPropagation();
            });
        });
    }

    // // Handle window resize
    // window.addEventListener("resize", function () {
    //     if (window.innerWidth > 991.98) {
    //         // Reset mobile menu state on desktop
    //         body.classList.remove("navbar-open");
    //         document.querySelectorAll(".dropdown.show").forEach((dropdown) => {
    //             dropdown.classList.remove("show");
    //             const dropdownMenu = dropdown.querySelector(".dropdown-menu");
    //             if (dropdownMenu) {
    //                 dropdownMenu.style.display = "";
    //                 dropdownMenu.style.opacity = "";
    //                 dropdownMenu.style.visibility = "";
    //                 dropdownMenu.style.transform = "";
    //                 dropdownMenu.style.margin = "";
    //                 dropdownMenu.style.padding = "";
    //                 dropdownMenu.style.height = "";
    //                 dropdownMenu.style.overflow = "";
    //             }
    //         });
    //     }
    // });

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
