document.addEventListener('DOMContentLoaded', () => {
    // MENÚ MÓVIL HAMBURGUESA
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');

    function toggleMenu(open) {
        if (!navLinks || !hamburger) return;
        
        navLinks.classList.toggle('active', open);
        hamburger.classList.toggle('active', open);
        hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
        
        // Bloquear scroll del body si el menú está abierto (Efecto App)
        document.body.style.overflow = open ? 'hidden' : 'auto';
    }

    if (hamburger) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation(); // Evitar conflictos
            toggleMenu(!navLinks.classList.contains('active'));
        });
        hamburger.addEventListener('keydown', (e) => { 
            if (e.key === 'Enter' || e.key === ' ') { 
                e.preventDefault(); 
                toggleMenu(!navLinks.classList.contains('active')); 
            } 
        });
    }

    // Cerrar menú al hacer click en un enlace
    links.forEach(link => {
        link.addEventListener('click', () => toggleMenu(false));
    });

    // Cerrar menú al hacer click fuera (opcional, pero buena práctica)
    document.addEventListener('click', (e) => {
        if (navLinks && navLinks.classList.contains('active') && !navLinks.contains(e.target) && !hamburger.contains(e.target)) {
            toggleMenu(false);
        }
    });

    // SCROLL SUAVE
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href || href === '#') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // ANIMACIONES AL HACER SCROLL (Intersection Observer)
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.proyecto-card, .habilidad, .sobre-mi p, .info-card, .timeline-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // ANIMACIÓN DE BARRAS DE HABILIDADES
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBars = entry.target.querySelectorAll('.skill-progress');
                skillBars.forEach((bar, index) => {
                    setTimeout(() => {
                        const width = bar.style.width || '0%';
                        bar.style.width = width;
                    }, index * 200); 
                });
                skillsObserver.unobserve(entry.target); 
            }
        });
    }, { threshold: 0.3 });

    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }

    // NAVEGACIÓN ACTIVA SEGÚN SCROLL
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= (sectionTop - 200)) current = section.getAttribute('id');
        });

        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
        });
    });

    // Efecto parallax sutil en el hero
    window.addEventListener('scroll', () => {
        const hero = document.querySelector('.hero');
        const scrolled = window.scrollY;
        if (hero && scrolled < window.innerHeight) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            hero.style.opacity = 1 - (scrolled / window.innerHeight);
        }
    });

    // FORMULARIO DE CONTACTO
    const form = document.getElementById('contact-form');
    const status = document.getElementById('form-status');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = form.querySelector('#name').value.trim();
            const email = form.querySelector('#email').value.trim();
            const message = form.querySelector('#message').value.trim();

            if (!name || !email || !message) {
                if (status) status.textContent = 'Por favor rellena todos los campos.';
                return;
            }

            // Fallback: abrir cliente de correo mediante mailto
            const subject = encodeURIComponent(`Contacto desde portafolio: ${name}`);
            const body = encodeURIComponent(`Nombre: ${name}\nCorreo: ${email}\n\nMensaje:\n${message}`);
            const mailto = `mailto:rodrigo.de@alu.uclm.es?subject=${subject}&body=${body}`;
            window.location.href = mailto;
            if (status) status.textContent = 'Abriendo cliente de correo...';
            form.reset();
        });
    }

    // THEME TOGGLE
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'light');
    function applyTheme(theme) {
        if (theme === 'light') document.body.classList.add('theme-light'); else document.body.classList.remove('theme-light');
        if (themeToggle) themeToggle.textContent = theme === 'light' ? '🌞' : '🌗';
        localStorage.setItem('theme', theme);
    }
    applyTheme(currentTheme === 'light' ? 'light' : 'dark');
    if (themeToggle) themeToggle.addEventListener('click', () => applyTheme(document.body.classList.contains('theme-light') ? 'dark' : 'light'));

    // MODAL PROYECTOS
    const modal = document.getElementById('project-modal');
    const modalBody = modal ? modal.querySelector('#modal-body') : null;
    const modalTitle = modal ? modal.querySelector('#modal-title') : null;
    const modalClose = modal ? modal.querySelector('.modal-close') : null;

    const projectData = {
        pokemon: {
            title: 'Proyecto Pokémon',
            body: `<p>Aplicación que consume la PokéAPI para mostrar fichas de Pokémon, búsqueda y paginación. Construido con HTML, CSS y JavaScript puro.</p>
                   <p class="muted">Tecnologías: HTML5, CSS3, JavaScript (Fetch API)</p>
                   <p><a href="https://rodrisace.github.io/ProyectoPokemon/" target="_blank" rel="noopener">Demo</a> • <a href="https://github.com/rodrisace/ProyectoPokemon" target="_blank" rel="noopener">Repositorio</a></p>`
        }
    };

    function openModal(key) {
        if (!modal || !modalBody || !modalTitle) return;
        const data = projectData[key];
        if (!data) return;
        modalTitle.textContent = data.title;
        modalBody.innerHTML = data.body;
        modal.setAttribute('aria-hidden', 'false');
    }
    function closeModal() { if (modal) modal.setAttribute('aria-hidden', 'true'); }

    document.querySelectorAll('.btn-detail').forEach(btn => btn.addEventListener('click', (e) => { e.preventDefault(); const key = btn.dataset.open; openModal(key); }));
    if (modalClose) modalClose.addEventListener('click', closeModal);
    window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

    console.log('🚀 Portafolio cargado correctamente!');
});