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

    /* ---------- 5. MENSAJE OCULTO PARA QUIEN ABRE LA CONSOLA ---------- */
    console.log('%c¿Buscando talento? 👀', 'color:#8b5cf6;font-size:18px;font-weight:700;');
    console.log('%cPista: pulsa la tecla «`» en la web para abrir mi terminal interactiva.', 'color:#3b82f6;font-size:13px;');
    console.log('%c…y prueba el código Konami: ↑ ↑ ↓ ↓ ← → ← → B A', 'color:#a1a1aa;font-size:12px;');
});
