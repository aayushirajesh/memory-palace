# Memory Palace

A memory journaling experience designed around the idea that memories should feel discovered, not stored.

Memory Palace transforms personal reflections into floating memory gates that drift through an interactive palace of remembrance. Instead of presenting entries as a traditional list, memories exist as portals scattered across an infinite, animated memory wall, creating a more emotional and immersive way to revisit moments.

### Live Demo: https://memorypalaceapp.vercel.app/

---

## Inspiration

Most journaling applications prioritize utility and organization. Memory Palace explores a different question:

**" What if revisiting memories felt like wandering through a dreamscape rather than opening a notes app? "**

The project combines storytelling, animation, and interaction design to create an experience where users actively explore their memories instead of passively scrolling through them.

---

## Gallery

[writememory.webm](https://github.com/user-attachments/assets/f1c79a3b-d6a1-42e5-af0e-5c9b72f30dd7)

[viewsavedmemory.webm](https://github.com/user-attachments/assets/fb5dc60a-4e33-4fc6-8f7e-3dc441f6db79)

[memorywallanimation.webm](https://github.com/user-attachments/assets/61fe8bab-6ae1-48db-9691-73ca35a541e6)

---

## Highlights

* Secure authentication with email verification
* Create, store, and revisit personal memories
* Optional image attachments for visual context
* Mood tags that provide a quick emotional snapshot of each memory
* Interactive memory wall with floating memory gates
* Responsive experience across desktop and mobile devices
* Protected user data through Supabase Row Level Security (RLS)

---

## Technical Challenges Solved

### 1. Designing an Infinite Floating Memory Wall

The memory wall is built around continuously looping tracks of floating memory gates rather than a traditional grid layout. Creating the illusion of an endless space required custom positioning logic, track recycling, viewport-aware movement, and careful management of gate spacing to prevent visible gaps, overlaps, and abrupt resets during extended browsing sessions.

### 2. Animation Orchestration & Interaction Design

The experience combines drifting memory gates, hover interactions, ambient effects, page transitions, and modal states. Coordinating these layers while maintaining smooth performance required careful animation sequencing, state management, and responsive behavior across different screen sizes.

 **_The result → a locked 60fps frame rate on the memory wall, a Lighthouse Performance score of 92, and a perfect 100 on Best Practices._**
 
### 3. Translating a Concept into an Interactive Experience

A major challenge was turning the abstract idea of a 'memory palace' into an interface users could intuitively navigate. Instead of relying on conventional lists or cards, memories are explored through movement and spatial discovery, requiring iterative design decisions around navigation, visual hierarchy, and user feedback.

---

## Tech Stack

Frontend:

* React
* React Router
* Tailwind CSS
* Framer Motion

Backend & Database:

* Supabase Authentication
* PostgreSQL (Supabase)
* Row Level Security (RLS)

Deployment:

* Vercel

---

## Future Improvements

* Add ambient background
* Add custom cursor
* Search and filtering by mood
* Memory sharing through private links

---

Created by Aayushi Rajesh 🤍
