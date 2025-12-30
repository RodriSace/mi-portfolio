document.addEventListener('DOMContentLoaded', () => {
    
    // --- LÓGICA DEL MENÚ MÓVIL ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');
    const body = document.body;

    function toggleMenu() {
        // Alternar clases
        const isActive = navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
        
        // Bloquear scroll del fondo cuando el menú está abierto (Efecto App)
        if (isActive) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = '';
        }
    }

    if (hamburger) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });
    }

    // Cerrar menú al pulsar un enlace
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                toggleMenu(); // Cierra y restaura scroll
            }
        });
    });

    // --- PROTECCIÓN DE RESIZE (IMPORTANTE PARA QUE FUNCIONE EN AMBOS) ---
    // Si el usuario cambia el tamaño de ventana a modo escritorio (> 900px),
    // forzamos el cierre del menú móvil para recuperar el scroll y diseño normal.
    window.addEventListener('resize', () => {
        if (window.innerWidth > 900 && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            body.style.overflow = ''; // Recuperar scroll
        }
    });

    // --- CAMBIO DE TEMA (CLARO / OSCURO) ---
    const themeBtn = document.getElementById('theme-toggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Cargar tema guardado o defecto
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('theme-light');
        themeBtn.textContent = '🌞';
    } else {
        body.classList.remove('theme-light'); // Default dark
        themeBtn.textContent = '🌗';
    }

    themeBtn.addEventListener('click', () => {
        body.classList.toggle('theme-light');
        const isLight = body.classList.contains('theme-light');
        themeBtn.textContent = isLight ? '🌞' : '🌗';
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });

    // --- SCROLL SUAVE PARA ENLACES INTERNOS ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                // Ajuste para el header flotante
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // --- MODAL DE PROYECTOS (Básico) ---
    const modal = document.getElementById('project-modal');
    const modalBody = modal.querySelector('#modal-body');
    const modalTitle = modal.querySelector('#modal-title');
    const closeBtn = modal.querySelector('.modal-close');

    // Datos de ejemplo (puedes ampliar esto)
    const projectDetails = {
        'pokemon': {
            title: 'Explorador Pokémon',
            html: '<p>Esta aplicación utiliza la PokéAPI para listar pokémon con paginación infinita y búsqueda en tiempo real.</p><p>Tecnologías: Vanilla JS, CSS3, Fetch API.</p>'
        }
    };

    document.querySelectorAll('.btn-detail').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const projId = btn.getAttribute('data-open');
            if (projectDetails[projId]) {
                modalTitle.textContent = projectDetails[projId].title;
                modalBody.innerHTML = projectDetails[projId].html;
                modal.setAttribute('aria-hidden', 'false');
                body.style.overflow = 'hidden'; // Bloquear scroll
            }
        });
    });

    function closeModal() {
        modal.setAttribute('aria-hidden', 'true');
        body.style.overflow = ''; // Restaurar scroll
    }

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    
    // Cerrar al pulsar fuera del modal
    window.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
});