document.addEventListener('DOMContentLoaded', () => {
    
    // MENÚ MÓVIL
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');
    const body = document.body;

    function toggleMenu() {
        const isActive = navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
        
        // Bloquear scroll solo en móvil
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

    // Cerrar al pulsar enlace
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // Resetear al volver a PC
    window.addEventListener('resize', () => {
        if (window.innerWidth > 900 && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            body.style.overflow = '';
        }
    });

    // TEMA CLARO/OSCURO
    const themeBtn = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'light') {
        body.classList.add('theme-light');
        themeBtn.textContent = '🌞';
    } else {
        body.classList.remove('theme-light');
        themeBtn.textContent = '🌗';
    }

    themeBtn.addEventListener('click', () => {
        body.classList.toggle('theme-light');
        const isLight = body.classList.contains('theme-light');
        themeBtn.textContent = isLight ? '🌞' : '🌗';
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });

    // SCROLL SUAVE
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: "smooth" });
            }
        });
    });

    // MODAL
    const modal = document.getElementById('project-modal');
    const modalBody = modal.querySelector('#modal-body');
    const modalTitle = modal.querySelector('#modal-title');
    const closeBtn = modal.querySelector('.modal-close');

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
                body.style.overflow = 'hidden';
            }
        });
    });

    function closeModal() {
        modal.setAttribute('aria-hidden', 'true');
        body.style.overflow = '';
    }

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
});