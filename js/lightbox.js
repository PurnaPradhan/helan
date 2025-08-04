document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    initLightbox();
    initGalleryFilter();

    // ========== Functions ==========

    function initLightbox() {
        if (typeof lightbox !== 'undefined') {
            lightbox.option({
                resizeDuration: 300,
                wrapAround: true,
                fadeDuration: 300,
                imageFadeDuration: 300,
                showImageNumberLabel: false,
                alwaysShowNavOnTouchDevices: true,
                disableScrolling: true,
                positionFromTop: 80
            });
        } else {
            console.warn('Lightbox is not loaded.');
        }
    }

    function initGalleryFilter() {
        const filterButtons = document.querySelectorAll('.filter-menu li');
        const galleryItems = document.querySelectorAll('.gallery-grid .gallery-item');

        if (filterButtons.length === 0 || galleryItems.length === 0) {
            console.info('No filter menu or gallery items found — skipping filter logic.');
            return;
        }

        // Set initial active filter safely
        const activeButton = document.querySelector('.filter-menu li.active');
        if (activeButton) activeButton.classList.add('active');

        filterButtons.forEach(button => {
            button.addEventListener('click', function () {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                const filterValue = this.getAttribute('data-filter');

                galleryItems.forEach(item => {
                    const match = filterValue === '*' || item.classList.contains(filterValue.substring(1));
                    item.style.display = match ? 'block' : 'none';
                    item.style.opacity = match ? '1' : '0';

                    if (!match) {
                        setTimeout(() => item.style.display = 'none', 300);
                    }
                });
            });
        });
    }
});
