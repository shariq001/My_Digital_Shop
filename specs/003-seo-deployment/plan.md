# Implementation Plan: SEO, Semantic Structure & Deployment

**Branch**: `003-seo-deployment` | **Date**: 2026-07-15 | **Spec**: [spec.md](file:///D:/Muhammad%20Shariq/GitHub/my-digital-shop/specs/003-seo-deployment/spec.md)

**Input**: Feature specification from `/specs/003-seo-deployment/spec.md`

## Summary

Implement Next.js Metadata API for global SEO and Open Graph tags. Audit and enforce semantic HTML across components. Finally, deploy the application to Vercel as a standalone project and link it bi-directionally with the main portfolio.

## Technical Context

**Language/Version**: TypeScript 5+ (Next.js 16 App Router)

**Primary Dependencies**: Next.js (Metadata API)

**Storage**: N/A

**Testing**: Local verification of Next.js build pipeline (`npm run build`), DOM inspection for semantic tags, social preview debuggers.

**Target Platform**: Vercel

**Project Type**: Next.js web application

**Performance Goals**: N/A

**Constraints**: Deployment must be an independent Vercel project, not a sub-project of the portfolio.

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
specs/003-seo-deployment/
├── plan.md              # This file
├── research.md          # Open Graph & Vercel Strategy
├── data-model.md        # N/A
├── quickstart.md        # Validation guide
└── tasks.md             # (generated later)
```

### Source Code (repository root)

```text
src/
├── app/
│   └── layout.tsx       # Metadata API configuration
├── components/
│   └── ui/
│       ├── Header.tsx   # Semantic updates & portfolio linking
│       ├── Footer.tsx   # Semantic updates & portfolio linking
│       ├── Grid.tsx     # Semantic updates
│       └── ListingCard.tsx # Semantic updates
```

**Structure Decision**: Metadata is centralized in `src/app/layout.tsx`. Components will be modified in-place to ensure semantic compliance.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | N/A |
