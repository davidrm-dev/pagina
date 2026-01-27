# Aromas Quirences — Sitio Web (Astro)

Este repositorio contiene el sitio web estático de Aromas Quirences, ahora convertido a un proyecto Astro.

Rápido:

- Servidor de desarrollo: `npm install && npm run dev`
- Build producción: `npm run build`
- Preview de la build: `npm run preview`

Estructura relevante:

- `package.json` — scripts y dependencia de `astro`.
- `astro.config.mjs` — configuración mínima.
- `src/pages/index.astro` — página principal.
- `src/layouts/BaseLayout.astro` — layout base y metadatos.
- `src/styles/global.css` — estilos globales.
- `public/` — (sugerido) archivos estáticos como `logo.png`, `JugoMango.png`, `JugoMora.png`.

Contacto mostrado en la web:

- Teléfono: +7 3124136771
- Correo: contacto@aromasquirences.com

Buenas prácticas y siguientes pasos recomendados:

1. Añadir `package-lock.json` o `pnpm-lock.yaml` para determinismo.
2. Añadir `README.md` más completo con guía de despliegue (Vercel/Netlify).
3. Añadir CI (GitHub Actions) que corra `npm ci`, `npm run build` y linting.
4. Mover imágenes a `public/` y revisar tamaños/formatos.
5. Añadir tests y linter (`eslint`, `prettier`).
