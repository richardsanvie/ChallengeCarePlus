// Nav active state
document.querySelectorAll('.nav-link-side').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelectorAll('.nav-link-side').forEach(l => l.classList.remove('active'));
    this.classList.add('active');
  });
});
 
// Animate progress bars after load
window.addEventListener('load', () => {
  setTimeout(() => {
    document.querySelectorAll('.stat-bar-fill').forEach(bar => {
      bar.style.width = bar.dataset.w;
    });
  }, 400);
});
 