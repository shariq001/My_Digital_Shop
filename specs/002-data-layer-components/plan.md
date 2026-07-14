# Implementation Plan: Data Layer & Core Components

**Branch**: `002-data-layer-components` | **Date**: 2026-07-15 | **Spec**: [spec.md](file:///D:/Muhammad%20Shariq/GitHub/my-digital-shop/specs/002-data-layer-components/spec.md)

**Input**: Feature specification from `/specs/002-data-layer-components/spec.md`

## Summary

Build a centralized, static configuration layer (`config/shop-data.ts`) to manage product listings. Implement a `ListingCard` component and integrate it into a responsive Grid, allowing content to be managed exclusively through data without UI modifications. Use a schema validation library (Zod) at build/runtime to ensure data integrity.

## Technical Context

**Language/Version**: TypeScript 5+ (Next.js 16 App Router)

**Primary Dependencies**: Next.js, React, Tailwind CSS v4, Lucide React, Zod (for lightweight schema validation)

**Storage**: Static configuration file (`src/config/shop-data.ts`)

**Testing**: Local verification of Next.js build pipeline (`npm run build`)

**Target Platform**: Vercel

**Project Type**: Next.js web application

**Performance Goals**: Instant page loads (static generation), optimized images via `next/image`

**Constraints**: Build process must fail explicitly if the configuration array contains malformed objects.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] Next.js (App Router) + TypeScript + Tailwind CSS being used exclusively?
- [x] No direct data fetching in components (read-only from typed loader)?
- [x] Standalone, independently testable UI components (under 150 lines)?
- [x] TSDoc comments present for all exported components/types?
- [x] Strict TypeScript (no implicit `any`, type guards for `DEV_THEMES`)?

## Project Structure

### Documentation (this feature)

```text
specs/002-data-layer-components/
├── plan.md              # This file
├── research.md          # Zod vs Custom Type Guards
├── data-model.md        # DevThemeListing schema
├── quickstart.md        # Validation guide
└── tasks.md             # (generated later)
```

### Source Code (repository root)

```text
src/
├── app/
│   └── page.tsx
├── components/
│   └── ui/
│       ├── Grid.tsx
│       └── ListingCard.tsx
└── config/
    └── shop-data.ts
```

**Structure Decision**: Added `ListingCard.tsx` as a standalone UI component. The configuration resides in `src/config/shop-data.ts` to separate the data layer from the UI components.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | N/A |
