/* ============================================================
   extras.js — Funcionalidades nuevas v2.6
   · Efecto máquina de escribir en el hero
   · Terminal interactiva (easter egg para reclutadores técnicos)
   · Konami code -> lluvia de Spheal
   · Año dinámico en el footer
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---------- 1. AÑO DINÁMICO EN EL FOOTER ---------- */
    const footerP = document.querySelector('footer p');
    if (footerP) {
        footerP.innerHTML = `&copy; ${new Date().getFullYear()} Rodrigo de la Hoz López. Todos los derechos reservados.`;
    }

    /* ---------- 2. EFECTO MÁQUINA DE ESCRIBIR ---------- */
    const twEl = document.querySelector('[data-typewriter]');
    if (twEl && !prefersReducedMotion) {
        const roles = [
            'Ingeniero Informático',
            'Full-Stack Developer',
            'Database Developer',
            'Software Engineer'
        ];
        let roleIndex = 0, charIndex = 0, deleting = false;
        twEl.classList.add('typewriter-text');

        function tick() {
            const current = roles[roleIndex];
            twEl.textContent = current.slice(0, charIndex);

            if (!deleting && charIndex < current.length) {
                charIndex++;
                setTimeout(tick, 90);
            } else if (!deleting && charIndex === current.length) {
                deleting = true;
                setTimeout(tick, 1800); // pausa al terminar la palabra
            } else if (deleting && charIndex > 0) {
                charIndex--;
                setTimeout(tick, 45);
            } else {
                deleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                setTimeout(tick, 350);
            }
        }
        tick();
    }

    /* ---------- 3. TERMINAL INTERACTIVA ---------- */
    const overlay = document.getElementById('terminal-overlay');
    const body = document.getElementById('terminal-body');
    const input = document.getElementById('terminal-input');
    const toggleBtn = document.getElementById('terminal-toggle');

    if (overlay && body && input && toggleBtn) {
        const history = [];
        let histIndex = -1;
        let lastFocusedBeforeTerminal = null;

        const print = (html, cls = '') => {
            const line = document.createElement('div');
            line.className = 'terminal-line' + (cls ? ' ' + cls : '');
            line.innerHTML = html;
            body.appendChild(line);
            body.scrollTop = body.scrollHeight;
        };

        const printWelcome = () => {
            print('Bienvenido a la terminal de <span class="t-accent">Rodrigo de la Hoz</span> 👋');
            print('Escribe <span class="t-cmd">help</span> para ver los comandos disponibles.', 't-muted');
            print('');
        };

        const commands = {
            help() {
                print('Comandos disponibles:', 't-accent');
                const list = [
                    ['help', 'Muestra esta ayuda'],
                    ['whoami', 'Quién soy'],
                    ['about', 'Sobre mí'],
                    ['skills', 'Mis tecnologías'],
                    ['projects', 'Proyectos destacados'],
                    ['experience', 'Mi trayectoria'],
                    ['contact', 'Cómo contactarme'],
                    ['social', 'Mis redes'],
                    ['cv', 'Descargar mi CV'],
                    ['theme', 'Cambiar tema (theme dark|light)'],
                    ['neofetch', 'Resumen del sistema'],
                    ['pokemon', 'Datos de un Pokémon en vivo (pokemon spheal)'],
                    ['ask', 'Pregúntame algo (ask ¿estás disponible?)'],
                    ['matrix', 'Activa el modo Matrix'],
                    ['goto', 'Ir a una sección (goto proyectos)'],
                    ['clear', 'Limpiar la terminal'],
                    ['exit', 'Cerrar la terminal']
                ];
                list.forEach(([c, d]) => print(`  <span class="t-cmd">${c.padEnd(11)}</span><span class="t-muted">${d}</span>`));
            },
            whoami() {
                print('Rodrigo de la Hoz López');
                print('Ingeniero Informático & Software Developer · Ciudad Real, España', 't-muted');
                print('Estudiante de último curso (UCLM) · Software Developer en NTT DATA', 't-muted');
            },
            about() {
                print('Desarrollador full-stack centrado en software robusto, frontend');
                print('interactivo y bases de datos eficientes. Experiencia con Java,');
                print('Python, C++ y stack web moderno. Erasmus de 5 meses en Polonia 🇵🇱.');
            },
            skills() {
                print('Backend   <span class="t-accent2">Java · Python · C++ · Node.js · Spring Boot</span>');
                print('Frontend  <span class="t-accent2">JavaScript · React · Angular · HTML5 · CSS3</span>');
                print('Datos     <span class="t-accent2">Oracle · PostgreSQL · SQL Server · MySQL</span>');
                print('DevOps    <span class="t-accent2">Docker · Linux · Git · GitHub</span>');
            },
            projects() {
                print('Proyectos destacados:', 't-accent');
                print('  1. La Gramola Virtual  <span class="t-muted">Angular · Spring Boot · Stripe</span>');
                print('     <a href="https://github.com/RodriSace/gramolaRodrigo-project" target="_blank" rel="noopener">repositorio →</a>');
                print('  2. Explorador Pokémon  <span class="t-muted">JS Vanilla · PokeAPI</span>');
                print('     <a href="pokemon-demo.html">demo interactiva →</a>');
                print('  3. Spotify to Vinyl    <span class="t-muted">React · Node · Spotify API</span>');
                print('  4. ISI-LAB             <span class="t-muted">Java · JDBC · MySQL</span>');
            },
            experience() {
                print('2026 · Software Developer @ NTT DATA');
                print('2025 · Hackathon UCLM & iPokemon', 't-muted');
                print('2024 · Erasmus — Universidad de Kielce (Polonia)', 't-muted');
                print('2022 · Grado en Ingeniería Informática — UCLM', 't-muted');
            },
            contact() {
                print('📧 <a href="mailto:rodrigohozlopez@gmail.com">rodrigohozlopez@gmail.com</a>');
                print('Tip: usa <span class="t-cmd">goto contacto</span> para ir al formulario.', 't-muted');
            },
            social() {
                print('GitHub    <a href="https://github.com/rodrisace" target="_blank" rel="noopener">github.com/rodrisace</a>');
                print('LinkedIn  <a href="https://www.linkedin.com/in/rodrigo-delahoz-db/" target="_blank" rel="noopener">rodrigo-delahoz-db</a>');
            },
            cv(args) {
                const lang = (args[0] || 'es').toLowerCase();
                const file = lang === 'en' ? 'cv-en.pdf' : 'cv.pdf';
                print(`Descargando CV (${lang === 'en' ? 'English' : 'Español'})…`, 't-ok');
                const a = document.createElement('a');
                a.href = file; a.download = '';
                document.body.appendChild(a); a.click(); a.remove();
            },
            theme(args) {
                const mode = (args[0] || '').toLowerCase();
                const themeToggle = document.getElementById('theme-toggle');
                if (mode === 'dark') document.body.classList.remove('theme-light');
                else if (mode === 'light') document.body.classList.add('theme-light');
                else { document.body.classList.toggle('theme-light'); }
                const now = document.body.classList.contains('theme-light') ? 'light' : 'dark';
                localStorage.setItem('theme', now);
                if (themeToggle) themeToggle.textContent = now === 'light' ? '🌞' : '🌗';
                print(`Tema cambiado a <span class="t-accent">${now}</span>.`, 't-ok');
            },
            goto(args) {
                const target = (args[0] || '').toLowerCase();
                const valid = ['inicio', 'sobre-mi', 'skills', 'proyectos', 'experiencia', 'approach', 'contacto'];
                const map = { proyectos: 'proyectos', contacto: 'contacto', sobremi: 'sobre-mi', 'sobre-mi': 'sobre-mi', skills: 'skills', habilidades: 'skills', experiencia: 'experiencia', inicio: 'inicio' };
                const id = map[target] || (valid.includes(target) ? target : null);
                if (!id) { print(`Sección "${target}" no encontrada. Prueba: proyectos, contacto, skills…`, 't-err'); return; }
                const el = document.getElementById(id);
                if (el) { closeTerminal(); el.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' }); }
            },
            neofetch() {
                const lines = [
                    '       <span class="t-accent">.--.</span>      rodrigo@portfolio',
                    '      <span class="t-accent">|o_o |</span>     -----------------',
                    '      <span class="t-accent">|:_/ |</span>     OS: Ingeniería Informática (UCLM)',
                    '     <span class="t-accent">//   \\ \\</span>    Rol: Software Developer @ NTT DATA',
                    '    <span class="t-accent">(|     | )</span>   Lenguajes: Java, Python, C++, JS',
                    '   <span class="t-accent">/\'\\_   _/`\\</span>  Datos: Oracle, PostgreSQL, MySQL',
                    '   <span class="t-accent">\\___)=(___/</span>  Uptime: 3+ años programando'
                ];
                lines.forEach(l => print(l));
            },
            sudo() {
                print('Permiso denegado: este portfolio ya está al 100% de potencia. 😎', 't-err');
            },
            ask(args) {
                const q = args.join(' ').toLowerCase();
                if (!q) {
                    print('Pregúntame algo. Ej: <span class="t-cmd">ask ¿estás disponible?</span>', 't-muted');
                    print('Temas: disponibilidad · stack · experiencia · ubicación · remoto · idiomas · estudios · contacto.', 't-muted');
                    return;
                }
                const faqs = [
                    { k: ['remoto', 'teletrab', 'presencial', 'híbrid', 'hibrid'], a: 'Abierto a remoto, híbrido o presencial; con disponibilidad para viajar.' },
                    { k: ['idioma', 'inglés', 'ingles', 'polaco', 'erasmus'], a: 'Español nativo e inglés B1, reforzado en mi Erasmus de 5 meses en Polonia.' },
                    { k: ['estudi', 'carrera', 'universidad', 'grado', 'formac', 'uclm'], a: 'Curso el último año del Grado en Ingeniería Informática en la UCLM.' },
                    { k: ['ubicac', 'donde viv', 'ciudad', 'localiz', 'vives', 'dónde estás', 'donde estas'], a: 'Estoy en Ciudad Real, España, con carné B y vehículo propio.' },
                    { k: ['stack', 'tecnolog', 'lenguaje', 'herramient', 'sabes', 'dominas'], a: 'Java, Python, C++, JavaScript, React, Angular, Node.js, Spring Boot y SQL (Oracle, PostgreSQL, MySQL).' },
                    { k: ['proyect', 'portfolio', 'has hecho', 'hiciste'], a: 'La Gramola Virtual, iPokemon, Spotify to Vinyl e ISI-LAB. Escribe "projects" para los detalles.' },
                    { k: ['experien', 'ntt', 'empresa', 'trabajo actual', 'puesto'], a: 'Trabajo como Software Developer en NTT DATA: full-stack y optimización de bases de datos a nivel corporativo.' },
                    { k: ['contact', 'email', 'correo', 'escribir', 'hablar', 'linkedin'], a: '📧 rodrigohozlopez@gmail.com — o escribe "goto contacto" para ir al formulario.' },
                    { k: ['edad', 'años'], a: 'Tengo 21 años.' },
                    { k: ['disponib', 'contratar', 'fichar', 'incorpor', 'empez', 'trabajar'], a: 'Sí, estoy disponible para incorporación inmediata. 🟢' }
                ];
                const hit = faqs.find(f => f.k.some(k => q.includes(k)));
                if (hit) print(hit.a);
                else print('No tengo una respuesta para eso 🤔. Prueba temas como: disponibilidad, stack, experiencia, ubicación, remoto o idiomas.', 't-muted');
            },
            matrix() {
                if (prefersReducedMotion) { print('El modo Matrix está desactivado (prefers-reduced-motion).', 't-muted'); return; }
                print('Entrando en la Matrix… (pulsa una tecla o haz clic para salir)', 't-ok');
                matrixRain();
            },
            echo(args) { print(args.join(' ') || ''); },
            date() { print(new Date().toString()); },
            async pokemon(args) {
                const name = (args[0] || 'spheal').toLowerCase();
                print(`Consultando la PokeAPI para "${escapeHtml(name)}"…`, 't-muted');
                try {
                    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(name)}`);
                    if (!res.ok) throw new Error('not found');
                    const d = await res.json();
                    const types = d.types.map(t => t.type.name).join(' / ');
                    const id = String(d.id).padStart(3, '0');
                    if (d.sprites && d.sprites.front_default) {
                        print(`<img src="${d.sprites.front_default}" alt="${escapeHtml(d.name)}" width="80" height="80" style="image-rendering:pixelated;vertical-align:middle">`);
                    }
                    print(`#${id}  <span class="t-accent">${d.name.toUpperCase()}</span>   <span class="t-muted">${types}</span>`);
                    print(`Altura ${d.height / 10} m · Peso ${d.weight / 10} kg`, 't-muted');
                    const labels = { hp: 'HP ', attack: 'ATK', defense: 'DEF', 'special-attack': 'SpA', 'special-defense': 'SpD', speed: 'SPD' };
                    d.stats.forEach(s => {
                        const label = labels[s.stat.name] || s.stat.name;
                        const val = s.base_stat;
                        const bars = '\u2588'.repeat(Math.max(1, Math.round(val / 8)));
                        print(`${label} ${String(val).padStart(3)} <span class="t-accent2">${bars}</span>`);
                    });
                } catch (e) {
                    print(`No se encontró "${escapeHtml(name)}". Prueba: pikachu, spheal, charizard, mewtwo…`, 't-err');
                }
            },
            clear() { body.innerHTML = ''; },
            exit() { closeTerminal(); }
        };

        async function runCommand(raw) {
            const trimmed = raw.trim();
            print(`<span class="terminal-prompt">rodrigo@portfolio:~$</span> ${escapeHtml(trimmed)}`);
            if (!trimmed) return;
            history.unshift(trimmed);
            histIndex = -1;
            const [name, ...args] = trimmed.split(/\s+/);
            const cmd = commands[name.toLowerCase()];
            if (cmd) {
                try { await cmd(args); }
                catch (err) { print('error al ejecutar el comando.', 't-err'); }
            } else {
                print(`comando no encontrado: ${escapeHtml(name)}. Escribe <span class="t-cmd">help</span>.`, 't-err');
            }
            print('');
        }

        function escapeHtml(str) {
            const d = document.createElement('div');
            d.textContent = str;
            return d.innerHTML;
        }

        function openTerminal() {
            lastFocusedBeforeTerminal = document.activeElement;
            overlay.classList.add('open');
            overlay.setAttribute('aria-hidden', 'false');
            if (!body.dataset.greeted) { printWelcome(); body.dataset.greeted = '1'; }
            setTimeout(() => input.focus(), 60);
        }
        function closeTerminal() {
            overlay.classList.remove('open');
            overlay.setAttribute('aria-hidden', 'true');
            if (lastFocusedBeforeTerminal) lastFocusedBeforeTerminal.focus();
        }

        toggleBtn.addEventListener('click', openTerminal);
        overlay.addEventListener('click', (e) => { if (e.target === overlay) closeTerminal(); });

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                runCommand(input.value);
                input.value = '';
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (histIndex < history.length - 1) { histIndex++; input.value = history[histIndex]; }
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (histIndex > 0) { histIndex--; input.value = history[histIndex]; }
                else { histIndex = -1; input.value = ''; }
            } else if (e.key === 'Tab') {
                e.preventDefault();
                const partial = input.value.trim().toLowerCase();
                const match = Object.keys(commands).find(c => c.startsWith(partial));
                if (match) input.value = match;
            }
        });

        // Abrir/cerrar con la tecla `  (backtick) y cerrar con Escape
        window.addEventListener('keydown', (e) => {
            const typing = ['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName);
            if (e.key === '`' && !overlay.classList.contains('open') && !typing) {
                e.preventDefault();
                openTerminal();
            } else if (e.key === 'Escape' && overlay.classList.contains('open')) {
                closeTerminal();
            }
        });
    }

    /* ---------- 5. EFECTO MATRIX ---------- */
    function matrixRain() {
        if (prefersReducedMotion) return;
        const canvas = document.createElement('canvas');
        canvas.className = 'matrix-canvas';
        document.body.appendChild(canvas);
        const ctx = canvas.getContext('2d');
        let w = canvas.width = window.innerWidth;
        let h = canvas.height = window.innerHeight;
        const fontSize = 16;
        const cols = Math.floor(w / fontSize);
        const drops = Array(cols).fill(1);
        const chars = 'アイウエオカキクケコサシスセソ01<>{}[]()=+*/;RODRIGO';
        let raf;
        function draw() {
            ctx.fillStyle = 'rgba(9, 9, 11, 0.08)';
            ctx.fillRect(0, 0, w, h);
            ctx.fillStyle = '#8b5cf6';
            ctx.font = fontSize + 'px monospace';
            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                if (drops[i] * fontSize > h && Math.random() > 0.975) drops[i] = 0;
                drops[i]++;
            }
            raf = requestAnimationFrame(draw);
        }
        draw();
        function stop() {
            cancelAnimationFrame(raf);
            canvas.remove();
            window.removeEventListener('keydown', stop);
            window.removeEventListener('click', stop);
        }
        setTimeout(() => {
            window.addEventListener('keydown', stop);
            window.addEventListener('click', stop);
        }, 400);
        setTimeout(stop, 9000);
    }

    /* ---------- 6. POKÉDEX EN VIVO (PokeAPI) ---------- */
    const pkInput = document.getElementById('pokedex-input');
    const pkBtn = document.getElementById('pokedex-btn');
    const pkRandom = document.getElementById('pokedex-random');
    const pkCard = document.getElementById('pokedex-card');

    if (pkInput && pkBtn && pkCard) {
        const TYPE_COLORS = {
            normal: '#9fa19f', fire: '#ee8130', water: '#6390f0', electric: '#d9b40a',
            grass: '#62b44c', ice: '#74c6cd', fighting: '#c22e28', poison: '#a33ea1',
            ground: '#cf9b4a', flying: '#8f7ef0', psychic: '#f95587', bug: '#9aac1a',
            rock: '#b6a136', ghost: '#735797', dragon: '#6f35fc', dark: '#6d5a4a',
            steel: '#9a9ab0', fairy: '#d685ad'
        };
        const STAT_LABELS = {
            hp: 'HP', attack: 'Ataque', defense: 'Defensa',
            'special-attack': 'At. Esp.', 'special-defense': 'Def. Esp.', speed: 'Velocidad'
        };

        function escapeHtmlPk(s) { const d = document.createElement('div'); d.textContent = s; return d.innerHTML; }

        async function loadPokemon(query) {
            const name = String(query).trim().toLowerCase();
            if (!name) return;
            pkCard.innerHTML = '<p class="pokedex-status">Cargando…</p>';
            try {
                const res = await fetch('https://pokeapi.co/api/v2/pokemon/' + encodeURIComponent(name));
                if (!res.ok) throw new Error('404');
                renderPokemon(await res.json());
            } catch (e) {
                pkCard.innerHTML = '<p class="pokedex-status error">No se encontró "' + escapeHtmlPk(name) + '". Prueba con pikachu, spheal o un número (1–1025).</p>';
            }
        }

        function renderPokemon(d) {
            const art = (d.sprites.other && d.sprites.other['official-artwork'] && d.sprites.other['official-artwork'].front_default) || d.sprites.front_default;
            const id = String(d.id).padStart(3, '0');
            const types = d.types.map(t => {
                const n = t.type.name;
                return '<span class="type-badge" style="background:' + (TYPE_COLORS[n] || '#888') + '">' + n + '</span>';
            }).join('');
            const stats = d.stats.map(s => {
                const label = STAT_LABELS[s.stat.name] || s.stat.name;
                const val = s.base_stat;
                const pct = Math.min(100, Math.round(val / 180 * 100));
                return '<div class="pstat"><span class="pstat-label">' + label + '</span>'
                    + '<span class="pstat-val">' + val + '</span>'
                    + '<span class="pstat-bar"><span class="pstat-fill" data-pct="' + pct + '"></span></span></div>';
            }).join('');
            pkCard.innerHTML =
                '<div class="pokedex-visual">' +
                (art ? '<img src="' + art + '" alt="' + escapeHtmlPk(d.name) + '" class="pokedex-art" loading="lazy">' : '') +
                '</div>' +
                '<div class="pokedex-info">' +
                '<div class="pokedex-namerow"><span class="pokedex-num">#' + id + '</span><h3 class="pokedex-name">' + escapeHtmlPk(d.name) + '</h3></div>' +
                '<div class="pokedex-types">' + types + '</div>' +
                '<p class="pokedex-meta">Altura ' + (d.height / 10) + ' m · Peso ' + (d.weight / 10) + ' kg</p>' +
                '<div class="pokedex-stats">' + stats + '</div>' +
                '</div>';
            requestAnimationFrame(() => {
                pkCard.querySelectorAll('.pstat-fill').forEach(f => { f.style.width = f.dataset.pct + '%'; });
            });
        }

        pkBtn.addEventListener('click', () => loadPokemon(pkInput.value));
        pkInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') loadPokemon(pkInput.value); });
        if (pkRandom) pkRandom.addEventListener('click', () => { pkInput.value = ''; loadPokemon(Math.floor(Math.random() * 1025) + 1); });

        // Carga inicial: Spheal, la mascota del proyecto iPokemon
        loadPokemon('spheal');
    }

    /* ---------- 4. KONAMI CODE -> LLUVIA DE SPHEAL ---------- */
    const konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiPos = 0;
    window.addEventListener('keydown', (e) => {
        const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
        konamiPos = (key === konami[konamiPos]) ? konamiPos + 1 : (key === konami[0] ? 1 : 0);
        if (konamiPos === konami.length) {
            konamiPos = 0;
            sphealRain();
        }
    });

    function sphealRain() {
        if (prefersReducedMotion) return;
        const total = 28;
        for (let i = 0; i < total; i++) {
            const s = document.createElement('img');
            s.src = 'images/spheal.png';
            s.alt = '';
            s.className = 'spheal-drop';
            s.style.left = Math.random() * 100 + 'vw';
            const dur = 2.5 + Math.random() * 2.5;
            s.style.animationDuration = dur + 's';
            s.style.animationDelay = Math.random() * 1.5 + 's';
            const size = 32 + Math.random() * 36;
            s.style.width = size + 'px';
            s.style.height = size + 'px';
            document.body.appendChild(s);
            setTimeout(() => s.remove(), (dur + 1.6) * 1000);
        }
    }

    /* ---------- 7. COMMAND PALETTE (⌘K / Ctrl+K) ---------- */
    const cmdkOverlay = document.getElementById('cmdk-overlay');
    const cmdkInput = document.getElementById('cmdk-input');
    const cmdkList = document.getElementById('cmdk-list');
    const cmdkTrigger = document.getElementById('cmdk-trigger');

    if (cmdkOverlay && cmdkInput && cmdkList) {
        let cmdkPrevFocus = null;
        let activeIndex = 0;
        let visible = [];

        const goto = (id) => () => {
            closeCmdk();
            const el = document.getElementById(id);
            if (el) el.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
        };
        const openProject = (key) => () => {
            closeCmdk();
            const btn = document.querySelector('.btn-detail[data-open="' + key + '"]');
            if (btn) btn.click();
        };

        const actions = [
            { icon: 'fa-house', label: 'Ir a Inicio', cat: 'Sección', keys: 'inicio home', run: goto('inicio') },
            { icon: 'fa-user', label: 'Sobre mí', cat: 'Sección', keys: 'sobre mi about bio', run: goto('sobre-mi') },
            { icon: 'fa-code', label: 'Habilidades', cat: 'Sección', keys: 'skills habilidades tecnologias stack', run: goto('skills') },
            { icon: 'fa-folder-open', label: 'Proyectos', cat: 'Sección', keys: 'proyectos projects trabajos', run: goto('proyectos') },
            { icon: 'fa-dragon', label: 'Pokédex en vivo', cat: 'Sección', keys: 'pokedex pokemon pokeapi', run: goto('pokedex') },
            { icon: 'fa-timeline', label: 'Mi Trayectoria', cat: 'Sección', keys: 'experiencia trayectoria timeline trabajo', run: goto('experiencia') },
            { icon: 'fa-lightbulb', label: 'Mi Enfoque', cat: 'Sección', keys: 'enfoque approach proceso', run: goto('approach') },
            { icon: 'fa-envelope', label: 'Contacto', cat: 'Sección', keys: 'contacto contact formulario', run: goto('contacto') },
            { icon: 'fa-folder', label: 'Proyecto: La Gramola Virtual', cat: 'Proyecto', keys: 'gramola spotify stripe angular', run: openProject('gramola') },
            { icon: 'fa-folder', label: 'Proyecto: Explorador Pokémon', cat: 'Proyecto', keys: 'pokemon ipokemon spheal', run: openProject('pokemon') },
            { icon: 'fa-folder', label: 'Proyecto: Spotify to Vinyl', cat: 'Proyecto', keys: 'spotify vinyl react', run: openProject('spotify_vinyl') },
            { icon: 'fa-folder', label: 'Proyecto: ISI-LAB', cat: 'Proyecto', keys: 'isi lab buscador musical java', run: openProject('isi_lab') },
            {
                icon: 'fa-circle-half-stroke', label: 'Cambiar tema (claro / oscuro)', cat: 'Acción', keys: 'tema theme dark light modo oscuro claro',
                run: () => {
                    closeCmdk();
                    const themeToggle = document.getElementById('theme-toggle');
                    document.body.classList.toggle('theme-light');
                    const now = document.body.classList.contains('theme-light') ? 'light' : 'dark';
                    localStorage.setItem('theme', now);
                    if (themeToggle) themeToggle.textContent = now === 'light' ? '🌞' : '🌗';
                }
            },
            { icon: 'fa-file-arrow-down', label: 'Descargar CV (Español)', cat: 'Acción', keys: 'cv curriculum resume español', run: () => { closeCmdk(); triggerDownload('cv.pdf'); } },
            { icon: 'fa-file-arrow-down', label: 'Download CV (English)', cat: 'Acción', keys: 'cv curriculum resume english ingles', run: () => { closeCmdk(); triggerDownload('cv-en.pdf'); } },
            { icon: 'fa-terminal', label: 'Abrir terminal interactiva', cat: 'Acción', keys: 'terminal consola comandos', run: () => { closeCmdk(); const t = document.getElementById('terminal-toggle'); if (t) t.click(); } },
            {
                icon: 'fa-copy', label: 'Copiar email', cat: 'Acción', keys: 'email correo copiar contacto',
                run: () => {
                    closeCmdk();
                    if (navigator.clipboard) navigator.clipboard.writeText('rodrigohozlopez@gmail.com').catch(() => {});
                }
            },
            { icon: 'fa-github', fab: true, label: 'Abrir GitHub', cat: 'Enlace', keys: 'github repositorios codigo', run: () => { window.open('https://github.com/rodrisace', '_blank', 'noopener'); } },
            { icon: 'fa-linkedin', fab: true, label: 'Abrir LinkedIn', cat: 'Enlace', keys: 'linkedin red profesional', run: () => { window.open('https://www.linkedin.com/in/rodrigo-delahoz-db/', '_blank', 'noopener'); } }
        ];

        function triggerDownload(file) {
            const a = document.createElement('a');
            a.href = file; a.download = '';
            document.body.appendChild(a); a.click(); a.remove();
        }

        function renderCmdk(query) {
            const q = query.trim().toLowerCase();
            visible = q ? actions.filter(a => (a.label + ' ' + a.cat + ' ' + a.keys).toLowerCase().includes(q)) : actions.slice();
            activeIndex = 0;
            if (!visible.length) {
                cmdkList.innerHTML = '<li class="cmdk-empty">Sin resultados para "' + escapeHtmlCmdk(q) + '"</li>';
                return;
            }
            cmdkList.innerHTML = visible.map((a, i) =>
                '<li class="cmdk-item' + (i === 0 ? ' active' : '') + '" role="option" data-i="' + i + '">' +
                '<span class="cmdk-ico"><i class="' + (a.fab ? 'fab' : 'fas') + ' ' + a.icon + '"></i></span>' +
                '<span class="cmdk-label">' + a.label + '</span>' +
                '<span class="cmdk-cat">' + a.cat + '</span></li>'
            ).join('');
        }

        function escapeHtmlCmdk(s) { const d = document.createElement('div'); d.textContent = s; return d.innerHTML; }

        function setActive(i) {
            const items = cmdkList.querySelectorAll('.cmdk-item');
            if (!items.length) return;
            activeIndex = (i + items.length) % items.length;
            items.forEach((el, idx) => el.classList.toggle('active', idx === activeIndex));
            items[activeIndex].scrollIntoView({ block: 'nearest' });
        }

        function openCmdk() {
            cmdkPrevFocus = document.activeElement;
            cmdkInput.value = '';
            renderCmdk('');
            cmdkOverlay.classList.add('open');
            cmdkOverlay.setAttribute('aria-hidden', 'false');
            setTimeout(() => cmdkInput.focus(), 50);
        }
        function closeCmdk() {
            cmdkOverlay.classList.remove('open');
            cmdkOverlay.setAttribute('aria-hidden', 'true');
            if (cmdkPrevFocus && cmdkPrevFocus.focus) cmdkPrevFocus.focus();
        }

        if (cmdkTrigger) cmdkTrigger.addEventListener('click', openCmdk);
        cmdkInput.addEventListener('input', () => renderCmdk(cmdkInput.value));
        cmdkOverlay.addEventListener('click', (e) => { if (e.target === cmdkOverlay) closeCmdk(); });

        cmdkList.addEventListener('click', (e) => {
            const li = e.target.closest('.cmdk-item');
            if (!li) return;
            const a = visible[parseInt(li.dataset.i, 10)];
            if (a) a.run();
        });

        cmdkInput.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowDown') { e.preventDefault(); setActive(activeIndex + 1); }
            else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(activeIndex - 1); }
            else if (e.key === 'Enter') { e.preventDefault(); const a = visible[activeIndex]; if (a) a.run(); }
            else if (e.key === 'Escape') { closeCmdk(); }
        });

        // Atajo global: Cmd+K (Mac) o Ctrl+K
        window.addEventListener('keydown', (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                if (cmdkOverlay.classList.contains('open')) closeCmdk(); else openCmdk();
            }
        });
    }

    /* ---------- 8. MENSAJE OCULTO PARA QUIEN ABRE LA CONSOLA ---------- */
    console.log('%c¿Buscando talento? 👀', 'color:#8b5cf6;font-size:18px;font-weight:700;');
    console.log('%cPulsa ⌘K (o Ctrl+K) para la paleta de comandos, o «`» para mi terminal interactiva.', 'color:#3b82f6;font-size:13px;');
    console.log('%c…y prueba el código Konami: ↑ ↑ ↓ ↓ ← → ← → B A', 'color:#a1a1aa;font-size:12px;');
});


/* ============================================================
   DEMOS INTERACTIVAS — v3.2
   ============================================================ */

/* ---- Tab switcher ---- */
document.querySelectorAll('.demo-tab').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.demo-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.demo-panel').forEach(p => p.classList.add('hidden'));
        btn.classList.add('active');
        const panel = document.getElementById('demo-' + btn.dataset.demo);
        if (panel) panel.classList.remove('hidden');
    });
});

/* ========================================================
   SNIPVAULT — simulado (datos en memoria)
   ======================================================== */
(function () {
    const $ = id => document.getElementById(id);
    let currentUser = null;
    let snippets = [];
    let nextId = 1;

    const SEED = [
        { id: nextId++, title: 'Fetch con async/await', language: 'JavaScript', code: 'const res = await fetch(url);\nconst data = await res.json();\nconsole.log(data);', tags: ['api','utils'], is_favorite: true },
        { id: nextId++, title: 'Decorador JWT FastAPI', language: 'Python', code: 'def get_current_user(token: str = Depends(oauth2_scheme)):\n    payload = jwt.decode(token, SECRET_KEY)\n    return payload.get("sub")', tags: ['auth','fastapi'], is_favorite: false },
        { id: nextId++, title: 'useState con TypeScript', language: 'TypeScript', code: 'const [count, setCount] = useState<number>(0);', tags: ['react','hooks'], is_favorite: false },
    ];

    function escHtml(s) {
        return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    }
    function setMsg(id, text, type) {
        const el = $(id); if (!el) return;
        el.textContent = text; el.className = 'sv-msg ' + (type||'');
    }

    /* tabs */
    document.querySelectorAll('.sv-tab').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.sv-tab').forEach(t => t.classList.remove('active'));
            btn.classList.add('active');
            $('sv-tab-login').classList.toggle('hidden', btn.dataset.tab !== 'login');
            $('sv-tab-register').classList.toggle('hidden', btn.dataset.tab !== 'register');
            setMsg('sv-auth-msg','');
        });
    });

    /* register */
    const regBtn = $('sv-reg-btn');
    if (regBtn) regBtn.addEventListener('click', () => {
        const u = $('sv-reg-user').value.trim();
        const p = $('sv-reg-pass').value;
        if (!u || !p) return setMsg('sv-auth-msg','Rellena usuario y contraseña','err');
        setMsg('sv-auth-msg','✅ Cuenta creada. Ahora inicia sesión.','ok');
        document.querySelector('.sv-tab[data-tab="login"]').click();
        $('sv-login-user').value = u;
    });

    /* login — cualquier credencial funciona */
    const loginBtn = $('sv-login-btn');
    if (loginBtn) loginBtn.addEventListener('click', () => {
        const u = $('sv-login-user').value.trim();
        const p = $('sv-login-pass').value;
        if (!u || !p) return setMsg('sv-auth-msg','Rellena usuario y contraseña','err');
        currentUser = u;
        snippets = JSON.parse(JSON.stringify(SEED)); // copia del seed
        $('sv-welcome').textContent = '🦭 Hola, ' + u;
        $('sv-auth-panel').classList.add('hidden');
        $('sv-app-panel').classList.remove('hidden');
        renderSnippets(snippets);
    });
    [$('sv-login-user'), $('sv-login-pass')].forEach(el => {
        if (el) el.addEventListener('keydown', e => { if (e.key === 'Enter') loginBtn && loginBtn.click(); });
    });

    /* logout */
    const logoutBtn = $('sv-logout-btn');
    if (logoutBtn) logoutBtn.addEventListener('click', () => {
        currentUser = null; snippets = [];
        $('sv-app-panel').classList.add('hidden');
        $('sv-auth-panel').classList.remove('hidden');
        $('sv-login-user').value = ''; $('sv-login-pass').value = '';
        setMsg('sv-auth-msg','');
    });

    /* search */
    let searchT = null;
    const searchEl = $('sv-search');
    if (searchEl) searchEl.addEventListener('input', () => {
        clearTimeout(searchT);
        searchT = setTimeout(() => {
            const norm = s => String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
            const q = norm(searchEl.value.trim());
            renderSnippets(q ? snippets.filter(s =>
                norm(s.title).includes(q) ||
                norm(s.code).includes(q) ||
                norm(s.language||'').includes(q) ||
                s.tags.some(t => norm(t).includes(q))
            ) : snippets);
        }, 250);
    });

    /* save */
    const saveBtn = $('sv-save-btn');
    if (saveBtn) saveBtn.addEventListener('click', () => {
        const title = $('sv-new-title').value.trim();
        const code  = $('sv-new-code').value.trim();
        const lang  = $('sv-new-lang').value || null;
        const tags  = $('sv-new-tags').value.split(',').map(t=>t.trim()).filter(Boolean);
        if (!title || !code) return setMsg('sv-save-msg','Título y código son obligatorios','err');
        snippets.unshift({ id: nextId++, title, code, language: lang, tags, is_favorite: false });
        $('sv-new-title').value=''; $('sv-new-code').value='';
        $('sv-new-lang').value=''; $('sv-new-tags').value='';
        setMsg('sv-save-msg','✅ Snippet guardado','ok');
        setTimeout(()=>setMsg('sv-save-msg',''),2000);
        renderSnippets(snippets);
    });

    function renderSnippets(list) {
        const el = $('sv-snippets-list'); if (!el) return;
        if (!list.length) { el.innerHTML='<p class="sv-empty">No hay snippets. ¡Guarda el primero! 👆</p>'; return; }
        el.innerHTML = list.map(s => `
            <div class="sv-card" data-id="${s.id}">
                <div class="sv-card-header">
                    <span class="sv-card-title">${escHtml(s.title)}</span>
                    ${s.language ? `<span class="sv-lang-badge">${escHtml(s.language)}</span>` : ''}
                </div>
                <pre class="sv-card-code">${escHtml(s.code)}</pre>
                <div class="sv-card-footer">
                    ${s.tags.map(t=>`<span class="sv-tag">${escHtml(t)}</span>`).join('')}
                    <div class="sv-card-actions">
                        <button class="sv-icon-btn sv-copy-btn" title="Copiar"><i class="fas fa-copy"></i></button>
                        <button class="sv-icon-btn sv-fav-btn ${s.is_favorite?'active':''}" data-id="${s.id}" title="Favorito"><i class="fas fa-star"></i></button>
                        <button class="sv-icon-btn sv-del-btn" data-id="${s.id}" title="Eliminar"><i class="fas fa-trash"></i></button>
                    </div>
                </div>
            </div>`).join('');

        el.querySelectorAll('.sv-copy-btn').forEach(btn => btn.addEventListener('click', () => {
            const code = btn.closest('.sv-card').querySelector('.sv-card-code').textContent;
            navigator.clipboard.writeText(code).then(() => {
                btn.innerHTML='<i class="fas fa-check"></i>';
                setTimeout(()=>btn.innerHTML='<i class="fas fa-copy"></i>',1500);
            });
        }));
        el.querySelectorAll('.sv-fav-btn').forEach(btn => btn.addEventListener('click', () => {
            const id = +btn.dataset.id;
            const s = snippets.find(x=>x.id===id); if (s) s.is_favorite = !s.is_favorite;
            btn.classList.toggle('active');
        }));
        el.querySelectorAll('.sv-del-btn').forEach(btn => btn.addEventListener('click', () => {
            if (!confirm('¿Eliminar este snippet?')) return;
            const id = +btn.dataset.id;
            snippets = snippets.filter(x=>x.id!==id);
            renderSnippets(snippets);
        }));
    }
})();

/* ========================================================
   GRAMOLA — simulado
   ======================================================== */
(function () {
    const $ = id => document.getElementById(id);
    let tokens = 3;
    let queue = [];
    let isPlaying = false;
    let progress = 0;
    let progressInterval = null;

    const CATALOG = [
        { title:'Blinding Lights', artist:'The Weeknd', duration:200 },
        { title:'Anti-Hero', artist:'Taylor Swift', duration:193 },
        { title:'Flowers', artist:'Miley Cyrus', duration:200 },
        { title:'As It Was', artist:'Harry Styles', duration:167 },
        { title:'Unholy', artist:'Sam Smith', duration:156 },
        { title:'Shakira: Bzrp Session 53', artist:'Bizarrap', duration:198 },
        { title:'Quevedo: Bzrp Session 52', artist:'Bizarrap', duration:197 },
        { title:'Despechá', artist:'Rosalía', duration:152 },
        { title:'PROVENZA', artist:'Karol G', duration:203 },
        { title:'La Bachata', artist:'Manuel Turizo', duration:198 },
        { title:'Tití Me Preguntó', artist:'Bad Bunny', duration:229 },
        { title:'Counting Stars', artist:'OneRepublic', duration:257 },
        { title:'Watermelon Sugar', artist:'Harry Styles', duration:174 },
        { title:'Dynamite', artist:'BTS', duration:199 },
    ];

    function updateTokens() {
        const el = $('gr-tokens'); if (el) el.textContent = '🪙 ' + tokens + ' token' + (tokens!==1?'s':'');
    }
    function renderQueue() {
        const el = $('gr-queue'); if (!el) return;
        if (!queue.length) { el.innerHTML='<p class="sv-empty" style="font-size:.82rem">Cola vacía — añade una canción 🎵</p>'; return; }
        el.innerHTML = queue.map((s,i)=>`
            <div class="gr-queue-item">
                <span class="gr-queue-pos">${i+1}</span>
                <span>${s.title} · <em style="color:#4b5563">${s.artist}</em></span>
            </div>`).join('');
    }

    /* search */
    const searchBtn = $('gr-search-btn');
    if (searchBtn) searchBtn.addEventListener('click', doSearch);
    const searchInput = $('gr-search');
    if (searchInput) searchInput.addEventListener('keydown', e => { if(e.key==='Enter') doSearch(); });

    function norm(s) { return String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,''); }
    function doSearch() {
        const q = norm(($('gr-search')||{}).value.trim());
        const el = $('gr-results'); if (!el) return;
        const results = q ? CATALOG.filter(s =>
            norm(s.title).includes(q) || norm(s.artist).includes(q)
        ).slice(0,4) : [];
        if (!results.length && q) { el.innerHTML='<p class="sv-empty" style="font-size:.82rem">Sin resultados para "'+q+'"</p>'; return; }
        el.innerHTML = results.map((s,i) => `
            <div class="gr-result-item">
                <span>🎵 ${s.title} — <em>${s.artist}</em></span>
                <button class="gr-add-btn" data-idx="${i}" ${tokens<1?'disabled':''}>+1🪙 Añadir</button>
            </div>`).join('');
        el.querySelectorAll('.gr-add-btn').forEach((btn,i) => btn.addEventListener('click', () => {
            if (tokens < 1) return;
            tokens--;
            queue.push(results[i]);
            updateTokens(); renderQueue();
            btn.textContent = '✅ Añadida'; btn.disabled = true;
            if (!isPlaying) startPlaying();
        }));
    }

    /* player */
    function startPlaying() {
        if (!queue.length) return;
        isPlaying = true;
        const song = queue[0];
        const titleEl = $('gr-song-title'); const artistEl = $('gr-song-artist');
        const vinyl = $('gr-vinyl'); const playBtn = $('gr-play-btn');
        if (titleEl) titleEl.textContent = song.title;
        if (artistEl) artistEl.textContent = song.artist;
        if (vinyl) vinyl.classList.add('spinning');
        if (playBtn) playBtn.innerHTML = '<i class="fas fa-pause"></i> Pausar';
        progress = 0;
        clearInterval(progressInterval);
        progressInterval = setInterval(() => {
            progress += (100 / song.duration) * 0.5;
            const fill = $('gr-progress'); if (fill) fill.style.width = Math.min(progress,100) + '%';
            if (progress >= 100) { clearInterval(progressInterval); nextSong(); }
        }, 500);
    }
    function nextSong() {
        queue.shift(); renderQueue();
        if (queue.length) { startPlaying(); }
        else {
            isPlaying = false;
            const titleEl=$('gr-song-title'); const artistEl=$('gr-song-artist');
            const vinyl=$('gr-vinyl'); const playBtn=$('gr-play-btn'); const fill=$('gr-progress');
            if (titleEl) titleEl.textContent='Esperando canción…';
            if (artistEl) artistEl.textContent='—';
            if (vinyl) vinyl.classList.remove('spinning');
            if (playBtn) playBtn.innerHTML='<i class="fas fa-play"></i> Reproducir';
            if (fill) fill.style.width='0%';
        }
    }

    const playBtn = $('gr-play-btn');
    if (playBtn) playBtn.addEventListener('click', () => {
        if (!queue.length) return;
        if (isPlaying) {
            isPlaying = false; clearInterval(progressInterval);
            $('gr-vinyl').classList.remove('spinning');
            playBtn.innerHTML='<i class="fas fa-play"></i> Reproducir';
        } else { startPlaying(); }
    });
    const skipBtn = $('gr-skip-btn');
    if (skipBtn) skipBtn.addEventListener('click', () => { clearInterval(progressInterval); nextSong(); });

    updateTokens(); renderQueue();
})();

/* ========================================================
   ISI-LAB — simulado
   ======================================================== */
(function () {
    const $ = id => document.getElementById(id);

    const DB = [
        { type:'artist', name:'Rosalía', meta:'Pop / Flamenco · España', year:'2017–' },
        { type:'artist', name:'Bad Bunny', meta:'Reggaeton / Trap Latino · Puerto Rico', year:'2016–' },
        { type:'artist', name:'Bizarrap', meta:'EDM / Urban · Argentina', year:'2017–' },
        { type:'artist', name:'Karol G', meta:'Reggaeton / Pop · Colombia', year:'2010–' },
        { type:'artist', name:'Harry Styles', meta:'Pop / Rock · Reino Unido', year:'2010–' },
        { type:'album',  name:'MOTOMAMI', meta:'Rosalía', year:'2022' },
        { type:'album',  name:'Un Verano Sin Ti', meta:'Bad Bunny', year:'2022' },
        { type:'album',  name:'Fine Line', meta:'Harry Styles', year:'2019' },
        { type:'album',  name:'MAÑANA SERÁ BONITO', meta:'Karol G', year:'2023' },
        { type:'album',  name:'Harry\'s House', meta:'Harry Styles', year:'2022' },
        { type:'track',  name:'Despechá', meta:'MOTOMAMI · Rosalía', year:'2022' },
        { type:'track',  name:'Tití Me Preguntó', meta:'Un Verano Sin Ti · Bad Bunny', year:'2022' },
        { type:'track',  name:'Watermelon Sugar', meta:'Fine Line · Harry Styles', year:'2019' },
        { type:'track',  name:'PROVENZA', meta:'MAÑANA SERÁ BONITO · Karol G', year:'2023' },
        { type:'track',  name:'As It Was', meta:'Harry\'s House · Harry Styles', year:'2022' },
        { type:'track',  name:'Bzrp Session 52', meta:'Bizarrap, Quevedo', year:'2022' },
        { type:'track',  name:'Bzrp Session 53', meta:'Bizarrap, Shakira', year:'2023' },
        { type:'artist', name:'OneRepublic', meta:'Pop / Rock · EEUU', year:'2002–' },
        { type:'album',  name:'Human', meta:'OneRepublic', year:'2021' },
        { type:'track',  name:'Counting Stars', meta:'Native · OneRepublic', year:'2013' },
    ];

    function typeLabel(t) {
        if (t==='artist') return '<span class="isi-type-badge isi-type-artist">Artista</span>';
        if (t==='album')  return '<span class="isi-type-badge isi-type-album">Álbum</span>';
        return '<span class="isi-type-badge isi-type-track">Canción</span>';
    }
    function renderResults(list) {
        const el = $('isi-results'); if (!el) return;
        if (!list.length) { el.innerHTML='<p class="sv-empty">Sin resultados.</p>'; return; }
        el.innerHTML = list.map(r=>`
            <div class="isi-card">
                ${typeLabel(r.type)}
                <div class="isi-card-main">
                    <div class="isi-card-name">${r.name}</div>
                    <div class="isi-card-meta">${r.meta}</div>
                </div>
                <span class="isi-card-year">${r.year}</span>
            </div>`).join('');
    }

    function norm(s) { return String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,''); }
    function doSearch() {
        const q = norm(($('isi-search')||{}).value.trim());
        const filter = ($('isi-filter')||{}).value || 'all';
        if (!q) { $('isi-results').innerHTML='<p class="sv-empty">Introduce un término para buscar.</p>'; return; }
        const results = DB.filter(r =>
            (filter==='all' || r.type===filter) &&
            (norm(r.name).includes(q) || norm(r.meta).includes(q))
        );
        renderResults(results);
    }

    const searchBtn = $('isi-search-btn');
    if (searchBtn) searchBtn.addEventListener('click', doSearch);
    const searchEl = $('isi-search');
    if (searchEl) searchEl.addEventListener('keydown', e => { if(e.key==='Enter') doSearch(); });
    const filterEl = $('isi-filter');
    if (filterEl) filterEl.addEventListener('change', doSearch);
})();

/* activateDemo — called from project cards */
function activateDemo(name) {
    document.querySelectorAll('.demo-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.demo-panel').forEach(p => p.classList.add('hidden'));
    const tab = document.querySelector('.demo-tab[data-demo="' + name + '"]');
    const panel = document.getElementById('demo-' + name);
    if (tab) tab.classList.add('active');
    if (panel) panel.classList.remove('hidden');
}

/* ========================================================
   RT SCHEDULER DEMO — v3.4
   ======================================================== */
(function () {
    const COLORS = ['#7c3aed','#06b6d4','#4ade80','#f59e0b','#f87171'];
    const PRESETS = {
        classic: [
            { T:4,  C:1, D:4  },
            { T:6,  C:2, D:6  },
            { T:12, C:4, D:12 },
        ],
        fail: [
            { T:5,  C:2, D:5  },
            { T:7,  C:4, D:7  },
        ],
        tight: [
            { T:4,  C:1, D:3  },
            { T:6,  C:2, D:5  },
            { T:10, C:3, D:8  },
        ],
    };

    let tasks = PRESETS.classic.map((t,i) => ({ ...t, id:i }));
    let algo = 'RMS';
    let nextId = tasks.length;

    const $ = id => document.getElementById(id);

    /* ---- helpers ---- */
    function gcd(a,b){ return b===0?a:gcd(b,a%b); }
    function lcm(a,b){ return a/gcd(a,b)*b; }
    function hyperperiod(ts){ return ts.reduce((h,t)=>lcm(h,t.T),1); }

    function utilization(ts){ return ts.reduce((u,t)=>u+t.C/t.T,0); }

    function priority(t,alg){
        if(alg==='RMS') return t.T;
        if(alg==='DMS') return t.D;
        return Infinity; // EDF: dynamic
    }

    function simulate(ts, alg){
        if(!ts.length) return [];
        const H = Math.min(hyperperiod(ts), 60); // cap at 60 for perf
        const timeline = []; // array of {t, taskId, deadline_miss}
        // jobs: {taskId, release, deadline, remaining}
        const jobs = [];
        const misses = new Set();

        for(let t=0;t<H;t++){
            // release jobs
            ts.forEach((task,i) => {
                if(t % task.T === 0){
                    jobs.push({ taskId:i, release:t, deadline:t+task.D, remaining:task.C });
                }
            });
            // check deadline misses
            jobs.forEach(j => {
                if(j.remaining>0 && j.deadline<=t) misses.add(j.taskId+'-'+j.release);
            });
            // filter active jobs (remaining > 0 and not past deadline)
            const active = jobs.filter(j=>j.remaining>0);
            if(!active.length){ timeline.push({t, taskId:-1, miss:false}); continue; }

            // pick job to run
            let chosen;
            if(alg==='EDF'){
                chosen = active.reduce((a,b)=>a.deadline<b.deadline?a:b);
            } else {
                // fixed priority by T (RMS) or D (DMS) — smaller = higher
                active.sort((a,b)=>{
                    const ta=ts[a.taskId], tb=ts[b.taskId];
                    return priority(ta,alg)-priority(tb,alg);
                });
                chosen = active[0];
            }
            const miss = misses.has(chosen.taskId+'-'+chosen.release);
            timeline.push({t, taskId:chosen.taskId, miss});
            chosen.remaining--;
        }
        return {timeline, H, misses};
    }

    function analysis(ts, alg){
        const U = utilization(ts);
        const n = ts.length;
        const ll = n*(Math.pow(2,1/n)-1);
        const lines = [];
        lines.push(`U = ${U.toFixed(3)} (${(U*100).toFixed(1)}%)`);
        if(alg==='EDF'){
            const ok = U<=1;
            lines.push(`Condición EDF (U≤1): <span class="${ok?'rts-ok':'rts-fail'}">${ok?'✓ planificable':'✗ no planificable'}</span>`);
        } else {
            lines.push(`Liu &amp; Layland: ${ll.toFixed(3)}`);
            const suf = U<=ll;
            lines.push(`Test suficiente: <span class="${suf?'rts-ok':'rts-warn'}">${suf?'✓ pasa':'⚠ no concluyente'}</span>`);
            // RTA
            let rtaOk = true;
            ts.forEach((t,i)=>{
                let R=t.C;
                for(let iter=0;iter<50;iter++){
                    const prev=R;
                    R=t.C+ts.slice(0,i).reduce((s,tj)=>s+Math.ceil(R/tj.T)*tj.C,0);
                    if(R===prev) break;
                }
                if(R>t.D) rtaOk=false;
            });
            lines.push(`RTA: <span class="${rtaOk?'rts-ok':'rts-fail'}">${rtaOk?'✓ todas cumplen plazo':'✗ alguna tarea falla'}</span>`);
        }
        return lines;
    }

    /* ---- render tasks ---- */
    function renderTasks(){
        const el = $('rts-task-list'); if(!el) return;
        if(!tasks.length){ el.innerHTML='<p class="sv-empty" style="font-size:.78rem">Sin tareas</p>'; return; }
        el.innerHTML = `
            <div class="rts-task-headers">
                <span>T (periodo)</span><span>C (cómputo)</span><span>D (plazo)</span><span></span>
            </div>` +
            tasks.map((t,i)=>`
            <div class="rts-task-row" data-idx="${i}">
                <input class="rts-task-input" data-field="T" value="${t.T}" min="1" max="60" type="number"
                    style="border-color:${COLORS[i%COLORS.length]}44">
                <input class="rts-task-input" data-field="C" value="${t.C}" min="1" max="30" type="number">
                <input class="rts-task-input" data-field="D" value="${t.D}" min="1" max="60" type="number">
                <button class="rts-del-task" data-idx="${i}" title="Eliminar τ${i+1}">✕</button>
            </div>`).join('');

        el.querySelectorAll('.rts-task-input').forEach(inp=>{
            inp.addEventListener('change',()=>{
                const row = inp.closest('[data-idx]');
                const idx = +row.dataset.idx;
                const field = inp.dataset.field;
                const val = Math.max(1,parseInt(inp.value)||1);
                tasks[idx][field] = val;
                inp.value = val;
                render();
            });
        });
        el.querySelectorAll('.rts-del-task').forEach(btn=>{
            btn.addEventListener('click',()=>{
                tasks.splice(+btn.dataset.idx,1);
                renderTasks(); render();
            });
        });
    }

    /* ---- render gantt ---- */
    function renderGantt(simResult){
        const el = $('rts-gantt'); if(!el) return;
        if(!simResult || !simResult.timeline.length){
            el.innerHTML='<p class="sv-empty">Añade tareas para ver el diagrama.</p>'; return;
        }
        const {timeline,H} = simResult;
        const ROW=28, PAD_TOP=30, PAD_LEFT=30, PAD_RIGHT=20, PAD_BOT=30;
        const CELL = Math.min(36, Math.max(18, Math.floor(560/H)));
        const W = PAD_LEFT + H*CELL + PAD_RIGHT;
        const svgH = PAD_TOP + tasks.length*ROW + PAD_BOT + 20;

        let svg = `<svg width="${W}" height="${svgH}" xmlns="http://www.w3.org/2000/svg" style="font-family:monospace">`;

        // task labels
        tasks.forEach((_,i)=>{
            svg+=`<text x="${PAD_LEFT-4}" y="${PAD_TOP+i*ROW+ROW/2+4}" text-anchor="end" font-size="11" fill="${COLORS[i%COLORS.length]}">τ${i+1}</text>`;
        });

        // time axis
        for(let t=0;t<=H;t++){
            const x=PAD_LEFT+t*CELL;
            svg+=`<line x1="${x}" y1="${PAD_TOP}" x2="${x}" y2="${PAD_TOP+tasks.length*ROW}" stroke="#1e1e3a" stroke-width="1"/>`;
            if(t%2===0||CELL>=24){
                svg+=`<text x="${x}" y="${PAD_TOP+tasks.length*ROW+14}" text-anchor="middle" font-size="9" fill="#4b5563">${t}</text>`;
            }
        }

        // task arrivals (release times)
        tasks.forEach((task,i)=>{
            for(let t=0;t<H;t+=task.T){
                const x=PAD_LEFT+t*CELL;
                svg+=`<line x1="${x}" y1="${PAD_TOP+i*ROW}" x2="${x}" y2="${PAD_TOP+i*ROW+ROW}" stroke="${COLORS[i%COLORS.length]}" stroke-width="1.5" opacity="0.5"/>`;
            }
            // deadlines
            for(let t=task.D;t<=H;t+=task.T){
                const x=PAD_LEFT+t*CELL;
                svg+=`<line x1="${x}" y1="${PAD_TOP+i*ROW}" x2="${x}" y2="${PAD_TOP+i*ROW+ROW}" stroke="#f59e0b" stroke-width="1" stroke-dasharray="3,2" opacity="0.6"/>`;
            }
        });

        // execution blocks
        timeline.forEach(({t,taskId,miss})=>{
            if(taskId<0) return;
            const color = miss ? '#f87171' : COLORS[taskId%COLORS.length];
            const x=PAD_LEFT+t*CELL, y=PAD_TOP+taskId*ROW;
            svg+=`<rect x="${x+1}" y="${y+4}" width="${CELL-2}" height="${ROW-8}" rx="3" fill="${color}" opacity="${miss?1:0.85}"/>`;
        });

        svg+=`</svg>`;
        el.innerHTML=svg;
    }

    /* ---- render analysis ---- */
    function renderAnalysis(){
        const el=$('rts-analysis'); if(!el) return;
        if(!tasks.length){ el.innerHTML=''; return; }
        const lines = analysis(tasks,algo);
        el.innerHTML = lines.join('<br>');
    }

    /* ---- render legend ---- */
    function renderLegend(){
        const el=$('rts-legend'); if(!el) return;
        let html = tasks.map((t,i)=>`
            <div class="rts-legend-item">
                <div class="rts-legend-color" style="background:${COLORS[i%COLORS.length]}"></div>
                τ${i+1} (T=${t.T}, C=${t.C}, D=${t.D})
            </div>`).join('');
        html+=`<div class="rts-legend-item"><div class="rts-legend-color" style="background:#f87171"></div>incumplimiento</div>`;
        html+=`<div class="rts-legend-item" style="align-items:center">
            <svg width="14" height="14"><line x1="7" y1="0" x2="7" y2="14" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="3,2"/></svg>
            plazo (D)
        </div>`;
        el.innerHTML=html;
    }

    function render(){
        renderTasks();
        if(!tasks.length){ $('rts-gantt').innerHTML='<p class="sv-empty">Añade tareas para ver el diagrama.</p>'; renderAnalysis(); return; }
        const sim = simulate(tasks,algo);
        renderGantt(sim);
        renderAnalysis();
        renderLegend();
    }

    /* ---- algo tabs ---- */
    document.querySelectorAll('.rts-algo').forEach(btn=>{
        btn.addEventListener('click',()=>{
            document.querySelectorAll('.rts-algo').forEach(b=>b.classList.remove('active'));
            btn.classList.add('active');
            algo=btn.dataset.algo;
            render();
        });
    });

    /* ---- presets ---- */
    document.querySelectorAll('.rts-preset').forEach(btn=>{
        btn.addEventListener('click',()=>{
            const p=PRESETS[btn.dataset.preset];
            if(p){ tasks=p.map((t,i)=>({...t,id:i})); nextId=tasks.length; render(); }
        });
    });

    /* ---- add task ---- */
    const addBtn=$('rts-add-task');
    if(addBtn) addBtn.addEventListener('click',()=>{
        if(tasks.length>=5) return;
        tasks.push({id:nextId++,T:8,C:2,D:8});
        render();
    });

    // initial render
    render();
})();
