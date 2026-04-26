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
  history.pushState(null, '', '#' + id);
}

document.querySelectorAll('.nav-link[data-section]').forEach(link => {
  link.addEventListener('click', e => { e.preventDefault(); showSection(link.dataset.section); });
});

/* ═══ DROPDOWN – rimosso ══════════════════════════════════════ */

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeMobileNav(); }
});

/* ═══ MENU MOBILE ════════════════════════════════════════════ */
const navToggle = document.getElementById('navToggle');
const mainNav   = document.getElementById('mainNav');

// Inizializza il menu come chiuso al caricamento
function closeMobileNav() {
  mainNav.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.classList.remove('is-open');
}

navToggle.addEventListener('click', e => {
  e.stopPropagation();
  const isOpen = mainNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
  navToggle.classList.toggle('is-open', isOpen);
  if (!isOpen) closeDropdowns();
});

// Chiudi il menu quando il DOM è pronto
document.addEventListener('DOMContentLoaded', () => {
  closeMobileNav();
});

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
