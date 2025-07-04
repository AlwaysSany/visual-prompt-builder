# Visual Prompt Builder

A modern, interactive React + TypeScript web app for visually composing project prompts and templates.

## Working Demo

See Live: [Visual Prompt Builder](https://visual-prompt-builder.vercel.app)

## Project Overview

This project is a web application that allows users to visually compose project prompts and templates. It provides a user-friendly interface for selecting project domain, language, framework, config files, and describing the project. The application generates a dynamic summary sentence and a detailed prompt in both Natural Language and JSON formats. Users can save templates for quick reuse and edit or update existing templates in-place. The application also includes a confirmation dialog to prevent accidental loss of templates and provides options to copy or download the prompt.

## Features & Usage

### Core Functionality
- **Interactive Form**
  - Select project domain, language, framework, and config files
  - Add custom descriptions and details
  - Dynamic form updates as you type

### Smart Preview System
- **Live Prompt Preview**
  - Real-time updates in both Natural Language and JSON formats
  - Dynamic summary sentence generation
  - Clean, readable output formatting

### Template Management
- **Save & Reuse**
  - Save frequently-used prompt configurations
  - One-click load for quick access
  - Inline editing of existing templates
  - Clear visual indicators for edit mode
  - Confirmation dialog for safe deletion

### Enhanced User Experience
- **Modern UI Components**
  - Built with Material-UI for consistent, responsive design
  - Accessible controls and labels
  - Smooth animations and transitions

- **Convenience Features**
  - One-click copy to clipboard
  - Download prompt as text file
  - Persistent storage using localStorage
  - Responsive layout for all devices

### Recent Enhancements
- Streamlined edit/update workflow
- Added delete confirmation dialog
- Improved dynamic preview generation
- Enhanced UI/UX with better feedback
- Optimized performance and accessibility

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
