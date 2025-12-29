Despliegue rápido (obtener un enlace público)

Opciones recomendadas:

1) GitHub Pages (fácil, gratuito)

- Crear repo en GitHub (desde web) y subir los archivos.
- Puedes usar la rama `gh-pages` o habilitar Pages desde la rama `main`/`master` y carpeta `/` o `/docs`.

Comandos (PowerShell) para subir desde la carpeta del proyecto:

```powershell
# Inicializar repo local (si no existe)
git init
git add .
git commit -m "Initial commit - portfolio"
# Crear el repositorio remoto en GitHub (si tienes gh CLI instalado)
# gh repo create <usuario>/<nombre-repo> --public --source=. --remote=origin --push
# Si no usas gh, crea el repo en github.com y copia la URL remota:
# git remote add origin https://github.com/<usuario>/<nombre-repo>.git
git branch -M main
git push -u origin main
```

- Activar GitHub Pages:
  - En el repo en GitHub: Settings → Pages → Source → `main` branch (root) → Save.
  - Tras unos minutos tendrás la URL: `https://<usuario>.github.io/<nombre-repo>/` (o custom domain si lo configuras).

- Alternativa (automática): incluir el workflow `.github/workflows/deploy.yml` (ya incluido en este proyecto) que publica en `gh-pages` cada vez que haces `push` a `main`.
  - Si quieres usarlo solo empuja a `main`; GitHub Actions construirá y publicará la web en la rama `gh-pages` que será usada por Pages.


2) Netlify (rápido, arrastra y suelta o conexión con Git)

- Inicia sesión en Netlify y usa "New site from Git" para conectar tu repo (GitHub). Netlify detecta sitios estáticos y publica automáticamente.
- O: en la web de Netlify arrastra la carpeta `mi-portfolio` al área "Drag and drop" para publicar rápidamente.


3) Vercel (fácil con GitHub)

- Conecta el repo desde la web de Vercel y despliega. Funciona muy bien para proyectos estáticos.


Archivos incluidos en este proyecto para facilitar despliegue automático:

- `.github/workflows/deploy.yml` — workflow que publica el contenido en `gh-pages` al hacer `push` en `main`.
- `netlify.toml` — configuración mínima para Netlify.


Notas y recomendaciones:
- Si usas GitHub Pages con el workflow, la URL final suele ser `https://<usuario>.github.io/<repo>/`. En Settings → Pages comprueba que la rama de publicación es `gh-pages`.
- Asegúrate de no publicar archivos secretos.
- Para un dominio personalizado, añade el CNAME en GitHub Pages o configura el dominio en Netlify.

Si quieres, hago esto por ti:
- Subir el repo a GitHub (necesitaré que me autorices o que pegues aquí la URL del repo cuando lo crees), o
- Configurar el `netlify.toml` o el workflow específico a tu preferencia.

Dime qué opción prefieres y te guío o añado lo necesario automáticamente.
