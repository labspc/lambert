// docs/.vitepress/theme/main.js
document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.querySelector('.sidebar');
    const zoomImages = document.querySelectorAll('.medium-zoom-image');

    zoomImages.forEach(image => {
        image.addEventListener('click', () => {
            sidebar.classList.add('sidebar-hidden');
        });
    });

    document.addEventListener('click', (event) => {
        if (!event.target.classList.contains('medium-zoom-image')) {
            sidebar.classList.remove('sidebar-hidden');
        }
    });
});