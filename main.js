/* GUAPO — MAIN JS */

// HERO SLIDESHOW
const heroImgs = document.querySelectorAll('.hero-img');
const heroCounter = document.getElementById('heroCounter');
let currentSlide = 0;
if (heroImgs.length > 0) {
  setInterval(() => {
    heroImgs[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % heroImgs.length;
    heroImgs[currentSlide].classList.add('active');
    if (heroCounter) heroCounter.textContent = `0${currentSlide+1} / 0${heroImgs.length}`;
  }, 4000);
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
