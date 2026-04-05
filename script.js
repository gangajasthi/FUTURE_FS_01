/* ═══════════════════════════════════════════
   MADHU — PORTFOLIO  ·  SCRIPT.JS
   Custom Cursor  ·  Scroll Animations  ·  Hamburger Nav
   ═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── CUSTOM CURSOR ──────────────────────── */
  const cursor = document.querySelector('.custom-cursor');

  if (cursor && window.innerWidth > 768) {
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animateCursor() {
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;
      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Scale on hover over interactive elements
    const hoverTargets = document.querySelectorAll('a, button, .service-card, .case-card, .experience__row, .pill-btn');
    hoverTargets.forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
    });
  }

  /* ── INTERSECTION OBSERVER — FADE-UP ──── */
  const fadeEls = document.querySelectorAll('.fade-up');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -60px 0px'
    });

    fadeEls.forEach(el => observer.observe(el));
  } else {
    // Fallback: show everything
    fadeEls.forEach(el => el.classList.add('visible'));
  }

  /* ── HAMBURGER NAV ─────────────────────── */
  const hamburger = document.querySelector('.nav__hamburger');
  const mobileMenu = document.querySelector('.nav__mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });

    // Close menu when a link is clicked
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── SMOOTH ANCHOR SCROLL ──────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80; // nav height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ── STAGGER DELAY FOR ELEMENTS ────────── */
  // Add stagger delays to service cards, experience rows, etc.
  const staggerGroups = [
    { selector: '.service-card', delay: 0.12 },
    { selector: '.experience__row', delay: 0.1 },
    { selector: '.case-card', delay: 0.15 }
  ];

  staggerGroups.forEach(group => {
    document.querySelectorAll(group.selector).forEach((el, i) => {
      el.style.transitionDelay = `${i * group.delay}s`;
    });
  });

  /* ── CONTACT FORM (optional toast) ─────── */
  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Message sent successfully! I\'ll get back to you soon.');
      contactForm.reset();
    });
  }

});

/* ── TOAST NOTIFICATION ──────────────────── */
function showToast(message) {
  const toast = document.createElement('div');
  toast.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    background: #0A0A0A;
    color: #fff;
    padding: 16px 28px;
    border-radius: 8px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    z-index: 99999;
    animation: toastIn 0.4s cubic-bezier(0.16,1,0.3,1);
    box-shadow: 0 10px 40px rgba(0,0,0,0.2);
  `;
  toast.textContent = message;
  document.body.appendChild(toast);

  // Add animation keyframes
  if (!document.querySelector('#toast-style')) {
    const style = document.createElement('style');
    style.id = 'toast-style';
    style.textContent = `
      @keyframes toastIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes toastOut {
        from { opacity: 1; transform: translateY(0); }
        to { opacity: 0; transform: translateY(20px); }
      }
    `;
    document.head.appendChild(style);
  }

  setTimeout(() => {
    toast.style.animation = 'toastOut 0.4s cubic-bezier(0.16,1,0.3,1) forwards';
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}
