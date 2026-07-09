# AGENTS.md

## Project overview

Topologix is a **static HTML/CSS/JS** educational game for children (ages 4-7) that teaches spatial reasoning. Despite the folder name, there is **no Angular, no build tools, no package manager**. It is a plain static site served via Apache httpd (Docker).

The game has 3 levels (`Index1.html`, `index2.html`, `index3.html`). Each level presents a 5x5 grid board with animals and locations. The player selects a spatial position and a location from carousels, then clicks a cell to verify.

## How to run locally

No build step. Serve the root directory with any static file server:

```bash
# Python
python -m http.server 8080

# Or Docker
docker build -t topologix .
docker run -p 8080:80 topologix
```

Entry points: `welcome.html` (landing), `Index1.html` (level 1), `index2.html` (level 2), `index3.html` (level 3).

## Architecture

- **HTML pages**: `welcome.html`, `Index1.html`, `index2.html`, `index3.html` — each loads its own `CarouselN.js`
- **JS**: `js/Carousel1.js`, `js/Carousel2.js`, `js/Carousel3.js` — nearly identical files (copy-paste pattern, not shared). Each contains game logic, carousel controllers, and answer validation. `js/originalCode.js` is an older/generic version. `js/bootstrap.js` is Bootstrap's JS bundle.
- **CSS**: `css/css.css` (custom styles), `css/bootstrap.css` (Bootstrap CSS). Also loads Tailwind via CDN.
- **Assets**: `images/` (animales, Disposiciones, lugares, tableros), `sounds/` (audio feedback)
- **Database**: `insercionones.sql` — unrelated Mexican cities/states data, not used by the game

## Key gotchas

- **Each level is a separate copy-paste of the same JS** (`Carousel1.js`, `Carousel2.js`, `Carousel3.js`). The only difference is the `CorrectAnswers` array per level. When fixing a bug in one file, check if the same bug exists in the other two.
- **`CorrectAnswers`** are hardcoded strings like `'aveArribaPiedra'` — format is `{animal}{position}{location}`. Answers are in Spanish.
- **Responsive layout** is handled in JS (`ajustarTablero()`), not CSS media queries — the board resizes via inline styles at breakpoints (720px, 1160px, 1320px).
- **Mobile vs desktop**: Mobile shows carousels + "Verificar" button. Desktop shows a clickable grid board. Both paths exist in the same HTML, toggled by Bootstrap's `d-md-none`/`d-md-flex`.
- **Images have two variants per asset**: `_celular.png` (mobile carousel) and `_computadora.png` (desktop grid), plus `.svg` board images. Don't mix them up.
- **No linting, testing, or typecheck commands exist** — this is raw HTML/JS with no tooling.
- **The repo is in Spanish** — variable names, comments, UI text, and answer keys are all Spanish.

## Available skills (`.agents/skills/`)

**On every user request, load the relevant skill(s) before responding.** The skills live in `.agents/skills/` and provide domain-specific guidance.

| Skill | When to use |
|-------|-------------|
| `accessibility` | "mejorar accesibilidad", "auditar a11y", "cumplir WCAG", "soporte lector de pantalla", "navegación por teclado", "hacer accesible" |
| `frontend-design` | Construir componentes web, páginas, landing pages, dashboards, layouts HTML/CSS, o estilizar/beautificar cualquier UI |
| `seo` | "mejorar SEO", "optimizar para buscadores", "arreglar meta tags", "agregar datos estructurados", "optimizar sitemap" |
| `tailwind-css-patterns` | Estilizar con Tailwind CSS: layouts responsivos, flexbox, grid, dark mode, componentes, optimización de CSS |

Example: if the user asks "haz que el tablero sea más accesible para lectores de pantalla", load `accessibility` first, then apply changes. If they ask "rediseña el welcome.html con un look moderno", load `frontend-design` and `tailwind-css-patterns`.
