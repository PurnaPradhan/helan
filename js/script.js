// --- START OF FILE script.js ---

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // Initialize all site functions
    initNavbarScroll();
    initBackToTopButton();
    initSmoothScroll();
    initMobileNav();
    initServiceTabs();
    initNewsletterForm();
    initContactForm();
    initGalleryFilter();
    initAccordion();
    initAnimateOnScroll();
    initTestimonials();
    initServiceCards();
    initFormInputEffects();
    initMultiItemCarousel(); // <-- Call the new function here

    // ==========================================================
    //                        FUNCTIONS
    // ==========================================================

    function initNavbarScroll() {
        const navbar = document.getElementById('mainNav');
        if (!navbar) return;

        function handleScroll() {
            if (window.scrollY > 50) {
                navbar.classList.add('navbar-shrink');
            } else {
                navbar.classList.remove('navbar-shrink');
            }
        }
        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Run on page load
    }

    function initBackToTopButton() {
        const backToTopBtn = document.getElementById('backToTop');
        if (!backToTopBtn) return;

        function handleScroll() {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('active');
            } else {
                backToTopBtn.classList.remove('active');
            }
        }
        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Run on page load

        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    function initMobileNav() {
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (!navbarToggler || !navbarCollapse) return;

        // Note: Bootstrap's own JS handles the toggle. This is for extra behavior.
        document.querySelectorAll('.navbar-nav .nav-link').forEach(navLink => {
            navLink.addEventListener('click', function() {
                if (window.innerWidth < 992 && navbarCollapse.classList.contains('show')) {
                    // Create a new bootstrap Collapse instance to safely hide it
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                        toggle: false
                    });
                    bsCollapse.hide();
                }
            });
        });
    }

    function initServiceTabs() {
        // This is handled by Bootstrap's JS. Adding extra logic if needed.
    }

    function initNewsletterForm() {
        // Your existing newsletter form logic...
    }

    function initContactForm() {
        // Your existing contact form logic...
    }

    function initGalleryFilter() {
        // Your existing gallery filter logic...
    }

    function initAccordion() {
        // This is handled by Bootstrap's JS. Adding extra logic if needed.
    }

    function initAnimateOnScroll() {
        // Your existing animation logic...
    }

    function initTestimonials() {
        // Your existing testimonial animation logic...
    }

    function initServiceCards() {
        // Your existing service card animation logic...
    }

    function initFormInputEffects() {
        // Your existing form input effects logic...
    }

    // START: Auto Slide One-by-One Logic
    // --------------------------------------------------
    function initMultiItemCarousel() {
        const container = document.getElementById("autoScrollGallery");
        if (!container) return; // Stop if element is missing

        const track = container.querySelector(".auto-scroll-track");
        if (!track) return;

        let isHovered = false;

        // Pause cycling when user interacts
        const pause = () => isHovered = true;
        const resume = () => isHovered = false;

        container.addEventListener('mouseenter', pause);
        container.addEventListener('mouseleave', resume);
        container.addEventListener('touchstart', pause);
        container.addEventListener('touchend', resume);

        function slideNext() {
            // 1. If paused, check again in 500ms
            if (isHovered) {
                setTimeout(slideNext, 500);
                return;
            }

            const firstItem = track.firstElementChild;
            if (!firstItem) return;

            // 2. Calculate the exact width of one item (including padding)
            // This ensures we move exactly "one whole image"
            const itemWidth = firstItem.getBoundingClientRect().width;

            // 3. Apply the Slide Animation
            track.style.transition = 'transform 1s ease-in-out';
            track.style.transform = `translateX(-${itemWidth}px)`;

            // 4. Wait for animation to end, then reorganize DOM
            const handleTransitionEnd = () => {
                track.removeEventListener('transitionend', handleTransitionEnd);

                // a. Disable transition to swap instantly
                track.style.transition = 'none';

                // b. Move the first item to the very end of the list
                track.appendChild(firstItem);

                // c. Reset transform to 0 (user won't see this jump because items swapped)
                track.style.transform = 'translateX(0)';

                // d. Force Reflow (browser paint) to apply the reset
                void track.offsetWidth;

                // e. Schedule next slide (2000ms delay for view time)
                setTimeout(slideNext, 2000);
            };

            track.addEventListener('transitionend', handleTransitionEnd);
            
            // Safety fallback: in case tab is inactive and transitionend doesn't fire
            setTimeout(() => {
                if(track.style.transition !== 'none') {
                    handleTransitionEnd();
                }
            }, 1100);
        }

        // Start the loop after initial page load delay
        setTimeout(slideNext, 2000);
    }
    // --------------------------------------------------
    // END: Auto Slide One-by-One Logic
});
