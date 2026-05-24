/* GUAPO — MAIN JS */

// CONTACT FORM (n8n webhook)
// TODO: set N8N_WEBHOOK_URL to the production endpoint (e.g. https://n8n.example.com/webhook/guapo-contact)
// If left blank, the form falls back to a friendly message asking visitors to use WhatsApp.
const N8N_WEBHOOK_URL = '';

const contactForm = document.getElementById('contactForm');
const contactStatus = document.getElementById('contactStatus');
if (contactForm && contactStatus) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    contactStatus.className = 'contact-status';
    contactStatus.textContent = 'Enviando…';
    const payload = Object.fromEntries(new FormData(contactForm).entries());
    if (!N8N_WEBHOOK_URL) {
      contactStatus.className = 'contact-status is-error';
      contactStatus.textContent = 'Formulario en configuración. Por favor escríbenos por WhatsApp.';
      return;
    }
    try {
      const res = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('http ' + res.status);
      contactStatus.className = 'contact-status is-ok';
      contactStatus.textContent = 'Gracias. Te respondemos pronto.';
      contactForm.reset();
    } catch (err) {
      contactStatus.className = 'contact-status is-error';
      contactStatus.textContent = 'No pudimos enviar el mensaje. Intenta por WhatsApp.';
    }
  });
}

// SCROLL FADE-IN
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// MOBILE NAV
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));
}

// NAV SCROLL
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  if (!nav) return;
  if (window.scrollY > 80) {
    nav.style.mixBlendMode = 'normal';
    nav.style.background = 'rgba(10,10,10,0.92)';
    nav.style.backdropFilter = 'blur(8px)';
  } else {
    nav.style.mixBlendMode = 'difference';
    nav.style.background = 'transparent';
    nav.style.backdropFilter = 'none';
  }
});
