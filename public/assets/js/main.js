const navigationButton = document.getElementById('toggle-navigation');
const navigationMenu = document.getElementById('nav-menu');

const toggleMobileMenu = () => {
    navigationMenu.classList.toggle('active');
    navigationButton.classList.toggle('is-active');
};

if (navigationButton && navigationMenu) {
    navigationButton.addEventListener('click', toggleMobileMenu);
}