/* Portfolio de Rayane Halim · v2 — mise en scène au scroll (GSAP + ScrollTrigger + Lenis) */
(() => {
 'use strict';
 const $ = (s, c = document) => c.querySelector(s);
 const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

 /* ---------- Sommaire ---------- */
 const btn = $('#sommaire-btn'), menu = $('#sommaire');
 const setMenu = open => { menu.hidden = !open; btn.setAttribute('aria-expanded', String(open)); };
 btn.addEventListener('click', () => setMenu(menu.hidden));
 document.addEventListener('keydown', e => { if (e.key === 'Escape' && !menu.hidden) { setMenu(false); btn.focus(); } });
 document.addEventListener('click', e => { if (!menu.hidden && !menu.contains(e.target) && e.target !== btn) setMenu(false); });

 const bar = $('#progress');
 const setProgress = () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  bar.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
 };
 addEventListener('scroll', setProgress, { passive: true }); setProgress();

 // Sans GSAP ou avec « réduire les animations » : la page reste lisible à plat.
 if (reduce || !window.gsap || !window.ScrollTrigger) {
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  return;
 }
 document.documentElement.classList.add('anim');
 gsap.registerPlugin(ScrollTrigger);

 let lenis = null;
 if (window.Lenis) {
  lenis = new Lenis({ lerp: 0.1 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(t => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
 }
 const go = y => lenis ? lenis.scrollTo(y, { duration: 1.4 }) : scrollTo({ top: y, behavior: 'smooth' });

 /* ---------- Où est le soleil dessiné à l'écran ? ----------
    img en object-fit: cover → on retrouve la position (px) et le rayon d'un point
    de l'image source, relativement à un conteneur de référence. */
 function sunIn(img, src, ref) {
  const r = img.getBoundingClientRect(), b = ref.getBoundingClientRect();
  const [px, py] = getComputedStyle(img).objectPosition.split(' ').map(v => parseFloat(v) / 100);
  const k = Math.max(r.width / src.w, r.height / src.h);
  const x = r.left - b.left + (r.width - src.w * k) * px + src.x * k;
  const y = r.top - b.top + (r.height - src.h * k) * py + src.y * k;
  return { x, y, r: src.r * k };
 }
 const COVER = { w: 1536, h: 864, x: 1050, y: 265, r: 280 };   // soleil de la couverture
 const DC_A  = { w: 656,  h: 480, x: 14,   y: 245, r: 100 };   // soleil de la case A (recadrage)
 const diag = () => Math.hypot(innerWidth, innerHeight) * 1.1;

 const coverImg = $('.cover-pic img'), coverStage = $('.cover-stage');
 const sunOut = $('#sun-out circle'), sunInEl = $('#sun-in circle');
 const profil = $('#profil'), aImg = $('.case-a img');
 const reveal = { clipPath: 'inset(0% 0% 100% 0%)' }, shown = { clipPath: 'inset(0% 0% 0% 0%)' };

 /* ---------- Entrée au chargement ---------- */
 gsap.timeline({ defaults: { ease: 'power3.out' } })
  .from(coverImg, { scale: 1.06, duration: 2.4 })
  .from('h1 .w > span', { yPercent: 105, duration: 1.1, stagger: .12, ease: 'power4.out' }, .2)
  .from('.vol', { y: 12, autoAlpha: 0, duration: .6 }, .45)
  .from('.cartouche', { y: 24, autoAlpha: 0, duration: .8 }, .6)
  .from('.bar', { autoAlpha: 0, duration: .8 }, .7);

 const mm = gsap.matchMedia();
 mm.add({ desk: '(min-width: 761px)', mob: '(max-width: 760px)' }, ctx => {
  const { desk } = ctx.conditions;
  const cs = () => sunIn(coverImg, COVER, coverStage);
  const as = () => sunIn(aImg, DC_A, $('.page'));

  /* Couverture → on entre dans le soleil.
     L'illustration ne zoome que de 1,25x ; c'est le soleil vectoriel qui grossit (net). */
  gsap.set(coverImg, { transformOrigin: () => { const s = cs(); const r = coverImg.getBoundingClientRect(), b = coverStage.getBoundingClientRect(); return `${s.x - (r.left - b.left)}px ${s.y - (r.top - b.top)}px`; } });
  gsap.set(sunOut, { attr: { cx: () => cs().x, cy: () => cs().y, r: 0 } });
  const tc = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: {
   trigger: '#couverture', start: 'top top', end: () => '+=' + innerHeight * 0.9, pin: coverStage, scrub: 0.8, invalidateOnRefresh: true } });
  tc.to('.cover-text', { y: -50, autoAlpha: 0, duration: .3, ease: 'power1.in' }, 0)
    .fromTo(coverImg, { scale: 1 }, { scale: 1.25, duration: 1, immediateRender: false }, 0)
    .fromTo(sunOut, { attr: { r: () => cs().r * 1.08 }, opacity: 0 }, { opacity: 1, duration: .1, immediateRender: false }, .22)
    .to(sunOut, { attr: { r: () => diag() }, duration: .68, ease: 'sine.inOut' }, .32);
  // La planche 01 est posée sous la couverture : elle n'apparaît qu'une fois l'écran entièrement rouge
  gsap.set(profil, { autoAlpha: 0 });
  ScrollTrigger.create({ trigger: '#couverture', start: 'top top', end: () => '+=' + innerHeight * 0.9,
   onLeave: () => gsap.set(profil, { autoAlpha: 1 }), onEnterBack: () => gsap.set(profil, { autoAlpha: 0 }) });

  /* Le profil arrive : le rouge se resserre jusqu'au soleil dessiné de la case A */
  gsap.set(sunInEl, { attr: { cx: () => as().x, cy: () => as().y, r: () => Math.hypot(innerWidth, innerHeight) * 1.25 } });
  gsap.set('#sun-in', { autoAlpha: 1 });
  const shrink = { attr: { r: () => as().r * 1.04 }, ease: 'power1.out' };

  if (desk) {
   /* La planche se compose case après case (épinglée ~1,3 écran) */
   gsap.set(['.case-b', '.case-d'], reveal);
   gsap.set('.case-c', { autoAlpha: 0, y: 70, rotate: -5 });
   gsap.set(['.narr-title', '.c1', '.c2', '.c3'], { clipPath: 'inset(0% 100% 0% 0%)' });
   const tp = gsap.timeline({ defaults: { ease: 'power2.out' }, scrollTrigger: {
    trigger: profil, start: 'top top', end: () => '+=' + innerHeight * 1.6, pin: '.page', scrub: 0.8, invalidateOnRefresh: true } });
   tp.to(sunInEl, { ...shrink, duration: .22 }, 0)
     .to('#sun-in', { autoAlpha: 0, duration: .05, ease: 'none' }, .22)
     .fromTo('.case-a img', { scale: 1.12 }, { scale: 1, duration: 1, ease: 'none' }, 0)
     .to('.narr-title', { clipPath: 'inset(0% 0% 0% 0%)', duration: .12 }, 0.26)
     .to('.c1', { clipPath: 'inset(0% 0% 0% 0%)', duration: .12 }, 0.33)
     .to('.case-b', { ...shown, duration: .16 }, 0.44)
     .fromTo('.case-b img', { scale: 1.18 }, { scale: 1, duration: .5, ease: 'none' }, 0.44)
     .to('.c2', { clipPath: 'inset(0% 0% 0% 0%)', duration: .12 }, 0.54)
     .to('.case-c', { autoAlpha: 1, y: 0, rotate: -1.5, duration: .16, ease: 'back.out(1.4)' }, 0.65)
     .to('.c3', { clipPath: 'inset(0% 0% 0% 0%)', duration: .12 }, 0.74)
     .to('.case-d', { ...shown, duration: .16 }, 0.85)
     .to({}, { duration: .1 });
   menu.querySelectorAll('a').forEach(a => a.onclick = e => {
    e.preventDefault(); setMenu(false);
    go(a.getAttribute('href') === '#profil' ? tp.scrollTrigger.end : 0);
   });
  } else {
   /* Mobile : la planche se lit de haut en bas, chaque case se dévoile en entrant */
   gsap.timeline({ scrollTrigger: { trigger: profil, start: 'top top', end: () => '+=' + innerHeight * .8, scrub: .8, invalidateOnRefresh: true } })
    .to(sunInEl, { ...shrink, duration: .85 }).to('#sun-in', { autoAlpha: 0, duration: .15 });
   document.querySelectorAll('.case-b, .case-c, .case-d').forEach(c => {
    gsap.fromTo(c, reveal, { ...shown, duration: .8, ease: 'power3.out', scrollTrigger: { trigger: c, start: 'top 85%' } });
   });
   menu.querySelectorAll('a').forEach(a => a.onclick = e => {
    e.preventDefault(); setMenu(false);
    go(a.getAttribute('href') === '#profil' ? profil.offsetTop + 2 : 0);
   });
  }
 });

 // Les géométries dépendent des images et des polices : on recalcule une fois tout chargé.
 Promise.all([document.fonts.ready, coverImg.decode ? coverImg.decode().catch(() => {}) : null])
  .then(() => ScrollTrigger.refresh());
 addEventListener('load', () => ScrollTrigger.refresh());
})();
