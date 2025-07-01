# Visual Prompt Builder

A modern, interactive React + TypeScript web app for visually composing project prompts and templates.

## Features
- Modular, component-based UI (Material-UI)
- Live prompt preview (Natural Language & JSON)
- Save, edit, and reuse templates
- Rich selection of languages, frameworks, DevOps configs
- "Other" option for custom input

## Getting Started

### Prerequisites
- Node.js (18+ recommended)
- npm or yarn

### Install dependencies
```
npm install
# or
yarn
```

### Start the development server
```
npm run dev
# or
yarn dev
```

Open [http://localhost:5173](http://localhost:5173) to view the app.

### Build for production
```
npm run build
# or
yarn build
```

### Project Structure
- `src/` — App entry and main React code
- `components/` — Modular React components
- `visual-prompt-builder.tsx` — Main logic (being migrated to components)
- `public/` — Static assets and `index.html`

---

## Notes
- Uses [Vite](https://vitejs.dev/) for fast dev/build.
- UI: [Material-UI](https://mui.com/)
- TypeScript strict mode enabled.

## Roadmap
- Migrate all logic/UI into components
- Add drag-and-drop form builder (see docs.md)
- Add backend integration for template persistence

---

For more, see `docs.md`.
# visual-prompt-builder
