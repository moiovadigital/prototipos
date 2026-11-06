/* AEL Erechim — protótipo (conteúdo estático, sem planilha) */
(function () {
    'use strict';

    /* Menu mobile */
    var btn = document.querySelector('.menu-button');
    var menu = document.getElementById('mobileMenu');
    if (btn && menu) {
        btn.addEventListener('click', function () {
            var open = menu.classList.toggle('open');
            btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        });
    }

    /* Ano do rodapé */
    var year = document.getElementById('ano');
    if (year) year.textContent = new Date().getFullYear();

    /* Dados provisórios — 33 cadeiras (galeria do protótipo) */
    var ACADEMICOS = [
        { n: 1, nome: 'Zeni Bearzi', cargo: 'Presidente · biênio 2025–2027', bio: 'Preside a Academia e o calendário do Café com Leitura.' },
        { n: 2, nome: 'Maria Luiza Servelin', cargo: 'Vice-presidente', bio: 'Vice da gestão 2025–2027 da AEL.' }
    ];
    var TOTAL_CADEIRAS = 33;

    function iniciais(nome) {
        return nome.split(' ').filter(Boolean).slice(0, 2).map(function (p) { return p[0]; }).join('').toUpperCase();
    }

    /* Galeria (academicos.html) */
    var grid = document.getElementById('gridAcademicos');
    if (grid) {
        function render(filterText) {
            var termo = (filterText || '').trim().toLowerCase();
            var html = '';
            for (var i = 1; i <= TOTAL_CADEIRAS; i++) {
                var a = ACADEMICOS.filter(function (x) { return x.n === i; })[0];
                if (a && termo && a.nome.toLowerCase().indexOf(termo) === -1) continue;
                if (!a && termo) continue;
                if (a) {
                    html += '<article class="card">' +
                        '<div class="avatar" aria-hidden="true">' + iniciais(a.nome) + '</div>' +
                        '<div class="role">Cadeira ' + a.n + '</div>' +
                        '<h3>' + a.nome + '</h3>' +
                        '<p class="role" style="margin:4px 0 8px">' + a.cargo + '</p>' +
                        '<p>' + a.bio + '</p>' +
                        '</article>';
                } else {
                    html += '<article class="card placeholder">' +
                        '<div class="avatar" aria-hidden="true">' + (i < 10 ? '0' + i : i) + '</div>' +
                        '<div class="role">Cadeira ' + i + '</div>' +
                        '<h3>Acadêmico(a) a confirmar</h3>' +
                        '<p>Nome e biografia serão publicados após a validação com a Academia.</p>' +
                        '</article>';
                }
            }
            grid.innerHTML = html;
            var counter = document.getElementById('contador');
            if (counter) {
                var visiveis = grid.querySelectorAll('.card').length;
                counter.textContent = termo
                    ? visiveis + ' de ' + TOTAL_CADEIRAS + ' cadeiras'
                    : TOTAL_CADEIRAS + ' cadeiras';
            }
        }
        render('');
        var filtro = document.getElementById('filtroAcademicos');
        if (filtro) filtro.addEventListener('input', function () { render(filtro.value); });
    }

    /* Agenda (eventos.html) */
    var EVENTOS = [
        {
            titulo: '27ª Feira do Livro de Erechim',
            tipo: 'feira', tipoNome: 'Feira do Livro',
            dia: '01/05', mes: 'a 10/05 · 2026', quando: '1º a 10 de maio de 2026',
            desc: 'Tema “Jardim do Quintana”, em homenagem aos 120 anos de Mário Quintana. Estande da AEL, Leitor do Dia e homenagem a escritores regionais. Apoio: Pró-Cultura RS e SECULT.',
            img: 'imagens/27-feira-do-livro.jpg',
            imgAlt: 'Abertura da 27ª Feira do Livro de Erechim: sino tocado diante do palco com o letreiro “Jardim do Quintana”.',
            nota: true, ancora: 'nota-feira',
            status: 'encerrado'
        },
        {
            titulo: 'Café com Leitura — encontro mensal',
            tipo: 'cafe', tipoNome: 'Café com Leitura',
            dia: 'últ.', mes: 'sábado do mês', quando: 'Mensal · Sesc Erechim',
            desc: 'Encontro aberto ao público com leitura compartilhada, debate e café. Sede alternada entre Sesc e Pólo de Cultura.',
            status: 'proximo'
        },
        {
            titulo: 'Minibiblioteca “Livro Livre” — Villa Trentin',
            tipo: 'acao', tipoNome: 'Ação cultural',
            dia: '25', mes: 'jul · 2026', quando: '25 de julho de 2026',
            desc: 'Segunda unidade da minibiblioteca de circulação livre da AEL (a primeira foi na Feira do Livro de 2026).',
            status: 'encerrado'
        },
        {
            titulo: 'Posse da gestão 2025–2027',
            tipo: 'posse', tipoNome: 'Solenidade',
            dia: 'out', mes: '2025', quando: 'Outubro de 2025',
            desc: 'Posse da presidente Zeni Bearzi e da vice Maria Luiza Servelin, com posse de 3 novos acadêmicos (total: 33).',
            status: 'encerrado'
        }
    ];

    var lista = document.getElementById('listaEventos');
    if (lista) {
        function renderEventos(tipo) {
            var html = '';
            EVENTOS.filter(function (e) { return !tipo || tipo === 'todos' || e.tipo === tipo; })
                .forEach(function (e, i) {
                    var temExtra = !!(e.img || e.nota);
                    var btnId = 'ev-btn-' + i;
                    var painelId = 'ev-painel-' + i;
                    var extra = '';
                    if (e.img) {
                        extra += '<figure class="panel-figure"><img src="' + e.img + '" alt="' + e.imgAlt + '" loading="lazy"></figure>';
                    }
                    if (e.nota) {
                        var tpl = document.getElementById('notaConteudo');
                        if (tpl) extra += tpl.innerHTML;
                    }
                    html += '<article class="event"' + (e.ancora ? ' id="' + e.ancora + '"' : '') + '>' +
                        '<div class="event-row">' +
                            '<span class="date"><strong>' + e.dia + '</strong><span>' + e.mes + '</span></span>' +
                            '<div class="event-head"><span class="tag">' + e.tipoNome + '</span><h3 class="event-title">' + e.titulo + '</h3>' +
                            '<p class="event-desc">' + e.desc + '</p></div>' +
                            '<span class="event-aside"><span class="status ' + (e.status === 'proximo' ? 'proximo' : '') + '">' +
                            (e.status === 'proximo' ? 'Próximo' : 'Realizado') + '</span></span>' +
                            (temExtra ?
                                '<button class="event-toggle" type="button" id="' + btnId + '" aria-expanded="false" aria-controls="' + painelId + '" aria-label="' + e.titulo + '">' +
                                '<span class="chev" aria-hidden="true"></span></button>' : '') +
                        '</div>' +
                        (temExtra ?
                            '<div class="event-panel" id="' + painelId + '" role="region" aria-labelledby="' + btnId + '">' +
                            '<div class="event-panel-inner"><div class="panel-body">' + extra + '</div></div>' +
                            '</div>' : '') +
                        '</article>';
                });
            lista.innerHTML = html || '<p class="center" style="color:var(--texto-suave)">Nenhum evento nesta categoria.</p>';
            if (!abriuPorHash && location.hash === '#nota-feira') {
                var alvo = document.getElementById('nota-feira');
                if (alvo) {
                    abriuPorHash = true;
                    alvo.classList.add('is-open');
                    var btnAlvo = alvo.querySelector('.event-toggle');
                    if (btnAlvo) btnAlvo.setAttribute('aria-expanded', 'true');
                }
            }
        }
        var abriuPorHash = false;
        renderEventos('todos');

        /* sanfona: abre ao clicar, fecha ao clicar de novo ou em outro evento */
        lista.addEventListener('click', function (ev) {
            var btn = ev.target.closest('.event-toggle');
            if (!btn) return;
            var card = btn.closest('.event');
            var jaAberto = card.classList.contains('is-open');
            Array.prototype.forEach.call(lista.querySelectorAll('.event.is-open'), function (a) {
                a.classList.remove('is-open');
                var b = a.querySelector('.event-toggle');
                if (b) b.setAttribute('aria-expanded', 'false');
            });
            if (!jaAberto) {
                card.classList.add('is-open');
                btn.setAttribute('aria-expanded', 'true');
            }
        });
        var chips = document.querySelectorAll('.chip');
        chips.forEach(function (chip) {
            chip.addEventListener('click', function () {
                chips.forEach(function (c) { c.setAttribute('aria-pressed', 'false'); });
                chip.setAttribute('aria-pressed', 'true');
                renderEventos(chip.dataset.tipo);
            });
        });
    }

    /* Revelação suave de conteúdo (scroll) — com respeito a prefers-reduced-motion */
    var podeAnimar = !window.matchMedia || !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var alvosReveal = document.querySelectorAll(
        '.tl-node, .feature, .news-item, .card, .event, .info-card, .form-card, .section-heading, .contact-links a'
    );
    if (podeAnimar && 'IntersectionObserver' in window) {
        var obs = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
        alvosReveal.forEach(function (el, i) {
            el.classList.add('reveal');
            el.style.transitionDelay = (i % 4) * 60 + 'ms';
            obs.observe(el);
        });
    }

    /* Formulário de contato — apenas demonstração */
    var form = document.getElementById('formContato');
    if (form) {
        form.addEventListener('submit', function (ev) {
            ev.preventDefault();
            var msg = document.getElementById('formFeedback');
            if (msg) {
                msg.hidden = false;
                msg.textContent = 'Demonstração de protótipo: nenhuma mensagem foi enviada. No site real, este formulário chegaria na secretaria da AEL.';
                msg.focus();
            }
        });
    }
})();
