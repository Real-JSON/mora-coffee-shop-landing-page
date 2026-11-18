# MŌRA — The Art of Every Pour

A standalone, responsive specialty-coffee-house marketing website built with Next.js App Router, React, TypeScript and Tailwind CSS 4.

## Requirements

- Node.js 20.9 or newer (Node.js 22 LTS is recommended)
- npm

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Quality checks

```bash
npm run lint
npm run typecheck
npm run build
npm start
```

## Project structure

```text
src/
  app/                 App Router pages, metadata and global CSS
    menu/
    our-story/
    contact/
  components/
    layout/             Shared header and footer
    sections/           Homepage sections
    ui/                 Reusable presentation components
  data/                  Editable product and testimonial content
```

## Where to customize

- Brand colours, typography, spacing and responsive rules: `src/app/globals.css`
- Homepage order: `src/app/page.tsx`
- Header links and mobile navigation: `src/components/layout/Header.tsx`
- Coffee products: `src/data/products.ts`
- Testimonials: `src/data/testimonials.ts`
- Page-specific content: `src/app/menu`, `src/app/our-story`, `src/app/contact`

## Dependencies and why they are included

### Runtime
- `next`: routing, server rendering, metadata, image optimization and production server.
- `react`, `react-dom`: component UI and rendering.

### Development
- `tailwindcss`, `@tailwindcss/postcss`, `postcss`: Tailwind CSS 4 compilation.
- `typescript`, `@types/*`: static type checking.
- `eslint`, `eslint-config-next`: code quality checks.

No animation library, icon library, form library, state manager, HTTP client, database driver or UI component framework is installed initially. The current design uses CSS for subtle transitions and native links. GSAP can be added later if a specific animation has a clear design purpose.

## Images

The concept uses remote Unsplash image URLs for visual placeholders. The domain is explicitly allowed in `next.config.ts` for Next Image optimization. Replace these with properly licensed, brand-owned or client-approved images before commercial launch. Check image licensing and availability; remote image URLs are not guaranteed permanent.

## Important concept placeholders

The product names, prices, testimonials, email address and location are sample concept content. Replace them with verified MŌRA business information before publishing. No ordering, payment or contact-form submission backend is implemented.

## Security notes

- No secrets or API keys are required for this frontend.
- Never commit `.env` files containing secrets.
- Do not put private keys in `NEXT_PUBLIC_*` variables.
- Validate any future form input on the server.
- Before accepting real orders or payments, add a properly secured backend and payment provider integration.
- Keep dependencies updated and review `npm audit` output before deployment.

## Image and performance notes

- `next/image` is used for responsive image sizing and modern image formats.
- The main hero image is prioritized; supporting images use lazy loading by default.
- Keep image dimensions/aspect ratios stable to reduce layout shift.
- The design respects `prefers-reduced-motion`.
- Test production builds and real mobile devices before launch.

## Deploy

Push the project to GitHub and import the repository into Vercel. Use the default Next.js deployment settings. Add a custom domain when the project is ready.

## Future animation setup

When a specific animation is approved, add GSAP intentionally:

```bash
npm install gsap
```

Then import only the required modules, such as `gsap` and `gsap/ScrollTrigger`, in a client component. Do not animate every section by default; preserve keyboard access, natural scrolling and reduced-motion preferences.
