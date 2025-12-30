document.addEventListener('DOMContentLoaded', () => {
    
    // MENÚ MÓVIL
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // TEMA CLARO/OSCURO
    const themeBtn = document.getElementById('theme-toggle');
    const body = document.body;
    
    themeBtn.addEventListener('click', () => {
        body.classList.toggle('theme-light');
        const isLight = body.classList.contains('theme-light');
        themeBtn.textContent = isLight ? '🌞' : '🌗';
    });

    // SCROLL SUAVE
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
            }
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.setAttribute('aria-hidden', 'true');
        });
    }
});