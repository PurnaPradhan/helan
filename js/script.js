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
    
    // START: New Multi-Item Carousel Logic
    // --------------------------------------------------
    function initMultiItemCarousel() {
        const carousel = document.querySelector("#featuredWorkCarousel");
        // Only run this code if the carousel exists on the page
        if (!carousel) {
            return;
        }

        const carouselInner = carousel.querySelector(".carousel-inner");
        const firstItem = carousel.querySelector(".carousel-item");
        const prevButton = carousel.querySelector(".carousel-control-prev");
        const nextButton = carousel.querySelector(".carousel-control-next");

        if (!carouselInner || !firstItem || !prevButton || !nextButton) {
            return; // Exit if essential elements are missing
        }

        // Clone items to create an infinite loop effect
        let items = carouselInner.querySelectorAll('.carousel-item');
        items.forEach((item) => {
            let clone = item.cloneNode(true);
            carouselInner.appendChild(clone);
        });
        
        // Reset scroll position
        carouselInner.scrollLeft = 0;

        nextButton.addEventListener("click", function () {
            const itemWidth = firstItem.offsetWidth;
            carouselInner.scrollLeft += itemWidth;

            // Logic for infinite loop
            if (carouselInner.scrollLeft >= (carouselInner.scrollWidth / 2)) {
                carouselInner.style.scrollBehavior = 'auto'; // Prevent smooth scroll on jump
                carouselInner.scrollLeft = 0;
                carouselInner.style.scrollBehavior = 'smooth'; // Re-enable smooth scroll
            }
        });

        prevButton.addEventListener("click", function () {
            const itemWidth = firstItem.offsetWidth;
            
            // Logic for infinite loop
            if (carouselInner.scrollLeft === 0) {
                carouselInner.style.scrollBehavior = 'auto'; // Prevent smooth scroll on jump
                carouselInner.scrollLeft = carouselInner.scrollWidth / 2;
                carouselInner.style.scrollBehavior = 'smooth'; // Re-enable smooth scroll
            }
                
            carouselInner.scrollLeft -= itemWidth;
        });
        
        // Ensure smooth scrolling is enabled initially
        carouselInner.style.scrollBehavior = 'smooth';
    }
    // --------------------------------------------------
    // END: New Multi-Item Carousel Logic
});