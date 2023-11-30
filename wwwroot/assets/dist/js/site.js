const sidebar = document.getElementById('sidebarTransform');
const button = document.getElementById('btnToggle');

button.addEventListener('click', () => {
    sidebar.classList.toggle('active');
});