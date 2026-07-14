# Phase 0: Research & Decisions

## Testing Framework
- Decision: Jest with React Testing Library
- Rationale: Standard testing framework for React and Next.js applications, aligning with the requirement for independently testable UI components.
- Alternatives considered: Vitest (faster, but Jest is more universally standard for Next.js out-of-the-box).

## Styling & Theming
- Decision: Tailwind CSS with global CSS variables in `globals.css` and `tailwind.config.ts`.
- Rationale: Required by the project constitution. Extracting tokens into configuration ensures zero hardcoded values in components.
- Alternatives considered: CSS-in-JS (rejected by constitution), CSS Modules (rejected by constitution).

## Component Architecture
- Decision: Colocate components in `src/components/ui` and layout in `src/app`.
- Rationale: Best practice for Next.js App Router. Keeps components modular and independently testable.
- Alternatives considered: `src/pages/` (Pages router rejected by constitution).
