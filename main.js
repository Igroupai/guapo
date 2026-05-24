/* GUAPO — MAIN JS */

// CLP → USD CONVERSION
async function renderUsdPrices() {
  const els = document.querySelectorAll('.shop-price[data-clp]');
  if (!els.length) return;
  const FALLBACK = 950;
  let clpPerUsd = FALLBACK;
  try {
    const r = await fetch('https://open.er-api.com/v6/latest/USD');
    const d = await r.json();
    if (d && d.rates && d.rates.CLP) clpPerUsd = d.rates.CLP;
  } catch (e) {}
  els.forEach(el => {
    const clp = parseInt(el.dataset.clp, 10);
    if (!clp) return;
    const usd = clp / clpPerUsd;
    const txt = usd >= 100 ? Math.round(usd).toLocaleString('en-US') : usd.toFixed(usd < 10 ? 2 : 1);
    const sp = document.createElement('span');
    sp.className = 'shop-price-usd';
    sp.textContent = ` · ≈ US$${txt}`;
    el.appendChild(sp);
  });
}
renderUsdPrices();

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
const WHATSAPP_NUMBER = '56900000000'; // TODO: reemplazar con número real (sin + ni espacios, formato 569XXXXXXXX)
const lb = document.getElementById('lightbox');
if (lb) {
  const lbImg = document.getElementById('lbImg');
  const lbC = document.getElementById('lbCounter');
  const lbInfo = document.getElementById('lbInfo');
  const lbName = document.getElementById('lbName');
  const lbPrice = document.getElementById('lbPrice');
  const lbMeta = document.getElementById('lbMeta');
  const lbRequest = document.getElementById('lbRequest');
  const zoomables = Array.from(document.querySelectorAll('.zoomable'));
  let cur = 0;
  const render = i => {
    const el = zoomables[i];
    const img = el.querySelector('img');
    const card = el.closest('.shop-card');
    const name = card && card.querySelector('.shop-name');
    const price = card && card.querySelector('.shop-price');
    const meta = card ? Array.from(card.querySelectorAll('.shop-meta li')) : [];
    lbImg.src = img ? img.src : '';
    lbC.textContent = `${i+1} / ${zoomables.length}`;
    const hasInfo = name || price || meta.length;
    lbInfo.classList.toggle('visible', !!hasInfo);
    lbName.textContent = name ? name.textContent.trim() : '';
    lbPrice.innerHTML = price ? price.innerHTML.trim() : '';
    lbMeta.innerHTML = meta.map(li => `<li>${li.textContent.trim()}</li>`).join('');
    if (lbRequest) {
      const productName = name ? name.textContent.trim() : '';
      if (productName) {
        const msg = `Hola GUAPO, me interesa la obra "${productName}".\n\nMi nombre: \nMi email: `;
        lbRequest.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
        lbRequest.style.display = '';
      } else {
        lbRequest.style.display = 'none';
      }
    }
  };
  const open = i => { cur = i; render(i); lb.classList.add('open'); document.body.style.overflow = 'hidden'; };
  const close = () => { lb.classList.remove('open'); document.body.style.overflow = ''; };
  const navi = d => { cur = (cur + d + zoomables.length) % zoomables.length; render(cur); };
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
