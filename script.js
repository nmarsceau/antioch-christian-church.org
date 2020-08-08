// set up main menu
const mainMenuToggle = document.getElementById('main-menu-toggle');
if (mainMenuToggle !== null) {
  mainMenuToggle.addEventListener('click', function () {
    document.querySelector('.main-menu ul').classList.toggle('collapsed');
  });
}

// update copyright year
const copyrightCurrentYear = document.getElementById('copyright-current-year');
if (copyrightCurrentYear !== null) {
  copyrightCurrentYear.innerText = (new Date()).getFullYear();
}
