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
            echo(args) { print(args.join(' ') || ''); },
            date() { print(new Date().toString()); },
            clear() { body.innerHTML = ''; },
            exit() { closeTerminal(); }
        };

        function runCommand(raw) {
            const trimmed = raw.trim();
            print(`<span class="terminal-prompt">rodrigo@portfolio:~$</span> ${escapeHtml(trimmed)}`);
            if (!trimmed) return;
            history.unshift(trimmed);
            histIndex = -1;
            const [name, ...args] = trimmed.split(/\s+/);
            const cmd = commands[name.toLowerCase()];
            if (cmd) {
                cmd(args);
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
