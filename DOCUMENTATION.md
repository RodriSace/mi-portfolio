DOCUMENTACIÓN

Resumen (1 página):

- Tecnologías usadas:
  - HTML5: estructura semántica para accesibilidad y SEO.
  - CSS3 (variables, Grid y Flexbox): diseño responsive, sistema de colores y componentes reusables.
  - JavaScript (Vanilla): interacciones, menú móvil accesible, animaciones con IntersectionObserver y manejador de formulario.

Justificación:
- Se eligió HTML/CSS/JS puros porque el objetivo es un portfolio estático ligero, fácil de desplegar (GitHub Pages) y con control explícito sobre accesibilidad y SEO.
- CSS variables permiten mantener esquema de color y contrastes consistentes; Grid/Flexbox facilitan responsive sin dependencias.
- Vanilla JS evita dependencia de frameworks, mejora el tiempo de carga y facilita entender la lógica.

Elementos personalizados y decisiones de diseño:
- Diseño oscuro con acento cian para buena percepción y contraste; variables CSS facilitan personalización rápida.
- Botón de descarga de CV visible en la navegación y `download` para mejorar usabilidad.
- Timeline: presenta trayectoria académica y profesional de forma cronológica, fácil de escanear.
- Habilidades separadas en `Hard Skills` y `Soft Skills` para claridad al evaluador.
- Portfolio: tarjetas con miniaturas, enlaces a demo y repositorio; incluyo `rel="noopener"` para seguridad.
- Formulario de contacto con validación y fallback por `mailto:` para asegurar envío sin servidor.
- Formulario de contacto con validación, opción de envío a endpoint (Formspree) y fallback por `mailto:`.

Accesibilidad y SEO:
- Uso de etiquetas semánticas (`nav`, `section`, `header`, `footer`) y `aria-label` en elementos clave.
- `aria-expanded` y control por teclado en la hamburguesa para navegación móvil.
- Meta tags (`description`, `keywords`, `robots`) y JSON-LD básico para identificar al autor a motores de búsqueda.
- Colores con contraste suficiente; focos visibles para navegación por teclado.

- Se ha añadido toggle de tema claro/oscuro con persistencia en `localStorage`.
- Modal de detalles para proyectos con mejora de la experiencia y enlaces a demo/repositorio.
- Favicons (SVG), `site.webmanifest`, `robots.txt` y `sitemap.xml` incluidos para mejor despliegue y SEO.

Novedades / Diferencial:
- Implementación ligera y personalizada sin frameworks, priorizando rendimiento y accesibilidad.
- Timeline y separación clara de skills pensadas para una lectura rápida por parte de reclutadores.
- Código sencillo de mantener y adaptar a futuras integraciones (CMS, backend o envío con servicios como Formspree).

Instrucciones para probar localmente:

1. Abrir `index.html` en un navegador moderno.
2. Probar la descarga del CV (botón "Descargar CV").
3. Probar el menú móvil reduciendo el ancho de la ventana.
4. Enviar un mensaje con el formulario (abre el cliente de correo configurado mediante `mailto:`).
5. Alternativamente, configura `data-form-endpoint` en el elemento `form#contact-form` con tu endpoint de Formspree para envío sin abrir cliente de correo.

Opcionales próximos pasos:
- Conectar el formulario a un servicio de envío (Formspree, Netlify Forms o backend propio).
- Añadir microdatos más completos o Open Graph para compartir en redes sociales.
- Generar PDF real del CV y optimizar imágenes (WebP) y meta tags para mejores resultados SEO.
 - Ejecutar Lighthouse y ajustar rendimiento (preload fonts, optimizar imágenes, minificar recursos).

Fin de la documentación.
