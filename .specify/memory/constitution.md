<!--
Sync Impact Report:
- Version change: 1.0.0 -> 1.1.0
- Modified Principles: None
- Added sections:
  - 8. Third-Party Integrations & Performance
- Removed sections: None
- Templates requiring updates:
  - .specify/templates/plan-template.md (⚠ pending)
  - .specify/templates/spec-template.md (⚠ pending)
  - .specify/templates/tasks-template.md (⚠ pending)
-->
# DevThemes Digital Storefront Constitution

## Core Principles

### 1. Architecture Principles
- Every UI section (Header, Footer, ListingCard, Grid) MUST be built as a standalone, independently testable component before being wired into `page.tsx`.
- Components MUST communicate through explicit props only—no shared mutable state, no reaching into sibling component internals.
- All product/listing data flows one-way: `config/shop-data.ts` → typed loader → components. No component fetches or hardcodes listing data itself.
- No direct data mutation in components—listing data is treated as read-only at render time.

### 2. Technology Constraints
- Framework: Next.js (App Router) with TypeScript—no Pages Router, no JavaScript files.
- Styling: Tailwind CSS only—no inline styles except for computed/dynamic values, no CSS-in-JS libraries.
- Icons: Lucide React exclusively—no mixing icon libraries.
- Images: Next.js `<Image />` component only—no raw `<img>` tags.
- Deployment target: Vercel—avoid platform-specific APIs that don't run in Vercel's edge/node runtime.

### 3. Code Quality Standards
- No component file longer than 150 lines—extract subcomponents rather than extending.
- Every exported component, type, and utility function MUST have a TSDoc comment describing its purpose.
- Strict TypeScript: no `any`, no implicit `any`, no `// @ts-ignore` without a linked explanation comment.
- All listing data MUST conform to the `DevThemeListing` interface—no ad hoc object shapes.
- Shared design tokens (colors, spacing, fonts) live only in `tailwind.config.ts`—no magic hex codes or pixel values scattered in components.

## Design & Content Constraints

### 4. Design & Theming Requirements
- Visual identity MUST mirror `muhammad---shariq.vercel.app`: colors, fonts, and surface tones are extracted once into `tailwind.config.ts` / `globals.css` and referenced via Tailwind tokens—never re-guessed per component.
- Mobile-first responsive rules: 1 column at 320px, 2 columns at tablet, 3–4 columns at wide desktop. No layout may break or overflow at any breakpoint in between.
- Every interactive element (links, buttons, cards) MUST have a visible hover/focus state.

### 5. Content & SEO Requirements
- Every page MUST set `<title>` and `<meta name="description">` via the Next.js Metadata API—no missing or duplicate metadata across routes.
- Open Graph tags (`og:image`, `og:title`, `og:description`) are required on all shareable pages.
- Semantic HTML is mandatory: `<main>`, `<header>`, `<footer>`, `<article>`—no generic `<div>` soup for structural elements.

## Additional Standards

### 6. Security & Data Hygiene
- No Etsy API keys, tokens, or credentials in code or committed files—environment variables only, even if not currently needed.
- All external links (`etsyUrl`, `livePreviewUrl`) MUST open with `rel="noopener noreferrer"` and `target="_blank"`.
- Validate the shape of `DEV_THEMES` at build time (e.g., via a type guard or schema) so a malformed listing fails the build, not the live site.

### 7. Workflow Rules
- When a spec is ambiguous (e.g., unclear color values, missing copy), ask one clarifying question before proceeding.
- Propose three implementation options for architectural decisions (e.g., how to structure the grid, how to theme-sync), then wait for selection.
- Commit after each completed task with a message in this format: `type(scope): description` (e.g., `feat(grid): add responsive listing grid`).
- When you identify a pattern violation against this constitution, flag it explicitly rather than silently fixing or ignoring it.

### 8. Third-Party Integrations & Performance
- External Validation: Use designated services (e.g., Abstract API or Hunter.io) for real-time data validation.
- Data Storage: Authorized external integrations (e.g., Google Sheets) MUST be used for lightweight data collection.
- Performance: All real-time validations or synchronous third-party API calls MUST complete in under 1 second to ensure a frictionless user experience.

## Governance

- The Constitution supersedes all other practices.
- Amendments require documentation, approval, and a migration plan if applicable.
- All PRs/reviews must verify compliance with this Constitution.
- Versioning Policy:
  - MAJOR: Backward incompatible governance/principle removals or redefinitions.
  - MINOR: New principle/section added or materially expanded guidance.
  - PATCH: Clarifications, wording, typo fixes, non-semantic refinements.
- Complexity must always be justified.

**Version**: 1.1.0 | **Ratified**: 2026-07-15 | **Last Amended**: 2026-07-15
