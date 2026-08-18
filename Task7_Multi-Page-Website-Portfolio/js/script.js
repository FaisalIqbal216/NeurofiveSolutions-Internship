'use strict';

/* ==========================================================================
   Theme toggle (every page)
   ========================================================================== */

function initTheme() {
  const themeBtn = document.getElementById('themeBtn');
  if (!themeBtn) return;

  const root = document.documentElement;
  const icon = themeBtn.querySelector('.icon');
  const saved = localStorage.getItem('theme');

  if (saved) {
    root.setAttribute('data-theme', saved);
    icon.textContent = saved === 'dark' ? '\u2600\ufe0f' : '\ud83c\udf19';
  }

  themeBtn.addEventListener('click', () => {
    const isDark = root.getAttribute('data-theme') === 'dark';
    const next = isDark ? 'light' : 'dark';

    themeBtn.classList.add('flip');
    window.setTimeout(() => {
      root.setAttribute('data-theme', next);
      icon.textContent = next === 'dark' ? '\u2600\ufe0f' : '\ud83c\udf19';
      themeBtn.classList.remove('flip');
    }, 220);

    localStorage.setItem('theme', next);
  });
}

/* ==========================================================================
   Mobile menu (every page)
   ========================================================================== */

function initMobileMenu() {
  const menuBtn = document.getElementById('menuBtn');
  const navLinks = document.getElementById('navLinks');
  if (!menuBtn || !navLinks) return;

  menuBtn.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach((link) =>
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    })
  );
}

/* ==========================================================================
   Scroll reveal (every page — no-op if a page has no .reveal elements)
   ========================================================================== */

function initRevealObserver() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  reveals.forEach((el) => observer.observe(el));
}

/* ==========================================================================
   Footer year (every page)
   ========================================================================== */

function initYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

/* ==========================================================================
   Projects grid (projects.html only) — renders from the PROJECTS array in
   projects-data.js, per the task's dynamic-rendering requirement
   ========================================================================== */

function initProjectsGrid() {
  const grid = document.getElementById('projectsGrid');
  const filtersEl = document.getElementById('projectFilters');
  if (!grid || typeof PROJECTS === 'undefined') return;

  function renderCards(activeCategory) {
    const visible =
      activeCategory === 'All' ? PROJECTS : PROJECTS.filter((p) => p.categories.includes(activeCategory));

    grid.innerHTML = visible
      .map(
        (p) => `
      <article class="project-card reveal" data-categories="${p.categories.join(' ')}">
        <div class="project-top">${p.title}</div>
        <div class="project-body">
          <p>${p.description}</p>
          <ul class="tags">
            ${p.tags.map((t) => `<li class="tag">${t}</li>`).join('')}
          </ul>
          ${
            p.liveUrl || p.githubUrl
              ? `<div class="project-actions">
                  ${p.liveUrl ? `<a href="${p.liveUrl}" target="_blank" rel="noopener" class="btn btn-primary project-link">Live Demo</a>` : ''}
                  ${p.githubUrl ? `<a href="${p.githubUrl}" target="_blank" rel="noopener" class="btn btn-outline project-link">GitHub</a>` : ''}
                </div>`
              : ''
          }
        </div>
      </article>`
      )
      .join('');

    initRevealObserver();
  }

  if (filtersEl) {
    const categories = ['All', ...new Set(PROJECTS.flatMap((p) => p.categories))];
    filtersEl.innerHTML = categories
      .map((cat, i) => `<button type="button" class="filter-btn${i === 0 ? ' active' : ''}" data-category="${cat}">${cat}</button>`)
      .join('');

    filtersEl.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;
      filtersEl.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      renderCards(btn.dataset.category);
    });
  }

  renderCards('All');
}

/* ==========================================================================
   About page — animated stat counters (Projects Built, CGPA)
   ========================================================================== */

function initStatCounters() {
  const stats = document.querySelectorAll('.stat b[data-target]');
  if (!stats.length) return;

  const animateStat = (el) => {
    const target = parseFloat(el.dataset.target);
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1100;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = target * eased;
      el.textContent = value.toFixed(decimals) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  };

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) {
    stats.forEach((el) => {
      const target = parseFloat(el.dataset.target);
      const decimals = parseInt(el.dataset.decimals || '0', 10);
      el.textContent = target.toFixed(decimals) + (el.dataset.suffix || '');
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateStat(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );
  stats.forEach((el) => observer.observe(el));
}

/* ==========================================================================
   Home hero — rotating role text
   ========================================================================== */

function initRoleTyper() {
  const roleEl = document.getElementById('roleText');
  if (!roleEl) return;

  const roles = ['Frontend Developer', 'MERN Stack Developer', 'React Native Developer', 'AI Automation Engineer'];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion) {
    roleEl.textContent = roles[0];
    return;
  }

  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function step() {
    const current = roles[roleIndex];

    if (!deleting) {
      charIndex++;
      roleEl.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        window.setTimeout(step, 1400);
        return;
      }
    } else {
      charIndex--;
      roleEl.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }

    window.setTimeout(step, deleting ? 35 : 65);
  }

  step();
}

/* ==========================================================================
   Contact form (contact.html only)
   ========================================================================== */

const WHATSAPP_NUMBER = '923453076651';

function validateContactForm(form) {
  let valid = true;
  const fields = [
    { input: form.name, error: document.getElementById('name-error'), test: (v) => v.trim().length > 0, message: 'Please enter your name.' },
    {
      input: form.email,
      error: document.getElementById('email-error'),
      test: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
      message: 'Enter a valid email address.',
    },
    { input: form.phone, error: document.getElementById('phone-error'), test: (v) => v.trim().length >= 7, message: 'Enter a valid phone number.' },
    { input: form.message, error: document.getElementById('message-error'), test: (v) => v.trim().length > 0, message: 'Tell me a bit about your project.' },
  ];

  fields.forEach(({ input, error, test, message }) => {
    if (!test(input.value)) {
      input.setAttribute('aria-invalid', 'true');
      error.textContent = message;
      valid = false;
    } else {
      input.setAttribute('aria-invalid', 'false');
      error.textContent = '';
    }
  });

  return valid;
}

function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;

  const statusEl = document.getElementById('formStatus');
  const submitBtn = contactForm.querySelector('.form-submit');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!validateContactForm(contactForm)) {
      statusEl.textContent = 'Fix the highlighted fields before sending.';
      return;
    }

    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    const phone = contactForm.phone.value.trim();
    const message = contactForm.message.value.trim();

    const text =
      `*New Portfolio Contact*%0A%0A` +
      `*Name:* ${encodeURIComponent(name)}%0A` +
      `*Email:* ${encodeURIComponent(email)}%0A` +
      `*Phone:* ${encodeURIComponent(phone)}%0A` +
      `*Message:* ${encodeURIComponent(message)}`;
    const waURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;

    submitBtn.classList.add('success');
    statusEl.textContent = 'Message ready — opening WhatsApp to send it.';

    window.open(waURL, '_blank');

    window.setTimeout(() => {
      contactForm.reset();
      submitBtn.classList.remove('success');
    }, 2200);
  });

  contactForm.addEventListener('input', (e) => {
    const field = e.target;
    if (!field.id) return;
    const error = document.getElementById(`${field.id}-error`);
    if (error) {
      field.setAttribute('aria-invalid', 'false');
      error.textContent = '';
    }
  });
}

/* ==========================================================================
   Boot
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileMenu();
  initYear();
  initProjectsGrid();
  initContactForm();
  initStatCounters();
  initRoleTyper();
  initRevealObserver();
});