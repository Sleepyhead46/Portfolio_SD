# Samyak Deshar Portfolio

Personal portfolio website of **Samyak Deshar** — Data Scientist, Machine Learning Engineer, and Data Analyst.

The website showcases my projects, technical skills, education, and experience in data science, machine learning, analytics, and software development.

## Features

- Clean black-and-grayscale design
- Smooth page transitions and animations
- Interactive hero section
- Responsive layout for desktop, tablet, and mobile devices
- Project showcase with detailed descriptions
- Skills dashboard
- Education and experience timeline
- Contact form integration
- SEO optimization
- Progressive Web App (PWA) support
- Accessibility and reduced-motion support

## Tech Stack

| Category | Technologies |
| --- | --- |
| Framework | Next.js 15 |
| Frontend | React 19, TypeScript, Tailwind CSS |
| Animation | Framer Motion, Lenis |
| 3D Graphics | Three.js, React Three Fiber |
| Forms | React Hook Form, Zod |
| Icons | Lucide React |

## Getting Started

Clone the repository:

```bash
git clone https://github.com/Sleepyhead46/Portfolio_SD.git
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Run the production build:

```bash
npm start
```

Open:

```text
http://localhost:3000
```

## Project Structure

```text
src/
├── app/
├── components/
├── data/
├── hooks/
├── lib/
└── styles/
```

### Components

```text
components/
├── navbar/
├── hero/
├── about/
├── education/
├── experience/
├── projects/
├── skills/
├── certifications/
├── contact/
├── footer/
└── shared/
```

## Contact Form & Supabase Setup

This project uses Supabase to securely store messages submitted through the contact form.

Create a `.env.local` file:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

1. Copy the project URL and API key from Supabase (`Settings -> API`).
2. Add values to `.env.local` (or GitHub repository secrets for production).
3. Run the SQL statements inside `supabase/schema.sql` in your Supabase SQL Editor.

## Supabase Keep-Alive & Health-Check System

Free-tier Supabase projects automatically pause after 7 days of inactivity. To prevent downtime without exposing credentials in client-side code:

1. **Scheduled GitHub Actions Workflow** (`.github/workflows/supabase-keepalive.yml`):
   - Automatically runs twice weekly (Monday and Thursday at 04:00 UTC) and supports manual triggers (`workflow_dispatch`).
   - In your GitHub repository, go to **Settings** → **Secrets and variables** → **Actions** and add:
     - `SUPABASE_URL`: Your project URL (e.g. `https://xxx.supabase.co`)
     - `SUPABASE_ANON_KEY`: Your Supabase anon or publishable key
   - Executes `node scripts/supabase-keepalive.mjs` server-side to ping the database and keep it warm.

2. **Server Health Endpoint** (`/api/health`):
   - Returns live Supabase connectivity status and latency:
     ```json
     {
       "status": "healthy",
       "database": "connected",
       "messageCount": 0,
       "latencyMs": 142,
       "timestamp": "2026-09-10T06:30:00.000Z"
     }
     ```
   - Can be connected to free monitoring services (e.g., BetterStack, UptimeRobot).

## Deployment

The project can be deployed on any platform that supports Next.js.

### Build

```bash
npm run build
```

### Export static files (optional)

```bash
npm run export
```

Supported hosting platforms:

- Cloudflare Pages
- GitHub Pages
- Netlify
- VPS or self-hosted servers

## Contact

**Email:** sdeshar9803@gmail.com

**LinkedIn:** https://www.linkedin.com/in/samyak-deshar-081917279/

---

© 2026 Samyak Deshar

Built with Next.js, TypeScript, and a passion for data.
