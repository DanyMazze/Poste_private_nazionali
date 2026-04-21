/**
 * script.js
 * Poste Private Mazzetti – Torino
 * Navigazione SPA, menu mobile, dropdown JS-controlled
 */

/* ═══ SEZIONE ATTIVA (SPA) ═══════════════════════════════════ */
function showSection(id) {
  document.querySelectorAll('.page-section').forEach(sec => sec.classList.remove('active'));
  const target = document.getElementById(id);
  if (target) target.classList.add('active');
  document.querySelectorAll('.nav-link[data-section]').forEach(link => {
    link.classList.toggle('active', link.dataset.section === id);
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
  closeMobileNav();
  closeDropdowns();
  history.pushState(null, '', '#' + id);
}

document.querySelectorAll('.nav-link[data-section]').forEach(link => {
  link.addEventListener('click', e => { e.preventDefault(); showSection(link.dataset.section); });
});

/* ═══ DROPDOWN – solo JS, niente CSS :hover ══════════════════ */
function closeDropdowns(except) {
  // Ottimizzo cercando solo i dropdown attualmente aperti
  document.querySelectorAll('.has-dropdown.open').forEach(d => {
    if (d !== except) d.classList.remove('open');
  });
}

document.querySelectorAll('.has-dropdown > .nav-link').forEach(trigger => {
  trigger.addEventListener('click', e => {
    e.preventDefault();
    // Rimosso e.stopPropagation() per evitare blocchi anomali
    
    const parent = trigger.closest('.has-dropdown');
    const isOpen = parent.classList.contains('open');

    // Logica di toggle semplificata e diretta
    if (isOpen) {
      parent.classList.remove('open');
    } else {
      closeDropdowns(); // Chiude eventuali altre tendine aperte
      parent.classList.add('open');
    }
  });
});

// Chiudi dropdown quando clicchi su un link del dropdown
document.querySelectorAll('.dropdown .nav-link').forEach(link => {
  link.addEventListener('click', () => closeDropdowns());
});

// Chiudi dropdown quando clicchi/tocchi fuori dal menu
// Aggiunto 'touchstart' per far funzionare la chiusura cliccando fuori anche su iPhone/iPad
['click', 'touchstart'].forEach(evento => {
  document.addEventListener(evento, e => {
    if (!e.target.closest('.has-dropdown')) {
      closeDropdowns();
    }
  }, { passive: true });
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeDropdowns(); closeMobileNav(); }
});

/* ═══ MENU MOBILE ════════════════════════════════════════════ */
const navToggle = document.getElementById('navToggle');
const mainNav   = document.getElementById('mainNav');

navToggle.addEventListener('click', e => {
  e.stopPropagation();
  const isOpen = mainNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
  navToggle.classList.toggle('is-open', isOpen);
  if (!isOpen) closeDropdowns();
});

function closeMobileNav() {
  mainNav.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.classList.remove('is-open');
}

document.addEventListener('click', e => {
  if (!mainNav.contains(e.target) && !navToggle.contains(e.target)) closeMobileNav();
});

/* ═══ HASH ROUTING ═══════════════════════════════════════════ */
const validSections = [
  'home','spedizione','visure','biglietti-spett','cartoleria',
  'treno-bus','carta-identita','servizi-postali','altri-servizi','contatti'
];

function loadFromHash() {
  const hash = window.location.hash.replace('#', '');
  showSection(validSections.includes(hash) ? hash : 'home');
}

window.addEventListener('DOMContentLoaded', loadFromHash);
window.addEventListener('popstate', loadFromHash);

/* ═══ HEADER SHADOW ══════════════════════════════════════════ */
const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
  header.style.boxShadow = window.scrollY > 10
    ? '0 4px 24px rgba(0,0,0,.28)'
    : '0 2px 16px rgba(0,0,0,.2)';
}, { passive: true });

window.addEventListener('resize', () => { if (window.innerWidth > 900) closeMobileNav(); });
