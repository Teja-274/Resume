// ========================================
// SHARED UTILITIES (ANIME PARK VERSION)
// ========================================

// ---- Set active nav link ----
function setActiveNav() {
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href').split('/').pop();
    a.classList.toggle('active', href === current);
  });
}

// ---- Scroll reveal ----
function initReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
  }, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add('visible');
    } else {
      observer.observe(el);
    }
  });
}

// ---- Page enter animation ----
function initPageEnter() {
  const content = document.querySelector('.page-content');
  if (content) content.classList.add('page-enter');
}

// ---- Typed text effect ----
function typeText(el, texts, speed = 80, pause = 2000) {
  let ti = 0, ci = 0, deleting = false;
  function tick() {
    const text = texts[ti];
    el.textContent = deleting ? text.slice(0, ci--) : text.slice(0, ci++);
    if (!deleting && ci > text.length) {
      deleting = true;
      setTimeout(tick, pause);
      return;
    }
    if (deleting && ci < 0) {
      deleting = false;
      ti = (ti + 1) % texts.length;
      ci = 0;
    }
    setTimeout(tick, deleting ? speed / 2 : speed);
  }
  tick();
}

// ---- Counter animation ----
function animateCounters() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = +el.dataset.count;
    const suffix = el.dataset.suffix || '';
    let current = 0;
    const step = target / 60;
    let started = false;
    if (started) return;
    started = true;
    const update = () => {
      current = Math.min(current + step, target);
      el.textContent = (Number.isInteger(target) ? Math.floor(current) : current.toFixed(1)) + suffix;
      if (current < target) requestAnimationFrame(update);
    };
    update();
  });
}

// ---- Init on load ----
document.addEventListener('DOMContentLoaded', () => {
  setActiveNav();
  initReveal();
  initPageEnter();
});
