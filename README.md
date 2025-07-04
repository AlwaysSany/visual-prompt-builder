# Visual Prompt Builder

A modern, interactive React + TypeScript web app for visually composing project prompts and templates.

## Working Demo

See Live: [Visual Prompt Builder](https://visual-prompt-builder.vercel.app)

## Project Overview

This project is a web application that allows users to visually compose project prompts and templates. It provides a user-friendly interface for selecting project domain, language, framework, config files, and describing the project. The application generates a dynamic summary sentence and a detailed prompt in both Natural Language and JSON formats. Users can save templates for quick reuse and edit or update existing templates in-place. The application also includes a confirmation dialog to prevent accidental loss of templates and provides options to copy or download the prompt.

## Features
- **Modular, component-based UI** using Material-UI
- **Live prompt preview**: See your prompt in both Natural Language and JSON formats as you build
- **Dynamic summary sentence**: Human-readable, AI-style summary sentence appears at the top of each preview
- **Save, edit, update, and delete prompt templates**
    - Edit mode clearly indicated ("Update" button, field label)
    - Edit in-place, update existing templates without duplication
    - Load templates for use without entering edit mode
- **Delete confirmation dialog**: Prevent accidental deletion of templates
- **Persistent storage**: All templates are saved in your browser's localStorage (no backend required)
- **Rich selection of languages, frameworks, and configuration files**
- **Custom "Other" option** for any field
- **Copy to clipboard and download prompt** actions
- **Responsive and accessible UI**

## Getting Started

### Prerequisites
- Node.js (18+ recommended)
- npm or yarn

### Install dependencies
```sh
npm install
# or
yarn
```

### Start the development server
```sh
npm run dev
# or
yarn dev
```

Open [http://localhost:5173](http://localhost:5173) to view the app.

### Build for production
```sh
npm run build
# or
yarn build
```

### Project Structure
- `src/` — App entry and main React code
- `components/` — Modular React components
- `VisualPromptBuilder.tsx` — Main logic and state management
- `public/` — Static assets and `index.html`

---

## Usage
1. **Fill out the form**: Select project domain, language, framework, config files, and describe your project.
2. **Preview your prompt**: Instantly see both a dynamic summary and a detailed prompt in Natural Language and JSON.
3. **Save templates**: Store frequently-used prompt configurations for quick reuse.
4. **Edit or update**: Click the ✏️ icon to edit a template in-place. The form and template name will reflect edit mode.
5. **Delete with confidence**: A confirmation dialog prevents accidental loss of templates.
6. **Copy or download**: One-click copy or download for easy sharing or use.

---

## Recent Improvements
- **Edit/update workflow**: Improved UX for editing templates, with clear UI feedback.
- **Delete confirmation**: Added a confirmation dialog before deleting templates.
- **Dynamic NL preview**: Added a human-readable summary sentence to both previews.
- **Persistent localStorage**: All templates are saved in your browser, no backend needed.
- **UI polish**: Improved labeling, accessibility, and error handling.

---

## Notes
- Uses [Vite](https://vitejs.dev/) for fast dev/build.
- UI: [Material-UI](https://mui.com/)
- TypeScript strict mode enabled.

## Roadmap
- Drag-and-drop form builder (see docs.md)
- Backend integration for cloud persistence (optional)
- Export to YAML and other formats

---

For more, see [`docs.md`](./docs.md).
