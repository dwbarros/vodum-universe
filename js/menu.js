const menuBtn = document.getElementById('hamburger-btn');
const menu = document.getElementById('menu');
const menuBg = document.getElementById('menu-bg');

menuBtn.addEventListener('click', () => {
    menu.classList.toggle('active');
    menuBg.classList.toggle('active');
    menuBtn.classList.toggle('active');
});