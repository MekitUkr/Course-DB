const backdrop = document.querySelector('.backdrop')
const sideDrawer = document.querySelector('.mobile-nav')
const menuToggle = document.querySelector('#side-menu-toggle')
const createProductButton = document.getElementById('createProduct')

function backdropClickHandler() {
  backdrop.style.display = 'none'
  sideDrawer.classList.remove('open')
}

function menuToggleClickHandler() {
  backdrop.style.display = 'block'
  sideDrawer.classList.add('open')
}

backdrop.addEventListener('click', backdropClickHandler)
menuToggle.addEventListener('click', menuToggleClickHandler)

createProductButton.addEventListener('click', () => window.location.href = '/admin/add-product')