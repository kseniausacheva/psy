// ============================================
// ANNA SOKOLOVA — interactions
// ============================================

(() => {
  // --- Nav scroll state
  const nav = document.getElementById('nav');
  let lastY = window.scrollY;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    nav.classList.toggle('scrolled', y > 40);
    lastY = y;
  }, { passive: true });

  // --- Mobile burger / overlay menu
  const burger = document.getElementById('burger');
  const overlay = document.getElementById('menuOverlay');

  const closeMenu = () => {
    burger.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  };

  burger.addEventListener('click', () => {
    const isOpen = burger.classList.toggle('open');
    overlay.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  overlay.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) closeMenu();
  });

  // --- IntersectionObserver reveal on scroll
  const reveals = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: '-8% 0px -8% 0px', threshold: 0.05 });

  reveals.forEach(el => io.observe(el));

  // --- Magnetic nav-cta cursor follow
  const cta = document.querySelector('.nav-cta');
  if (cta && window.matchMedia('(pointer: fine)').matches) {
    cta.addEventListener('mousemove', (e) => {
      const r = cta.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) * 0.18;
      const dy = (e.clientY - (r.top + r.height / 2)) * 0.18;
      cta.style.transform = `translate(${dx}px, ${dy}px)`;
    });
    cta.addEventListener('mouseleave', () => {
      cta.style.transform = '';
    });
  }

  // --- Smooth scroll w/ offset for fixed nav
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const y = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  });

  // --- Mouse-drift parallax for hero visual
  const heroVisual = document.querySelector('.hero-visual');
  if (heroVisual && window.matchMedia('(pointer: fine)').matches) {
    const heroSection = document.querySelector('.hero');
    heroSection.addEventListener('mousemove', (e) => {
      const r = heroSection.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width - 0.5) * 14;
      const y = ((e.clientY - r.top) / r.height - 0.5) * 14;
      heroVisual.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      const chip = heroVisual.querySelector('.float-chip');
      if (chip) chip.style.transform = `translate3d(${-x * 1.6}px, ${-y * 1.6}px, 0) rotate(-2deg)`;
    });
    heroSection.addEventListener('mouseleave', () => {
      heroVisual.style.transform = '';
      const chip = heroVisual.querySelector('.float-chip');
      if (chip) chip.style.transform = '';
    });
  }
})();
