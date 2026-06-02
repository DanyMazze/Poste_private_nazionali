/**
 * script.js
 * Poste Private Mazzetti – Torino
 * ─────────────────────────────────────────────────────────────
 * Responsabilità:
 *  1. Navigazione SPA (showSection)
 *  2. Routing via hash URL
 *  3. Menu mobile (hamburger)
 *  4. Dropdown "Poste Private Naz."
 *  5. Ombra header allo scroll
 */

/* ─────────────────────────────────────────────────────────────
   COSTANTI
   ───────────────────────────────────────────────────────────── */
const VALID_SECTIONS = [
  'home', 'spedizione', 'visure', 'biglietti-spett',
  'cartoleria', 'treno-bus', 'carta-identita',
  'servizi-postali', 'altri-servizi', 'contatti'
];

/* ─────────────────────────────────────────────────────────────
   1. NAVIGAZIONE SPA
   ───────────────────────────────────────────────────────────── */

/**
 * Mostra la sezione con l'id indicato, nasconde tutte le altre,
 * aggiorna la classe `active` nei link di navigazione,
 * torna in cima alla pagina e aggiorna l'URL hash.
 * @param {string} id - ID della sezione da mostrare
 */
function showSection(id) {
  // Nasconde tutte le sezioni
  document.querySelectorAll('.page-section')
    .forEach(sec => sec.classList.remove('active'));

  // Attiva la sezione richiesta
  const target = document.getElementById(id);
  if (target) target.classList.add('active');

  // Aggiorna lo stato "active" nei link nav
  document.querySelectorAll('.nav-link[data-section]')
    .forEach(link => link.classList.toggle('active', link.dataset.section === id));

  // Torna in cima e chiude il menu mobile
  window.scrollTo({ top: 0, behavior: 'smooth' });
  closeMobileNav();

  // Aggiorna l'URL senza ricaricare la pagina
  history.pushState(null, '', '#' + id);
}

// Gestione click sui link di navigazione con data-section
document.querySelectorAll('.nav-link[data-section]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    showSection(link.dataset.section);
  });
});

/* ─────────────────────────────────────────────────────────────
   2. ROUTING HASH URL
   ───────────────────────────────────────────────────────────── */

/**
 * Legge l'hash corrente dell'URL e mostra la sezione corrispondente.
 * Se l'hash non corrisponde a una sezione valida, mostra la home.
 */
function loadFromHash() {
  const hash = window.location.hash.replace('#', '');
  showSection(VALID_SECTIONS.includes(hash) ? hash : 'home');
}

window.addEventListener('DOMContentLoaded', loadFromHash);
window.addEventListener('popstate', loadFromHash);

/* ─────────────────────────────────────────────────────────────
   3. MENU MOBILE
   ───────────────────────────────────────────────────────────── */
const navToggle = document.getElementById('navToggle');
const mainNav   = document.getElementById('mainNav');

/** Chiude il menu mobile e aggiorna gli attributi ARIA. */
function closeMobileNav() {
  mainNav.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.classList.remove('is-open');
}

// Toggle al click sul hamburger
navToggle.addEventListener('click', e => {
  e.stopPropagation();
  const isOpen = mainNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
  navToggle.classList.toggle('is-open', isOpen);
  if (!isOpen) closeDropdowns();
});

// Chiude il menu cliccando fuori
document.addEventListener('click', e => {
  if (!mainNav.contains(e.target) && !navToggle.contains(e.target)) {
    closeMobileNav();
  }
});

// Chiude il menu su resize desktop
window.addEventListener('resize', () => {
  if (window.innerWidth > 900) closeMobileNav();
});

// Chiude su Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeMobileNav();
});

// Stato iniziale: menu chiuso
document.addEventListener('DOMContentLoaded', closeMobileNav);

/* ─────────────────────────────────────────────────────────────
   4. DROPDOWN "POSTE PRIVATE NAZ."
   ───────────────────────────────────────────────────────────── */

/** Chiude tutti i dropdown aperti. */
function closeDropdowns() {
  document.querySelectorAll('.has-dropdown.open')
    .forEach(el => el.classList.remove('open'));
}

document.querySelectorAll('.has-dropdown').forEach(container => {
  const trigger = container.querySelector('.nav-link');

  trigger.addEventListener('click', e => {
    e.preventDefault();
    e.stopPropagation();
    const isOpen = container.classList.toggle('open');
    // Chiude gli altri dropdown aperti
    document.querySelectorAll('.has-dropdown.open').forEach(other => {
      if (other !== container) other.classList.remove('open');
    });
    if (!isOpen) closeDropdowns();
  });
});

// Chiude i dropdown cliccando fuori
document.addEventListener('click', closeDropdowns);

/* ─────────────────────────────────────────────────────────────
   5. OMBRA HEADER ALLO SCROLL
   ───────────────────────────────────────────────────────────── */
const header = document.querySelector('.site-header');

window.addEventListener('scroll', () => {
  header.style.boxShadow = window.scrollY > 10
    ? '0 4px 24px rgba(0,0,0,.28)'
    : '0 2px 16px rgba(0,0,0,.2)';
}, { passive: true });
