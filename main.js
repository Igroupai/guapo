/* ===========================
   GUAPO ART GALLERY — MAIN JS
   =========================== */

// === CUSTOM CURSOR ===
const cursor = document.getElementById('cur');
const ring = document.getElementById('ring');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

if (cursor && ring) {
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.transform = `translate(${ringX - 18}px, ${ringY - 18}px)`;
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Cursor scale on interactive elements
  document.querySelectorAll('a, button, .gallery-item, .artist-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform += ' scale(2)';
      ring.style.transform += ' scale(1.5)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = cursor.style.transform.replace(' scale(2)', '');
      ring.style.transform = ring.style.transform.replace(' scale(1.5)', '');
    });
  });
}

// === HERO SLIDESHOW ===
const heroImgs = document.querySelectorAll('.hero-img');
const heroCounter = document.getElementById('heroCounter');
let currentSlide = 0;

if (heroImgs.length > 0) {
  setInterval(() => {
    heroImgs[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % heroImgs.length;
    heroImgs[currentSlide].classList.add('active');
    if (heroCounter) {
      const n = currentSlide + 1;
      const total = heroImgs.length;
      heroCounter.textContent = `0${n} / 0${total}`;
    }
  }, 3500);
}

// === SCROLL FADE-IN ===
const fadeEls = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

fadeEls.forEach(el => observer.observe(el));

// === MOBILE NAV TOGGLE ===
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Close nav on link click (mobile)
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });
}

// === NAV SCROLL BLEND ===
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 80) {
    nav.style.mixBlendMode = 'normal';
    nav.style.background = 'rgba(10,10,10,0.9)';
    nav.style.backdropFilter = 'blur(8px)';
  } else {
    nav.style.mixBlendMode = 'difference';
    nav.style.background = 'transparent';
    nav.style.backdropFilter = 'none';
  }
});
