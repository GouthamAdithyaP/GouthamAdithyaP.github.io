# Goutham Adithya P — Portfolio

A personal product site for a Java Backend & Full-Stack Developer. It's built with React 19, TypeScript and Vite, then prerendered to static HTML so it loads fast and is easy for search engines to read.

## Quick start

```bash
npm install
npm run dev        # local dev server with hot reload
npm run build      # type-check, build, prerender to dist/
npm run preview    # serve the production build at http://localhost:4173
```

## Profile photo

The photo is `public/profile.webp`, a 640×640 square shown in a round frame. To change it, replace that file with another square image and rebuild. If the file is missing, "GA" initials are shown instead.

## Edit the content

Everything on the site comes from one file: `src/data/profile.ts`.
Change text, skills, projects, metrics or links there. You don't need to touch the components.

- The resume lives in `public/resume/` as PDF and DOCX. Keep the same file names, or update the paths in `profile.ts`.
- Theme colors are the CSS variables at the top of `src/styles/global.css`.

## Deploy (free)

**GitHub Pages, automatic**
1. Create a repo, for example `gouthamadithya.github.io`, and push this folder to the `main` branch.
2. In the repo, open Settings, then Pages, and set Source to **GitHub Actions**.
3. Each push to `main` builds and deploys through `.github/workflows/deploy.yml`.

**Netlify or Vercel**
Import the repo. Use `npm run build` as the build command and `dist` as the output folder.

**Manual**
Run `npm run build` and upload the contents of `dist/` to any static host. Asset paths are relative, so sub-folders work too.

## What's inside

| Area | Details |
|---|---|
| Sections | Hero with photo and a 30-second summary, About, Skills, Experience timeline, Featured projects, Case studies, Impact, Resume, Contact |
| Interactions | Command palette (Ctrl/⌘ K), developer terminal (press <code>`</code>), expandable timeline, skill explorer with "used in" links, clickable architecture diagrams, step-by-step flow walkthrough, cursor spotlight on project cards |
| Theme | Dark and light, follows the system setting, saved per visitor, circular reveal transition where the browser supports it |
| Accessibility | Semantic landmarks, skip link, keyboard navigation for tabs, palette and terminal, ARIA states, visible focus, `prefers-reduced-motion` respected |
| Performance | Prerendered HTML, self-hosted fonts with preload, no layout shift, tree-shaken icons |
| SEO | Meta and Open Graph tags, JSON-LD `Person` schema, robots.txt, real text content in the HTML |

Lighthouse on the local production build:

| Device | Performance | Accessibility | Best practices | SEO |
|---|---|---|---|---|
| Mobile | 97 | 100 | 100 | 100 |
| Desktop | 100 | 100 | 100 | 100 |

## Easter eggs

- Press <code>`</code> to open the terminal. Try `help`, `whoami`, `case uco`, `mvn spring-boot:run` and `sudo hire goutham`.
- Open DevTools to see a console greeting.
