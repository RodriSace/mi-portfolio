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

    const animatedElements = document.querySelectorAll('.proyecto-card, .skill-item, .sobre-mi p, .approach-card, .highlight-item, .timeline-item');
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

    // FORMULARIO DE CONTACTO (MEJORADO CON FORMSUBMIT AJAX Y FALLBACK)
    const form = document.getElementById('contact-form');
    const status = document.getElementById('form-status');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = form.querySelector('button[type="submit"]');
            const name = form.querySelector('#name').value.trim();
            const email = form.querySelector('#email').value.trim();
            const message = form.querySelector('#message').value.trim();

            if (!name || !email || !message) {
                if (status) {
                    status.style.color = '#ef4444';
                    status.textContent = 'Por favor rellena todos los campos.';
                }
                return;
            }

            // Deshabilitar botón y mostrar estado de carga
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            if (status) {
                status.style.color = 'var(--color-acento)';
                status.textContent = 'Procesando mensaje...';
            }

            try {
                const response = await fetch("https://formsubmit.co/ajax/rodrigohozlopez@gmail.com", {
                    method: "POST",
                    headers: { 
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        Nombre: name,
                        Email: email,
                        Mensaje: message
                    })
                });

                if (response.ok) {
                    if (status) {
                        status.style.color = '#10b981';
                        status.textContent = '¡Mensaje enviado con éxito! Te responderé pronto.';
                    }
                    form.reset();
                } else {
                    throw new Error('Error en el servidor');
                }
            } catch (error) {
                console.error('Error enviando por AJAX, usando fallback mailto:', error);
                // Fallback: abrir cliente de correo mediante mailto
                const subject = encodeURIComponent(`Contacto desde portafolio: ${name}`);
                const body = encodeURIComponent(`Nombre: ${name}\nCorreo: ${email}\n\nMensaje:\n${message}`);
                const mailto = `mailto:rodrigohozlopez@gmail.com?subject=${subject}&body=${body}`;
                window.location.href = mailto;
                if (status) {
                    status.style.color = 'var(--color-acento)';
                    status.textContent = 'Abriendo cliente de correo nativo...';
                }
                form.reset();
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            }
        });
    }

    // THEME TOGGLE
    const themeToggle = document.getElementById('theme-toggle');
    let currentTheme = localStorage.getItem('theme');
    if (!currentTheme) {
        currentTheme = 'light';
        localStorage.setItem('theme', 'light');
    }
    function applyTheme(theme) {
        if (theme === 'light') document.body.classList.add('theme-light'); else document.body.classList.remove('theme-light');
        if (themeToggle) themeToggle.textContent = theme === 'light' ? '🌞' : '🌗';
        localStorage.setItem('theme', theme);
    }
    applyTheme(currentTheme);
    if (themeToggle) themeToggle.addEventListener('click', () => applyTheme(document.body.classList.contains('theme-light') ? 'dark' : 'light'));

    // MODAL PROYECTOS
    const modal = document.getElementById('project-modal');
    const modalBody = modal ? modal.querySelector('#modal-body') : null;
    const modalTitle = modal ? modal.querySelector('#modal-title') : null;
    const modalClose = modal ? modal.querySelector('.modal-close') : null;

    const projectData = {
        gramola: {
            title: 'La Gramola Virtual',
            body: `<p>Una plataforma web que moderniza la experiencia musical en locales comerciales. Los clientes pueden escanear un código QR, buscar canciones usando la API de Spotify y añadirlas a una cola de reproducción en tiempo real mediante tokens adquiridos a través de Stripe.</p>
                   <p><strong>Características clave:</strong></p>
                   <ul>
                       <li>Panel de administración para locales (control de reproducción y licencias).</li>
                       <li>Pasarela de pago integrada con Stripe para compra de créditos/canciones.</li>
                       <li>Integración completa con la API de Spotify para búsqueda y control de reproductor.</li>
                       <li>Backend escalable desarrollado con arquitectura limpia en Spring Boot.</li>
                   </ul>
                   <p class="muted">Tecnologías: Angular 19, Spring Boot 3, Hibernate, MySQL, Stripe API, Spotify API</p>
                   <p><a href="https://github.com/RodriSace/gramolaRodrigo-project" target="_blank" rel="noopener">Ver Repositorio</a></p>`
        },
        pokemon: {
            title: 'Explorador Pokémon (iPokemon)',
            body: `<p>Aplicación de exploración e interacción con criaturas Pokémon desarrollada para simular un proyecto UWP completo en entorno web.</p>
                   <p><strong>Características clave:</strong></p>
                   <ul>
                       <li>Integración con PokeAPI para obtener estadísticas e imágenes oficiales en tiempo real.</li>
                       <li>Simulación interactiva de Spheal con barra de vida, energía, estados (dormido, cansado, debilitado).</li>
                       <li>Animaciones CSS fluidas y dinámicas para simular ataques y efectos visuales.</li>
                       <li>Filtros y motores de búsqueda avanzados.</li>
                   </ul>
                   <p class="muted">Tecnologías: HTML5, CSS3, JavaScript puro (Vanilla JS), PokeAPI</p>
                   <p><a href="pokemon-demo.html" target="_blank">Demo Local</a> • <a href="https://github.com/rodrisace/ProyectoPokemon" target="_blank" rel="noopener">Ver Repositorio</a></p>`
        },
        spotify_vinyl: {
            title: 'Spotify to Vinyl',
            body: `<p>Plataforma innovadora que permite a los amantes de la música tangibilizar sus gustos digitales convirtiendo playlists de Spotify en diseños de discos de vinilo coleccionables personalizados.</p>
                   <p><strong>Características clave:</strong></p>
                   <ul>
                       <li>Autenticación OAuth2 segura con Spotify.</li>
                       <li>Análisis de metadatos de playlists para determinar colores predominantes y diseño artístico automático.</li>
                       <li>Generación en tiempo real de renders en 3D del disco y la portada.</li>
                       <li>Interfaz moderna enfocada en la personalización de usuario (UX/UI).</li>
                   </ul>
                   <p class="muted">Tecnologías: React.js, Node.js, Express, Spotify Web API, CSS Modules</p>
                   <p><a href="https://github.com/rodrisace" target="_blank" rel="noopener">Ver Repositorio</a></p>`
        },
        isi_lab: {
            title: 'ISI-LAB (Buscador Musical)',
            body: `<p>Sistema de gestión y búsqueda de información musical desarrollado bajo principios de bases de datos relacionales y diseño de software orientado a objetos.</p>
                   <p><strong>Características clave:</strong></p>
                   <ul>
                       <li>Base de datos optimizada en MySQL con relaciones complejas entre artistas, álbumes y pistas.</li>
                       <li>Buscador dinámico con filtros avanzados (género, año, popularidad).</li>
                       <li>Interfaz limpia e intuitiva integrada con backend de Java.</li>
                       <li>Operaciones CRUD completas y seguras.</li>
                   </ul>
                   <p class="muted">Tecnologías: Java SE, JDBC, MySQL, HTML5, CSS3</p>
                   <p><a href="https://github.com/rodrisace" target="_blank" rel="noopener">Ver Repositorio</a></p>`
        }
    };

    let lastActiveElement = null;

    function openModal(key, triggerBtn) {
        if (!modal || !modalBody || !modalTitle) return;
        const data = projectData[key];
        if (!data) return;
        
        lastActiveElement = triggerBtn || document.activeElement;
        modalTitle.textContent = data.title;
        modalBody.innerHTML = data.body;
        modal.setAttribute('aria-hidden', 'false');
        
        // Enfocar el botón de cerrar al abrir para accesibilidad
        if (modalClose) {
            setTimeout(() => modalClose.focus(), 50);
        }
    }

    function closeModal() {
        if (!modal) return;
        modal.setAttribute('aria-hidden', 'true');
        if (lastActiveElement) {
            lastActiveElement.focus();
        }
    }

    document.querySelectorAll('.btn-detail').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const key = btn.dataset.open;
            openModal(key, btn);
        });
    });

    if (modalClose) modalClose.addEventListener('click', closeModal);
    
    // Cerrar al pulsar Escape
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });

    // Cerrar al hacer clic en el backdrop (fuera del contenido)
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });

        // Trampa de foco (Focus Trap) para navegación por teclado
        modal.addEventListener('keydown', (e) => {
            if (e.key !== 'Tab') return;
            
            const focusableEls = modal.querySelectorAll('a[href], button:not([disabled]), textarea, input, select');
            if (focusableEls.length === 0) return;
            
            const firstFocusable = focusableEls[0];
            const lastFocusable = focusableEls[focusableEls.length - 1];
            
            if (e.shiftKey) { // Shift + Tab
                if (document.activeElement === firstFocusable) {
                    lastFocusable.focus();
                    e.preventDefault();
                }
            } else { // Tab
                if (document.activeElement === lastFocusable) {
                    firstFocusable.focus();
                    e.preventDefault();
                }
            }
        });
    }



    console.log('🚀 Portafolio cargado correctamente! v2.5');
});