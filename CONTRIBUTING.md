# Contributing to Memory Palace

Thank you for contributing to Memory Palace!

Memory Palace is an open-source memory journaling app that turns personal reflections into an animated, explorable memory wall instead of a traditional list. The project is beginner-friendly and welcomes all open-source contributors.

Whether you're fixing bugs, improving documentation, refining animations, or implementing new features, every contribution helps make this project better.

---

# Before You Start

Before contributing, please:

- Read the README.md
- Read the CODE_OF_CONDUCT.md
- Check existing Issues before creating a new one
- Comment on an issue before starting work
- Wait until a maintainer assigns the issue
- Keep pull requests focused on a single issue
- Follow the project's coding standards

---

# Good First Contribution Areas

New contributors can start with:

- Documentation improvements
- Implementing stub components (`AmbientBackground`, `CustomCursor`)
- UI consistency fixes
- Responsive design improvements
- Accessibility improvements
- Loading and empty states
- Form validation
- Bug fixes

Look for labels such as:

- good first issue
- frontend
- documentation
- accessibility
- enhancement
- help wanted

---

# Tech Stack

## Frontend

- React 19
- Vite
- React Router 7
- Tailwind CSS v4
- Framer Motion
- Zustand

## Backend

- Supabase (Auth + Postgres)
- Row Level Security (RLS)

## Deployment

- Vercel

---

# Local Setup

## Prerequisites

- Node.js 18+
- npm
- Git
- A Supabase project (URL + publishable key)

Clone the repository

```bash
git clone https://github.com/aayushirajesh/memory-palace.git
cd memory-palace
```

Install and configure

```bash
npm install
cp .env.example .env
```

Add your Supabase credentials to `.env`, then run:

```bash
npm run dev
```

---

# Project Structure

```
memory-palace/
├── src/
│ ├── animations/
│ ├── assets/
│ ├── components/
│ ├── context/
│ ├── hooks/
│ ├── layouts/
│ ├── pages/
│ ├── services/
│ └── utils/
│ └── App.jsx
│ └── index.css
│ └── main.jsx
├── .env.example
├── eslint.config.js
├── package.json
├── index.html
└── vite.config.js
```

---

# Development Workflow

1. Fork the repository.
2. Create a branch.

Example:
```
feature/ambient-background
fix/mobile-editor-overflow
docs/env-setup-fix
```
3. Make your changes.
4. Test your changes locally (`npm run dev`).
5. Commit using Conventional Commits.
6. Push your branch.
7. Open a Pull Request.

---

# Pull Request Guidelines

Every PR should include:

- Clear description
- Linked issue

Example

```
Closes #6
```

Include

- Screenshots or a short screen recording for UI/animation changes
- Notes on anything you weren't sure about

Keep pull requests small and reviewable.

---

# Commit Message Convention

Use Conventional Commits.

Examples
```
feat(components): implement ambient background
fix(readme): correct supabase env variable name
docs(contributing): add setup instructions
refactor(memory-editor): simplify animation stage array
```
Allowed commit types

- feat
- fix
- docs
- style
- refactor
- test
- chore

---

# Testing

```bash
npm run lint
npm run build
```

Please ensure:

- No ESLint errors
- Build succeeds
- Existing functionality is not broken
- No console errors on `npm run dev`

---

# Coding Guidelines

- Functional components with hooks — no class components
- Tailwind utility classes for styling; avoid inline `style={{}}` unless the value is computed at runtime (e.g. animation positions)
- Keep Supabase calls inside `src/services/` — components should call `authService.js` / `memoryService.js`, not `supabase` directly
- Follow the existing Framer Motion pattern (see `MemoryEditor.jsx`'s `ANIMATION_STAGES` array + `useAnimationSequence` hook) before introducing a new animation approach elsewhere

---

# Accessibility

All new UI should:

- Support keyboard navigation
- Include ARIA labels where relevant
- Use semantic HTML
- Maintain readable color contrast
- Display visible focus states

---

# Documentation

If your PR changes setup steps, environment variables, or folder structure, please update the README and this file accordingly.

---

# Issue Assignment Policy

- Comment before starting work.
- Wait until a maintainer assigns the issue.
- Do not submit PRs for unassigned issues.
- Inactive issues may be reassigned after a reasonable period.

---

# Code Review

Maintainers will review:

- Code quality
- Performance (especially on animation-heavy components)
- Accessibility
- Responsiveness
- Documentation

Requested changes should be addressed in the same pull request.

---

# What Not To Commit

Do **not** commit:

```
node_modules/
dist/
.env
.env.*
.vscode/
.idea/
*.log
```

Generated and environment files should remain ignored by Git.

---

# Need Help?

If you need assistance:

- Ask your question in the GitHub Issue.
- Use Pull Request comments for implementation discussions.
- Be respectful and constructive when interacting with other contributors.

---

# Thank You

Thank you for contributing to Memory Palace.

Every contribution — big or small — helps build a better project.