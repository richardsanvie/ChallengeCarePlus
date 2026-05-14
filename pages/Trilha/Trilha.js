document.querySelectorAll('.nav-link-side').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelectorAll('.nav-link-side').forEach(l => l.classList.remove('active'));
    this.classList.add('active');
  });
});

window.addEventListener('load', () => {
  setTimeout(() => {
    document.querySelectorAll('.stat-bar-fill').forEach(bar => {
      bar.style.width = bar.dataset.w;
    });
  }, 400);
});

const sidebar = document.getElementById('trilha-sidebar');
const overlay = document.getElementById('trilha-sidebar-overlay');
const menuBtn = document.getElementById('trilha-menu-btn');

function closeMenu() {
  sidebar?.classList.remove('open');
  overlay?.classList.remove('open');
}

menuBtn?.addEventListener('click', () => {
  sidebar?.classList.toggle('open');
  overlay?.classList.toggle('open');
});

overlay?.addEventListener('click', closeMenu);

document.querySelectorAll('.filter-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
  });
});
