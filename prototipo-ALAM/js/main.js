/* =========================================================
   ALAM — Academia de Letras de Águas Mornas
   Interações do site institucional (protótipo multipágina)
   ========================================================= */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var DESKTOP_W = 1000;

  /* ---------------- Menu principal (mobile) ---------------- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('menu-principal');

  function setMenu(open) {
    if (!toggle || !nav) return;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu de navegação' : 'Abrir menu de navegação');
    nav.classList.toggle('is-open', open);
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      setMenu(toggle.getAttribute('aria-expanded') !== 'true');
    });

    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setMenu(false);
        toggle.focus();
      }
    });

    document.addEventListener('click', function (e) {
      if (
        toggle.getAttribute('aria-expanded') === 'true' &&
        !e.target.closest('.nav') &&
        !e.target.closest('.nav-toggle')
      ) setMenu(false);
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > DESKTOP_W) setMenu(false);
    });
  }

  /* ---------------- Sombra do cabeçalho ---------------- */
  var header = document.querySelector('.site-header');
  function onScrollHeader() {
    if (header) header.classList.toggle('is-stuck', window.scrollY > 8);
  }
  onScrollHeader();
  window.addEventListener('scroll', onScrollHeader, { passive: true });

  /* ---------------- Revelação ao rolar ---------------- */
  var revealItems = document.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    revealItems.forEach(function (el, i) {
      el.style.transitionDelay = (i % 4) * 70 + 'ms';
      revealObserver.observe(el);
    });
  }

  /* ---------------- Contagem regressiva ----------------
     IV Encontro das Artes — 28/11/2026 */
  var countdowns = document.querySelectorAll('[data-countdown]');
  if (countdowns.length) {
    var target = new Date('2026-11-28T00:00:00-03:00').getTime();

    function pad(n) { return n < 10 ? '0' + n : String(n); }

    function tick() {
      var diff = target - Date.now();
      countdowns.forEach(function (box) {
        var d = box.querySelector('[data-days]');
        var h = box.querySelector('[data-hours]');
        var m = box.querySelector('[data-minutes]');
        if (diff <= 0) {
          if (d) d.textContent = '00';
          if (h) h.textContent = '00';
          if (m) m.textContent = '00';
          box.setAttribute('aria-label', 'O IV Encontro das Artes já está acontecendo ou foi realizado');
          return;
        }
        var min = Math.floor(diff / 60000);
        if (d) d.textContent = pad(Math.floor(min / 1440));
        if (h) h.textContent = pad(Math.floor((min % 1440) / 60));
        if (m) m.textContent = pad(min % 60);
      });
    }

    tick();
    setInterval(tick, 30000);
  }

  /* ---------------- Formulário de contato ----------------
     Protótipo: valida e devolve mensagem local — nada é enviado. */
  var form = document.getElementById('form-contato');
  if (form) {
    var status = document.getElementById('form-status');
    var messages = {
      nome: 'Por favor, informe seu nome.',
      email: 'Informe um e-mail válido.',
      assunto: 'Selecione um assunto.',
      mensagem: 'Escreva sua mensagem.'
    };

    function showError(field, msg) {
      var error = document.getElementById('erro-' + field.id);
      field.setAttribute('aria-invalid', 'true');
      if (error) { error.textContent = msg; error.hidden = false; }
    }

    function clearError(field) {
      var error = document.getElementById('erro-' + field.id);
      field.removeAttribute('aria-invalid');
      if (error) { error.textContent = ''; error.hidden = true; }
    }

    function validate(field) {
      var value = (field.value || '').trim();
      if (!value) { showError(field, messages[field.id] || 'Campo obrigatório.'); return false; }
      if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        showError(field, messages.email);
        return false;
      }
      clearError(field);
      return true;
    }

    form.querySelectorAll('input, select, textarea').forEach(function (field) {
      field.addEventListener('blur', function () {
        if (field.value.trim() || field.getAttribute('aria-invalid') === 'true') validate(field);
      });
      field.addEventListener('input', function () {
        if (field.getAttribute('aria-invalid') === 'true') validate(field);
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var fields = Array.prototype.slice.call(form.querySelectorAll('input, select, textarea'));
      var valid = fields.map(validate).every(Boolean);

      if (!valid) {
        status.textContent = 'Revise os campos destacados antes de enviar.';
        status.style.background = '#FBE9E7';
        status.style.color = '#9B1C15';
        var firstInvalid = form.querySelector('[aria-invalid="true"]');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      status.textContent = 'Mensagem registrada! Entraremos em contato em breve. (Protótipo — nenhum dado foi enviado.)';
      status.style.background = '';
      status.style.color = '';
      form.reset();
    });
  }

  /* ---------------- Botão voltar ao topo ---------------- */
  var fabTop = document.querySelector('.fab-top');
  if (fabTop) {
    var toggleFab = function () {
      fabTop.classList.toggle('is-visible', window.scrollY > 400);
    };
    toggleFab();
    window.addEventListener('scroll', toggleFab, { passive: true });
    fabTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  }

  /* ---------------- Ampliação de imagens (lightbox) ---------------- */
  var lightbox = null;
  var lastFocused = null;

  function openLightbox(src, alt) {
    lastFocused = document.activeElement;
    lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.setAttribute('aria-label', alt || 'Imagem ampliada');

    var img = document.createElement('img');
    img.src = src;
    img.alt = alt || '';

    var close = document.createElement('button');
    close.type = 'button';
    close.className = 'lightbox-close';
    close.setAttribute('aria-label', 'Fechar imagem');
    close.innerHTML = '&times;';

    close.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });

    lightbox.appendChild(img);
    lightbox.appendChild(close);
    document.body.appendChild(lightbox);
    document.body.style.overflow = 'hidden';
    close.focus();
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.remove();
    lightbox = null;
    document.body.style.overflow = '';
    if (lastFocused) lastFocused.focus();
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeLightbox();
  });

  document.querySelectorAll('[data-zoom]').forEach(function (img) {
    img.setAttribute('tabindex', '0');
    img.setAttribute('role', 'button');
    img.addEventListener('click', function () { openLightbox(img.src, img.alt); });
    img.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(img.src, img.alt);
      }
    });
  });
})();
