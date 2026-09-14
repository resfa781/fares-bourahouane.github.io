(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Navigation toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const navPanel = document.getElementById('navPanel');

  function openNav(){
    navPanel.classList.add('open');
    navToggle.setAttribute('aria-expanded', 'true');
  }
  function closeNav(){
    navPanel.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }
  navToggle.addEventListener('click', () => {
    navPanel.classList.contains('open') ? closeNav() : openNav();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeNav();
  });

  /* ---------- Smooth scroll for all internal links ---------- */
  document.querySelectorAll('a[data-target]').forEach(link => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('data-target');
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
      }
      closeNav();
    });
  });

  /* ---------- Scrollspy: active node + progress bar ---------- */
  const sections = Array.from(document.querySelectorAll('.slide'));
  const nodeLinks = Array.from(document.querySelectorAll('.node-rail .node'));
  const progressFill = document.querySelector('.progress-fill');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
        const id = entry.target.id;
        nodeLinks.forEach(n => n.classList.toggle('active', n.dataset.target === id));

        const idx = sections.indexOf(entry.target);
        progressFill.style.width = `${((idx + 1) / sections.length) * 100}%`;
      }
    });
  }, { threshold: [0.5] });

  sections.forEach(s => observer.observe(s));
})();
