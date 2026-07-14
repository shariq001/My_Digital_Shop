# Research & Technical Decisions: SEO & Deployment

## Topic 1: Metadata API in Next.js

**Context**: Need to support global metadata that can be overridden at the route level.

**Decision**: Utilize the built-in Next.js App Router `generateMetadata` or static `metadata` export in `src/app/layout.tsx`.

**Rationale**: The `metadata` object in the root layout naturally cascades to all child routes. If individual listing pages are added later, their specific `page.tsx` can export its own `metadata` object that Next.js will automatically merge and override the global defaults.

## Topic 2: Deployment Strategy

**Context**: Must deploy to Vercel as a standalone project, linking back to the portfolio.

**Decision**: Use Vercel CLI (`vercel --prod`) for the initial manual deployment from the terminal.

**Rationale**: Since the repository might be a monorepo or already linked to the portfolio project in Vercel via GitHub, deploying via CLI allows us to explicitly define a new project name (e.g., `devthemes-store`) directly from the command line, ensuring complete isolation from the portfolio's Vercel deployment footprint.
