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

// LIGHTBOX (zoom view)
const lb = document.getElementById('lightbox');
if (lb) {
  const lbImg = document.getElementById('lbImg');
  const lbC = document.getElementById('lbCounter');
  const lbInfo = document.getElementById('lbInfo');
  const lbName = document.getElementById('lbName');
  const lbPrice = document.getElementById('lbPrice');
  const lbMeta = document.getElementById('lbMeta');
  const zoomables = document.querySelectorAll('.zoomable');
  const items = Array.from(zoomables).map(el => {
    const img = el.querySelector('img');
    const card = el.closest('.shop-card');
    const name = card && card.querySelector('.shop-name');
    const price = card && card.querySelector('.shop-price');
    const meta = card ? Array.from(card.querySelectorAll('.shop-meta li')).map(li => li.textContent.trim()) : [];
    return {
      src: img ? img.src : '',
      name: name ? name.textContent.trim() : '',
      price: price ? price.innerHTML.trim() : '',
      meta
    };
  });
  let cur = 0;
  const render = i => {
    const it = items[i];
    lbImg.src = it.src;
    lbC.textContent = `${i+1} / ${items.length}`;
    const hasInfo = it.name || it.price || it.meta.length;
    lbInfo.classList.toggle('visible', !!hasInfo);
    lbName.textContent = it.name;
    lbPrice.innerHTML = it.price;
    lbMeta.innerHTML = it.meta.map(m => `<li>${m}</li>`).join('');
  };
  const open = i => { cur = i; render(i); lb.classList.add('open'); document.body.style.overflow = 'hidden'; };
  const close = () => { lb.classList.remove('open'); document.body.style.overflow = ''; };
  const navi = d => { cur = (cur + d + items.length) % items.length; render(cur); };
  zoomables.forEach((el, i) => el.addEventListener('click', e => { e.preventDefault(); open(i); }));
  document.getElementById('lbClose').addEventListener('click', close);
  document.getElementById('lbPrev').addEventListener('click', () => navi(-1));
  document.getElementById('lbNext').addEventListener('click', () => navi(1));
  lb.addEventListener('click', e => { if (e.target === lb) close(); });
  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') navi(-1);
    if (e.key === 'ArrowRight') navi(1);
  });
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
