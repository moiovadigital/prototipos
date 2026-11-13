/* AFL Farroupilha — protótipo (conteúdo estático, sem backend) */
(function () {
    'use strict';

    /* Menu mobile */
    var btn = document.querySelector('.menu-button');
    var menu = document.getElementById('mobileMenu');
    if (btn && menu) {
        btn.addEventListener('click', function () {
            var open = menu.classList.toggle('open');
            btn.setAttribute('aria-expanded', open ? 'true' : 'false');
            btn.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
        });
        menu.addEventListener('keydown', function (ev) {
            if (ev.key === 'Escape' && menu.classList.contains('open')) {
                menu.classList.remove('open');
                btn.setAttribute('aria-expanded', 'false');
                btn.setAttribute('aria-label', 'Abrir menu');
                btn.focus();
            }
        });
    }

    /* Ano do rodapé */
    var year = document.getElementById('ano');
    if (year) year.textContent = new Date().getFullYear();

    /* ===== Dados reais — 16 cadeiras fundadoras (fonte: afl.txt) ===== */
    var BIO_PADRAO = 'Biografia a confirmar com a Academia.';
    var ACADEMICOS = [
        { n: 1, nome: 'Ivone Foletto Vendrúsculo', cargo: 'Presidente · desde a fundação', bio: 'Professora de português há mais de 30 anos e escritora, autora de “Caravaggio: 50 anos de Trabalho e Fé”. Recebeu o Certificado Destaque Cultural (Literatura) da Câmara de Vereadores em 2024.' },
        { n: 2, nome: 'Diego Dartagnan da Silva Tormes', cargo: '', bio: BIO_PADRAO },
        { n: 3, nome: 'Dieverson Colombo', cargo: '', bio: BIO_PADRAO },
        { n: 4, nome: 'Deise Noro', cargo: '', bio: BIO_PADRAO },
        { n: 5, nome: 'Arnaldo Zampieti da Silva', cargo: '', bio: BIO_PADRAO },
        { n: 6, nome: 'José Luiz Flores Moró', cargo: '', bio: 'Autor de “Guerra e Lavra”, lançado na 33ª Feira do Livro de Farroupilha (novembro de 2024).' },
        { n: 7, nome: 'Adriana Lins', cargo: '', bio: BIO_PADRAO },
        { n: 8, nome: 'Claudir Cearetta', cargo: '', bio: BIO_PADRAO },
        { n: 9, nome: 'Claudia Cristine Pérez Lembo', cargo: '', bio: BIO_PADRAO },
        { n: 10, nome: 'Tânia Perotti Bertol', cargo: 'Autora do lema da AFL', bio: 'Professora e mestre em Letras, autora de “Um ipê para Manuela” e “Procura-se Criança Encantada”. Patrona da 33ª Feira do Livro (2024) e fotógrafa profissional.' },
        { n: 11, nome: 'Lauro Edson Da Cás', cargo: '', bio: BIO_PADRAO },
        { n: 12, nome: 'Júlia de Rossi', cargo: '', bio: 'Escritora. Oficinas e bate-papos com a AFL nas 34ª e 35ª Feiras do Livro de Farroupilha.' },
        { n: 13, nome: 'Júlia Eduarda Rigol', cargo: '', bio: BIO_PADRAO },
        { n: 14, nome: 'Angel Maioli', cargo: '', bio: BIO_PADRAO },
        { n: 15, nome: 'Juliano Luiz Baumgarten', cargo: '', bio: BIO_PADRAO },
        { n: 16, nome: 'Darci Levis', cargo: '', bio: 'Autor de “No Caminho da Riqueza”, lançado na 33ª Feira do Livro de Farroupilha (novembro de 2024).' }
    ];
    var TOTAL_CADEIRAS = 16;

    function iniciais(nome) {
        return nome.split(' ').filter(Boolean).slice(0, 2).map(function (p) { return p[0]; }).join('').toUpperCase();
    }
    function esc(s) {
        return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    /* Galeria (academicos.html) */
    var grid = document.getElementById('gridAcademicos');
    if (grid) {
        function render(filterText) {
            var termo = (filterText || '').trim().toLowerCase();
            var html = '';
            for (var i = 1; i <= TOTAL_CADEIRAS; i++) {
                var a = ACADEMICOS.filter(function (x) { return x.n === i; })[0];
                if (termo && (!a || a.nome.toLowerCase().indexOf(termo) === -1)) continue;
                var num = (i < 10 ? '0' : '') + i;
                if (a) {
                    html += '<article class="card">' +
                        '<div class="avatar" aria-hidden="true">' + iniciais(a.nome) + '</div>' +
                        '<div class="role">Cadeira ' + num + (a.cargo ? ' · ' + esc(a.cargo) : '') + '</div>' +
                        '<h3>' + esc(a.nome) + '</h3>' +
                        '<p>' + esc(a.bio) + '</p>' +
                        '</article>';
                }
            }
            grid.innerHTML = html || '<p class="center" style="color:var(--texto-suave)">Nenhum acadêmico com esse nome.</p>';
            var counter = document.getElementById('contador');
            if (counter) {
                var visiveis = grid.querySelectorAll('.card').length;
                counter.textContent = termo
                    ? visiveis + ' de ' + TOTAL_CADEIRAS + ' cadeiras'
                    : TOTAL_CADEIRAS + ' cadeiras fundadoras';
            }
        }
        render('');
        var filtro = document.getElementById('filtroAcademicos');
        if (filtro) filtro.addEventListener('input', function () { render(filtro.value); });
    }

    /* ===== Agenda — eventos reais (fonte: afl.txt) ===== */
    var EVENTOS = [
        {
            titulo: '35ª Feira do Livro de Farroupilha',
            tipo: 'feira', tipoNome: 'Feira do Livro',
            dia: '10–15', mes: 'nov · 2026', quando: '10 a 15 de novembro de 2026 · Praça da Emancipação',
            desc: 'AFL presente com bate-papo e sessão de autógrafos. Organização: Prefeitura Municipal e Sesc.',
            status: 'emcurso', statusNome: 'Em curso', ancora: 'feira35',
            painel: '<span class="panel-kicker">Programação AFL · 35ª Feira do Livro</span>' +
                '<h4 class="panel-title">“Uma Obra, uma História” e bate-papo com Júlia de Rossi</h4>' +
                '<ul class="panel-list">' +
                '<li><strong>Sábado, 14/11/2026, 10h</strong> — bate-papo “Uma Obra, uma História”, com a AFL.</li>' +
                '<li><strong>Sexta, 13/11/2026, 9h</strong> — a acadêmica Júlia de Rossi apresenta “A Menina, a Mulher e a Literatura”.</li>' +
                '</ul>' +
                '<p>Local: Praça da Emancipação, Farroupilha/RS. Entrada gratuita. A Feira acontece de 10 a 15 de novembro de 2026.</p>'
        },
        {
            titulo: 'Reuniões na sede universitária',
            tipo: 'encontro', tipoNome: 'Encontro',
            dia: 'mensal', mes: 'UCS Farroupilha', quando: 'Mensal · UCS Campus Farroupilha — frequência a confirmar',
            desc: 'Reuniões da Academia na sala cedida pela UCS desde fevereiro de 2025 — também usada para lançamentos de livros e palestras.',
            status: 'recorrente', statusNome: 'Recorrente'
        },
        {
            titulo: 'Palestras e debates universitários',
            tipo: 'encontro', tipoNome: 'Parceria UCS',
            dia: 'sob', mes: 'agendamento', quando: 'Sob agendamento · parceria com a UCS Campus Farroupilha',
            desc: 'Eventos, debates e palestras voltados ao estímulo à escrita e ao fortalecimento da produção acadêmica e artística.',
            status: 'recorrente', statusNome: 'Recorrente'
        },
        {
            titulo: '34ª Feira do Livro de Farroupilha',
            tipo: 'feira', tipoNome: 'Feira do Livro',
            dia: '04–09', mes: 'nov · 2025', quando: '4 a 9 de novembro de 2025',
            desc: 'Espaço próprio da AFL — oficina “Escrita e marca-páginas” com Júlia de Rossi e Andrei Rodrigues.',
            status: 'realizado', statusNome: 'Realizado',
            painel: '<span class="panel-kicker">Memória · 34ª Feira do Livro</span>' +
                '<h4 class="panel-title">Espaço da Academia Farroupilhense de Letras</h4>' +
                '<p>Pela primeira vez a AFL teve espaço próprio na Feira, com a oficina de escrita e marca-páginas ministrada pelas acadêmicas Júlia de Rossi e Andrei Rodrigues.</p>'
        },
        {
            titulo: 'Rifa de angariação da AFL',
            tipo: 'angariacao', tipoNome: 'Angariação',
            dia: '18/04', mes: '2025', quando: 'Sorteio em 18 de abril de 2025 · R$ 10 o número',
            desc: 'Rifa online no Instagram. 1º prêmio: quadro a óleo pintado pela presidente Ivone Vendrúsculo; 2º e 3º: kit de livros autorais dos membros fundadores.',
            status: 'realizado', statusNome: 'Realizado',
            painel: '<span class="panel-kicker">Memória · Rifa de angariação 2025</span>' +
                '<h4 class="panel-title">Formato comprovado, repetível</h4>' +
                '<p>A rifa foi a primeira ação de angariação da Academia, com sorteio público realizado no Instagram da AFL em 18/04/2025. O formato pode ser repetido nas edições seguintes — data da próxima edição a anunciar.</p>'
        },
        {
            titulo: '33ª Feira do Livro de Farroupilha',
            tipo: 'feira', tipoNome: 'Feira do Livro',
            dia: '05–09', mes: 'nov · 2024', quando: '5 a 9 de novembro de 2024',
            desc: 'AFL na programação oficial. Lançamentos de “Guerra e Lavra” (José Luiz Flores Moró) e “No Caminho da Riqueza” (Darci Levis).',
            status: 'realizado', statusNome: 'Realizado',
            painel: '<span class="panel-kicker">Memória · 33ª Feira do Livro</span>' +
                '<h4 class="panel-title">Lançamentos e presença na programação</h4>' +
                '<p>Duas obras dos acadêmicos fundadores foram lançadas na edição: <strong>“Guerra e Lavra”</strong>, de José Luiz Flores Moró (Cadeira 06), e <strong>“No Caminho da Riqueza”</strong>, de Darci Levis (Cadeira 16). A acadêmica Tânia Perotti Bertol foi patrona desta edição.</p>'
        }
    ];

    var lista = document.getElementById('listaEventos');
    if (lista) {
        var abriuPorHash = false;
        function renderEventos(tipo) {
            var html = '';
            EVENTOS.filter(function (e) { return !tipo || tipo === 'todos' || e.tipo === tipo; })
                .forEach(function (e, i) {
                    var btnId = 'ev-btn-' + i;
                    var painelId = 'ev-painel-' + i;
                    html += '<article class="event"' + (e.ancora ? ' id="' + e.ancora + '"' : '') + '>' +
                        '<div class="event-row">' +
                            '<span class="date"><strong>' + e.dia + '</strong><span>' + e.mes + '</span></span>' +
                            '<div class="event-head"><span class="tag">' + e.tipoNome + '</span><h3 class="event-title">' + e.titulo + '</h3>' +
                            '<p class="event-desc">' + e.desc + '</p></div>' +
                            '<span class="event-aside"><span class="status ' + e.status + '">' + e.statusNome + '</span></span>' +
                            (e.painel ?
                                '<button class="event-toggle" type="button" id="' + btnId + '" aria-expanded="false" aria-controls="' + painelId + '" aria-label="Detalhes: ' + e.titulo + '">' +
                                '<span class="chev" aria-hidden="true"></span></button>' : '') +
                        '</div>' +
                        (e.painel ?
                            '<div class="event-panel" id="' + painelId + '" role="region" aria-labelledby="' + btnId + '">' +
                            '<div class="event-panel-inner"><div class="panel-body">' + e.painel + '</div></div>' +
                            '</div>' : '') +
                        '</article>';
                });
            lista.innerHTML = html || '<p class="center" style="color:var(--texto-suave)">Nenhum evento nesta categoria.</p>';
            if (!abriuPorHash && location.hash === '#feira35') {
                var alvo = document.getElementById('feira35');
                if (alvo) {
                    abriuPorHash = true;
                    alvo.classList.add('is-open');
                    var btnAlvo = alvo.querySelector('.event-toggle');
                    if (btnAlvo) btnAlvo.setAttribute('aria-expanded', 'true');
                }
            }
        }
        renderEventos('todos');

        /* sanfona: abre ao clicar, fecha ao clicar de novo ou em outro evento */
        lista.addEventListener('click', function (ev) {
            var alvoBtn = ev.target.closest('.event-toggle');
            if (!alvoBtn) return;
            var card = alvoBtn.closest('.event');
            var jaAberto = card.classList.contains('is-open');
            Array.prototype.forEach.call(lista.querySelectorAll('.event.is-open'), function (a) {
                a.classList.remove('is-open');
                var b = a.querySelector('.event-toggle');
                if (b) b.setAttribute('aria-expanded', 'false');
            });
            if (!jaAberto) {
                card.classList.add('is-open');
                alvoBtn.setAttribute('aria-expanded', 'true');
            }
        });

        var chips = document.querySelectorAll('.chip');
        Array.prototype.forEach.call(chips, function (chip) {
            chip.addEventListener('click', function () {
                Array.prototype.forEach.call(chips, function (c) { c.setAttribute('aria-pressed', 'false'); });
                chip.setAttribute('aria-pressed', 'true');
                renderEventos(chip.dataset.tipo);
            });
        });
    }

    /* Revelação suave ao rolar — apenas transform (nunca opacity) */
    var podeAnimar = !window.matchMedia || !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var alvosReveal = document.querySelectorAll(
        '.strip-item, .feature, .news-item, .card, .event, .info-card, .form-card, .section-heading, .contact-links a, .article, .book, .partner, .timeline-item'
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
        Array.prototype.forEach.call(alvosReveal, function (el, i) {
            el.classList.add('reveal');
            el.style.transitionDelay = (i % 4) * 60 + 'ms';
            obs.observe(el);
        });
    }

    /* Troca de fundo do hero — só existe na home (botão #heroSwitch) */
    var heroBtn = document.getElementById('heroSwitch');
    var heroSec = document.querySelector('.hero');
    if (heroBtn && heroSec) {
        var heroIdx = 0;
        try {
            var salvo = window.localStorage.getItem('afl-hero');
            if (salvo !== null && !isNaN(parseInt(salvo, 10))) heroIdx = ((parseInt(salvo, 10) % 2) + 2) % 2;
        } catch (e) { /* sem storage: começa no fundo 1 */ }
        var heroTxt = document.getElementById('heroSwitchTxt');
        function aplicarHero() {
            heroSec.classList.remove('fundo-1', 'fundo-2');
            heroSec.classList.add('fundo-' + (heroIdx + 1));
            if (heroTxt) heroTxt.textContent = 'fundo ' + (heroIdx + 1);
            heroBtn.setAttribute('aria-label', 'Trocar imagem de fundo do hero — fundo ' + (heroIdx + 1));
        }
        aplicarHero();
        heroBtn.addEventListener('click', function () {
            heroIdx = (heroIdx + 1) % 2;
            try { window.localStorage.setItem('afl-hero', String(heroIdx)); } catch (e) { /* modo privado */ }
            aplicarHero();
        });
    }

    /* Formulário de contato — apenas demonstração (sem backend) */
    var form = document.getElementById('formContato');
    if (form) {
        form.addEventListener('submit', function (ev) {
            ev.preventDefault();
            var msg = document.getElementById('formFeedback');
            if (msg) {
                msg.hidden = false;
                msg.textContent = 'Demonstração de protótipo: nenhuma mensagem foi enviada. No site real, este formulário chegaria à presidente da AFL.';
                msg.focus();
            }
        });
    }
})();
