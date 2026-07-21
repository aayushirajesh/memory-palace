<h1 align="center"> Memory Palace </h1>

<p align="center">A memory journaling experience designed around the idea that memories should feel discovered, not stored.</p>

<p align="center">Memory Palace transforms personal reflections into floating memory gates that drift through an interactive palace of remembrance. Instead of presenting entries as a traditional list, memories exist as portals scattered across an infinite, animated memory wall, creating a more emotional and immersive way to revisit moments.</p>

<p align="center">

<img src="https://img.shields.io/github/license/aayushirajesh/memory-palace?style=for-the-badge">

<img src="https://img.shields.io/github/stars/aayushirajesh/memory-palace?style=for-the-badge">

<img src="https://img.shields.io/github/forks/aayushirajesh/memory-palace?style=for-the-badge">

<img src="https://img.shields.io/github/issues/aayushirajesh/memory-palace?style=for-the-badge">

<img src="https://img.shields.io/github/issues-pr/aayushirajesh/memory-palace?style=for-the-badge">

<img src="https://img.shields.io/github/contributors/aayushirajesh/memory-palace?style=for-the-badge">

</p>

<h4 align="center"> Website: https://memorypalaceapp.vercel.app/ </h4>

---

## Inspiration

Most journaling applications prioritize utility and organization. Memory Palace explores a different question:

**" What if revisiting memories felt like wandering through a dreamscape rather than opening a notes app? "**

The project combines storytelling, animation, and interaction design to create an experience where users actively explore their memories instead of passively scrolling through them.

---

## What This Project Does

- Presents a journaling experience where memories are discovered via an animated, infinite memory wall.
- Lets authenticated users create, attach images to, tag with mood, and revisit personal memories.
- Stores data using Supabase (Auth + Postgres) and is built for deployment on Vercel.

## Why It’s Useful

- Encourages exploration and emotional engagement through spatial UI and animations.
- Simple, secure auth flows using Supabase.
- Modular frontend with components for animation, scene management, and memory CRUD operations.

## Key Features

- Email-based authentication (Supabase)
- Create / Read / Delete memories with optional images
- Mood tags and timestamps
- Responsive animations (Framer Motion + custom tracks)
- Protected routes for authenticated content

---

## Gallery

[writememory.webm](https://github.com/user-attachments/assets/f1c79a3b-d6a1-42e5-af0e-5c9b72f30dd7)

[viewsavedmemory.webm](https://github.com/user-attachments/assets/fb5dc60a-4e33-4fc6-8f7e-3dc441f6db79)

[memorywallanimation.webm](https://github.com/user-attachments/assets/61fe8bab-6ae1-48db-9691-73ca35a541e6)

---

## Project Structure

```
memory-palace/
├── src/
│   ├── animations/
│   │   └── transitions.js
│   ├── assets/
│   │   └── door.png
│   ├── components/
│   │   ├── AmbientBackground.jsx
│   │   ├── CustomCursor.jsx
│   │   ├── FloatingDoor.jsx
│   │   ├── Footer.jsx
│   │   ├── MemoryEditor.jsx
│   │   ├── MemoryViewer.jsx
│   │   ├── Navbar.jsx
│   │   ├── PalaceScene.jsx
│   │   └── ProtectedRoute.jsx
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── hooks/
│   │   └── useFloatingAnimation.js
│   ├── layouts/
│   │   ├── AuthLayout.jsx
│   │   └── PalaceLayout.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── MemoryPage.jsx
│   │   ├── MemoryWall.jsx
│   │   └── WriteMemory.jsx
│   ├── services/
│   │   ├── authService.js
│   │   ├── memoryService.js
│   │   └── supabase.js
│   ├── utils/
│   │   └── generateDoorPosition.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── .env.example
├── eslint.config.js
├── index.html
├── package.json
├── vercel.json
├── vite.config.js
├── README.md
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
└── SECURITY.md
```

## Tech Stack
| Layer | Technology |
|--------|------------|
| Frontend | React 19 |
| Routing | React Router 7 |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion |
| State | Zustand |
| Backend | Supabase (Auth + Postgres) |
| Security | Row Level Security (RLS) |
| Build Tool | Vite |
| Linting | ESLint (flat config) |
| Deployment | Vercel |

---

## Getting Started (Developer)

Prerequisites:

- Node.js 18+ and npm
- A Supabase project (URL + anon/publishable key)

Quick start:

```bash
git clone https://github.com/aayushirajesh/memory-palace.git
cd memory-palace
npm install
npm run dev
```

Environment:

1. Copy the example environment file:

```bash
cp .env.example .env
```

2. Edit `.env` and add your Supabase values (see `.env.example`):

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key 
```

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

---

## Supabase Setup Notes

- Table name: `memories` (used in `src/services/memoryService.js`). Ensure your Supabase schema includes expected columns: `id`, `user_id`, `title`, `content`, `mood`, `image_url`, `created_at`.
- Enable Row Level Security so each user can only access their own rows. The frontend uses the authenticated user's `user.id` when inserting records.


---

## Where To Get Help

- Report issues or ask questions using GitHub Issues: https://github.com/aayushirajesh/memory-palace/issues
- For feature discussions or design questions, open an issue tagged `discussion`.

---

## Contributing

Contributions from developers of all experience levels are welcome.

Please read **CONTRIBUTING.md** before creating a Pull Request.

### Contribution Workflow

```bash
git checkout -b feat/feature-name
git commit -m "feat: add feature"
git push origin feat/feature-name

or

git checkout -b fix/fix-name
git commit -m "fix: fix description"
git push origin fix/fix-name
```

Please ensure:

- Code follows existing style
- No breaking changes
- Documentation is updated
- Build passes successfully
- Pull Requests remain focused

---

## Security

If you discover a security vulnerability, please **do not** create a public issue.

Instead, report it privately by following the instructions in **SECURITY.md**.

---

## Code of Conduct

Please read our **CODE_OF_CONDUCT.md** before participating.

We are committed to creating a welcoming, inclusive, and respectful community.

---

## License

Distributed under the **MIT License**.

See **LICENSE** for more information.

---

## Support the Project

If you find Memory Palace useful or enjoyed contributing to it, consider leaving a ⭐ on the repository. Every star helps the project reach more people.

---

## Maintainers

- Primary: Aayushi Rajesh (original author)

If you'd like to be listed as a contributor or maintainer, open a pull request to update this file.

---

Made with ❤️
