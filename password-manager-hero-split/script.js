const menuToggle = document.getElementById('menuToggle');
const closeMenu = document.getElementById('closeMenu');
const backdrop = document.getElementById('backdrop');
const sheet = document.getElementById('sheet');

function openMenu() {
  backdrop.classList.add('open');
  sheet.classList.remove('closing');
  sheet.classList.add('open');
}

function closeMenuFn() {
  sheet.classList.add('closing');
  sheet.classList.remove('open');
  backdrop.classList.remove('open');
}

menuToggle.addEventListener('click', openMenu);
closeMenu.addEventListener('click', closeMenuFn);
backdrop.addEventListener('click', closeMenuFn);
