/* GUAPO — MAIN JS */

// HERO SLIDESHOW
function runSlideshow(selector, counterId, interval) {
  const imgs = document.querySelectorAll(selector);
  if (!imgs.length) return;
  const counter = counterId ? document.getElementById(counterId) : null;
  let i = 0;
  setInterval(() => {
    imgs[i].classList.remove('active');
    i = (i + 1) % imgs.length;
    imgs[i].classList.add('active');
    if (counter) counter.textContent = `0${i+1} / 0${imgs.length}`;
  }, interval);
}
runSlideshow('.hero-img', 'heroCounter', 4000);
runSlideshow('.ah-img',   'ahCounter',   5000);

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
