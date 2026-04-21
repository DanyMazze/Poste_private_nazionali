/**
 * script.js
 * Poste Private Mazzetti – Torino
 * Navigazione SPA, menu mobile e micro-interazioni
 */

/* ═══════════════════════════════════════════════════════════
   SEZIONE ATTIVA (SPA navigation)
   ═══════════════════════════════════════════════════════════ */

/**
 * Mostra la sezione richiesta e nasconde le altre.
 * @param {string} id – id della sezione da visualizzare
 */
function showSection(id) {
  // Nascondo tutte le sezioni
  document.querySelectorAll('.page-section').forEach(sec => {
    sec.classList.remove('active');
  });

  // Mostro la sezione richiesta
  const target = document.getElementById(id);
  if (target) {
    target.classList.add('active');
  }

  // Aggiorno i link di nav attivi
  document.querySelectorAll('.nav-link[data-section]').forEach(link => {
    link.classList.toggle('active', link.dataset.section === id);
  });

  // Scorro in cima (sotto l'header fisso)
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Chiudo il menu mobile se aperto
  closeMobileNav();

  // Aggiorno hash URL (senza ricaricare)
  history.pushState(null, '', '#' + id);
}

/* ═══════════════════════════════════════════════════════════
   GESTIONE LINK NAV CON data-section
   ═══════════════════════════════════════════════════════════ */
document.querySelectorAll('.nav-link[data-section]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    showSection(link.dataset.section);
  });
});

/* ═══════════════════════════════════════════════════════════
   MENU MOBILE – hamburger toggle
   ═══════════════════════════════════════════════════════════ */
const navToggle = document.getElementById('navToggle');
const mainNav   = document.getElementById('mainNav');

navToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
  // Animazione hamburger → X
  navToggle.classList.toggle('is-open', isOpen);
});

function closeMobileNav() {
  mainNav.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.classList.remove('is-open');
  // Chiudi anche eventuali dropdown aperti
  document.querySelectorAll('.has-dropdown.open').forEach(d => d.classList.remove('open'));
}

/* Chiudi nav se clicco fuori */
document.addEventListener('click', e => {
  if (!mainNav.contains(e.target) && !navToggle.contains(e.target)) {
    closeMobileNav();
  }
});

/* ═══════════════════════════════════════════════════════════
   DROPDOWN MOBILE (toggle al tap)
   ═══════════════════════════════════════════════════════════ */
document.querySelectorAll('.has-dropdown > .nav-link').forEach(trigger => {
  trigger.addEventListener('click', e => {
    // Solo su mobile (nav aperta a schermo intero)
    if (window.innerWidth <= 900) {
      e.preventDefault();
      const parent = trigger.closest('.has-dropdown');
      parent.classList.toggle('open');
    }
  });
});

/* ═══════════════════════════════════════════════════════════
   HASH ROUTING – carica la sezione corretta all'avvio
   ═══════════════════════════════════════════════════════════ */
function loadFromHash() {
  const hash = window.location.hash.replace('#', '');
  const validSections = [
    'home', 'spedizione', 'visure', 'biglietti-spett',
    'cartoleria', 'treno-bus', 'carta-identita',
    'servizi-postali', 'altri-servizi', 'contatti'
  ];

  if (hash && validSections.includes(hash)) {
    showSection(hash);
  } else {
    showSection('home');
  }
}

window.addEventListener('DOMContentLoaded', loadFromHash);
window.addEventListener('popstate', loadFromHash);

/* ═══════════════════════════════════════════════════════════
   HEADER SCROLL – aggiunge ombra quando si scrolla
   ═══════════════════════════════════════════════════════════ */
const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
  header.style.boxShadow = window.scrollY > 10
    ? '0 4px 24px rgba(0,0,0,.25)'
    : '0 2px 16px rgba(0,0,0,.2)';
}, { passive: true });

/* ═══════════════════════════════════════════════════════════
   RESIZE – chiudi menu mobile al cambio viewport
   ═══════════════════════════════════════════════════════════ */
window.addEventListener('resize', () => {
  if (window.innerWidth > 900) closeMobileNav();
});
