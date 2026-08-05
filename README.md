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
git clone <repository-url>
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

## Contact Form Setup

This project uses Supabase to store messages submitted through the contact form.

Create a `.env.local` file:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

After creating your Supabase project:

1. Copy the project URL.
2. Copy the API key.
3. Add the values to `.env.local`.
4. Run the SQL file inside `supabase/schema.sql`.

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
