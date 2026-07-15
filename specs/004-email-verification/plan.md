# Implementation Plan: Email Verification

**Branch**: `[004-email-verification]` | **Date**: 2026-07-15 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/004-email-verification/spec.md`

## Summary

Implement an email verification feature to capture high-quality leads in exchange for a 10% discount promo code. We will use Next.js Server Actions to securely validate emails via Abstract API and log them to Google Sheets, ensuring real-time response (< 1s) and frictionless UX (no page reload).

## Technical Context

**Language/Version**: TypeScript 5+

**Primary Dependencies**: Next.js (App Router), React, Tailwind CSS, Lucide React, `googleapis` (for Google Sheets), `abstract-email-validation` or standard `fetch` to Abstract API.

**Storage**: Google Sheets API (External Data Store)

**Testing**: N/A (Manual testing based on project defaults)

**Target Platform**: Vercel (Edge/Node Serverless Functions)

**Project Type**: Next.js Web App Feature

**Performance Goals**: < 1s response time for API validation and Google Sheet logging.

**Constraints**: No page reload (frictionless UX), securely store API keys in environment variables.

**Scale/Scope**: Email Form UI Component + Next.js Server Action + 2 External API calls (Abstract API, Google Sheets).

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] Next.js (App Router) + TypeScript + Tailwind CSS being used exclusively?
- [x] No direct data fetching in components (read-only from typed loader)? *(N/A for form submission mutations, but applies to data loading)*
- [x] Standalone, independently testable UI components (under 150 lines)?
- [x] TSDoc comments present for all exported components/types?
- [x] Strict TypeScript (no implicit `any`, type guards for `DEV_THEMES`)?

## Project Structure

### Documentation (this feature)

```text
specs/004-email-verification/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
└── tasks.md             # Phase 2 output
```

### Source Code (repository root)

```text
src/
├── app/
│   └── api/
│       └── actions/
│           └── email-subscribe.ts  # Server Action for form submission
├── components/
│   └── feature/
│       └── promo-email-form.tsx    # Standalone client component
├── lib/
│   ├── abstract-api.ts             # Abstract API integration logic
│   └── google-sheets.ts            # Google Sheets integration logic
```

**Structure Decision**: 
The form UI (`promo-email-form.tsx`) will be a Client Component using React state to manage idle/submitting/success/error states without reloading the page. The submission handler will invoke a Server Action (`email-subscribe.ts`) to securely execute the Abstract API validation and Google Sheets logging without exposing API keys to the browser. Extracted API logic to `lib/` to keep Server Actions clean.
