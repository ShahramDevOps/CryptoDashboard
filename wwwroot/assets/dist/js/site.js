const sidebar = document.getElementById('sidebarTransform');
const button = document.getElementById('btnTogggle');

button.addEventListener('click', () => {
    sidebar.classList.toggle('active');
});