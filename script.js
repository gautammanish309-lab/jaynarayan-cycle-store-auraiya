document.addEventListener('DOMContentLoaded', () => {
  const menu = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-header nav');
  menu?.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menu.setAttribute('aria-expanded', open);
    menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });
  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => nav.classList.remove('open')));
  document.querySelector('#year').textContent = new Date().getFullYear();

  const lightbox = document.querySelector('.lightbox');
  const preview = lightbox?.querySelector('img');
  document.querySelectorAll('[data-full]').forEach(item => item.addEventListener('click', () => {
    preview.src = item.dataset.full;
    preview.alt = item.querySelector('img').alt;
    lightbox.showModal();
  }));
  lightbox?.querySelector('button').addEventListener('click', () => lightbox.close());
  lightbox?.addEventListener('click', event => { if (event.target === lightbox) lightbox.close(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape') lightbox?.close(); });

  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  }), { threshold: .16 });
  document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
});
