/* Portfolio Rayane Halim — interactions (JS natif, aucune dépendance) */
(() => {
    'use strict';

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const $ = (sel, ctx = document) => ctx.querySelector(sel);
    const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

    /* ---------- Navbar réduite, barre de lecture, bouton retour en haut ---------- */
    const navbar = $('#navbar');
    const progress = $('#progress');
    const toTop = $('#to-top');
    let ticking = false;

    function onScroll() {
        const y = window.scrollY;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        progress.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;
        navbar.classList.toggle('is-scrolled', y > 20);
        toTop.classList.toggle('is-visible', y > 700);
        ticking = false;
    }
    window.addEventListener('scroll', () => {
        if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
    }, { passive: true });
    onScroll();

    toTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
        $('#main').focus({ preventScroll: true });
    });

    /* ---------- Menu mobile ---------- */
    const menuBtn = $('#menu-btn');
    const mobileMenu = $('#mobile-menu');
    function setMenu(open) {
        menuBtn.setAttribute('aria-expanded', String(open));
        menuBtn.querySelector('.sr-only').textContent = open ? 'Fermer le menu' : 'Ouvrir le menu';
        mobileMenu.hidden = !open;
        navbar.classList.toggle('menu-open', open);
    }
    menuBtn.addEventListener('click', () => setMenu(menuBtn.getAttribute('aria-expanded') !== 'true'));
    $$('a', mobileMenu).forEach(a => a.addEventListener('click', () => setMenu(false)));
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && !mobileMenu.hidden) { setMenu(false); menuBtn.focus(); }
    });
    window.matchMedia('(min-width: 768px)').addEventListener('change', e => { if (e.matches) setMenu(false); });

    /* ---------- Apparition des sections au scroll ---------- */
    const reveals = $$('.reveal');
    if (reduceMotion || !('IntersectionObserver' in window)) {
        reveals.forEach(el => el.classList.add('is-visible'));
    } else {
        const io = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    io.unobserve(entry.target);
                }
            });
        }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
        reveals.forEach(el => io.observe(el));
    }

    /* ---------- Texte qui s'écrit dans le titre ---------- */
    const typed = $('#typed');
    if (typed && !reduceMotion) {
        const words = JSON.parse(typed.dataset.words);
        let w = 0;
        let text = words[0];
        let deleting = true;
        const tick = () => {
            const target = words[w];
            if (deleting) {
                text = text.slice(0, -1);
                typed.textContent = text;
                if (text.length === 0) {
                    deleting = false;
                    w = (w + 1) % words.length;
                    return setTimeout(tick, 250);
                }
                return setTimeout(tick, 55);
            }
            const next = words[w];
            text = next.slice(0, text.length + 1);
            typed.textContent = text;
            if (text === next) { deleting = true; return setTimeout(tick, 2200); }
            return setTimeout(tick, 95);
        };
        setTimeout(tick, 2400);
    }

    /* ---------- Cartes projets : légère inclinaison + lueur (souris uniquement) ---------- */
    if (!reduceMotion && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        $$('[data-tilt]').forEach(card => {
            card.addEventListener('pointermove', e => {
                const r = card.getBoundingClientRect();
                const x = (e.clientX - r.left) / r.width;
                const y = (e.clientY - r.top) / r.height;
                card.style.setProperty('--rx', `${((0.5 - y) * 4).toFixed(2)}deg`);
                card.style.setProperty('--ry', `${((x - 0.5) * 4).toFixed(2)}deg`);
                card.style.setProperty('--mx', `${(x * 100).toFixed(1)}%`);
                card.style.setProperty('--my', `${(y * 100).toFixed(1)}%`);
            });
            card.addEventListener('pointerleave', () => {
                card.style.removeProperty('--rx');
                card.style.removeProperty('--ry');
            });
        });
    }

    /* ---------- Fenêtres de détail (<dialog> natif : Échap, focus, clavier gérés) ---------- */
    let lastTrigger = null;
    $$('[data-open]').forEach(btn => btn.addEventListener('click', () => {
        const dlg = document.getElementById(btn.dataset.open);
        if (!dlg) return;
        lastTrigger = btn;
        dlg.showModal();
        dlg.querySelector('.dialog-body')?.scrollTo(0, 0);
    }));
    $$('dialog').forEach(dlg => {
        // Clic en dehors du panneau = fermeture
        dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });
        $$('[data-close]', dlg).forEach(b => b.addEventListener('click', () => dlg.close()));
        dlg.addEventListener('close', () => {
            if (dlg.id !== 'lightbox' && lastTrigger) lastTrigger.focus();
        });
    });

    /* ---------- Visionneuse d'images ---------- */
    const lightbox = $('#lightbox');
    const lbImg = $('img', lightbox);
    const lbCaption = $('figcaption', lightbox);
    const lbPrev = $('[data-prev]', lightbox);
    const lbNext = $('[data-next]', lightbox);
    let gallery = [];
    let index = 0;
    let thumbTrigger = null;

    function showImage() {
        const thumb = gallery[index];
        const alt = $('img', thumb).alt;
        lbImg.src = thumb.dataset.full;
        lbImg.alt = alt;
        lbCaption.textContent = gallery.length > 1 ? `${alt} · ${index + 1} / ${gallery.length}` : alt;
    }
    $$('[data-gallery]').forEach(thumb => {
        thumb.setAttribute('aria-label', `Agrandir : ${$('img', thumb).alt}`);
        thumb.addEventListener('click', () => {
            gallery = $$(`[data-gallery="${thumb.dataset.gallery}"]`);
            index = gallery.indexOf(thumb);
            thumbTrigger = thumb;
            const single = gallery.length < 2;
            lbPrev.hidden = single;
            lbNext.hidden = single;
            showImage();
            lightbox.showModal();
        });
    });
    const step = d => { index = (index + d + gallery.length) % gallery.length; showImage(); };
    lbPrev.addEventListener('click', () => step(-1));
    lbNext.addEventListener('click', () => step(1));
    lightbox.addEventListener('keydown', e => {
        if (gallery.length < 2) return;
        if (e.key === 'ArrowLeft') step(-1);
        if (e.key === 'ArrowRight') step(1);
    });
    lightbox.addEventListener('click', e => { if (e.target.tagName === 'FIGURE') lightbox.close(); });
    lightbox.addEventListener('close', () => thumbTrigger?.focus());

    /* ---------- Formulaire de contact (Formspree, sans rechargement) ---------- */
    const form = $('#contact-form');
    const status = $('#form-status');
    form.addEventListener('submit', async e => {
        e.preventDefault();
        const btn = $('button[type=submit]', form);
        const label = $('.btn-label', btn);
        btn.disabled = true;
        label.textContent = 'Envoi en cours…';
        status.textContent = '';
        status.className = 'text-sm font-semibold min-h-[1.25rem]';
        try {
            const res = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: { Accept: 'application/json' }
            });
            if (!res.ok) throw new Error();
            form.reset();
            status.textContent = 'Merci, votre message a bien été envoyé. Je vous réponds rapidement.';
            status.classList.add('text-emerald-700');
        } catch {
            status.textContent = "L'envoi a échoué. Vous pouvez m'écrire directement à rayanehalim677@gmail.com.";
            status.classList.add('text-red-700');
        } finally {
            btn.disabled = false;
            label.textContent = 'Envoyer le message';
        }
    });
})();
