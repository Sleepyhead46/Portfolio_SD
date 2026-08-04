# Samyak Deshar — Premium Portfolio

A futuristic, black-and-grayscale personal portfolio for **Samyak Deshar**, a Data Scientist, Machine Learning Engineer, and Data Analyst.

Built with **Next.js 15, React 19, TypeScript, Tailwind CSS, Framer Motion, GSAP, Lenis, Three.js / React Three Fiber**.

## ✨ Features

- 🖤 Luxury black-and-white glassmorphism design
- 🎬 Cinematic animated loading screen
- 🎯 Custom cursor + cursor trail
- 🧊 3D floating geometric scene (React Three Fiber)
- ✨ Particle field animations
- 🖱️ Mouse-follow glow, magnetic buttons, 3D tilt cards
- 📜 Lenis smooth scrolling + GSAP scroll animations
- ⌨️ Command palette (⌘K / Ctrl+K)
- 📱 Fully responsive, mobile-first layout
- 🔍 SEO optimized (metadata, sitemap, robots, JSON-LD, Open Graph)
- 📲 PWA support (manifest + service worker)
- ♿ Accessibility + reduced-motion support

## 🛠 Tech Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 15 (App Router) |
| UI | React 19, TypeScript, Tailwind CSS, Shadcn-style components |
| Motion | Framer Motion, GSAP, Lenis |
| 3D | Three.js, React Three Fiber, Drei |
| Forms | React Hook Form + Zod |
| Icons | Lucide React |

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000).

## 📁 Project Structure

```
src/
├── app/              # App Router (layout, page, metadata, sitemap, robots, manifest)
├── components/
│   ├── navbar/       # Glassmorphism navbar
│   ├── hero/         # Hero with 3D + typing effect
│   ├── about/        # About + animated stats
│   ├── education/    # Timeline
│   ├── experience/   # Expandable timeline
│   ├── projects/     # Auto-generated project cards
│   ├── skills/       # Interactive skill dashboard
│   ├── certifications/
│   ├── contact/      # Contact form + info
│   ├── footer/
│   ├── loading/      # Cinematic loading screen
│   ├── cursor/       # Custom cursor + trail
│   ├── particles/    # Particle field
│   └── shared/       # Reusable animated components
├── data/             # JSON data sources
├── hooks/            # Custom React hooks
├── lib/              # Utilities
└── styles/           # Global styles
```

## 📨 Contact Form Setup (Supabase)

The contact form stores messages in **Supabase**. To enable it:

1. Create a free project at [supabase.com](https://supabase.com).
2. Copy the project URL and anon key from **Project Settings → API**.
3. Create a `.env.local` file (see `.env.local.example`):
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
   # Use EITHER the anon key OR the publishable key:
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   # NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_xxx
   ```
4. Run the SQL in `supabase/schema.sql` in the Supabase SQL Editor to create the `contact_messages` table.

> **Note:** A `.env.local` is already configured with your Supabase credentials. The table must be created in Supabase by running the SQL in `supabase/schema.sql` (Dashboard → SQL Editor → New query → paste → Run) for the contact form to store messages.

The form tries the server API route (`/api/contact`) first — works on Vercel/Node deploys. On static hosts (GitHub Pages) it falls back to inserting directly into Supabase from the client, so the form always works.

## 🚀 Deployment

### Vercel (recommended — full functionality)
1. Push this repo to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new).
3. Add the environment variables (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`).
4. Deploy. The API route and all features work automatically.

### GitHub Actions auto-deploy
A workflow at `.github/workflows/deploy.yml` deploys to Vercel on every push to `main`. Configure the repo secrets:
- `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`
- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### GitHub Pages (static)
1. Set `output: "export"` in `next.config.ts` (disables the API route — the form still works via direct Supabase insert).
2. Push to GitHub and enable Pages from the `out` directory (or use a Pages action).

## 📨 Contact

- **Email:** sdeshar9803@gmail.com
- **Phone:** +977 9847903839
- **LinkedIn:** [linkedin.com/in/samyak-deshar-081917279](https://www.linkedin.com/in/samyak-deshar-081917279/)

---

© 2026 Samyak Deshar. Built with Next.js, TypeScript, Tailwind CSS, and passion for data.
