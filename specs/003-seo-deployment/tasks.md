# Tasks: SEO, Semantic Structure & Deployment

**Input**: Design documents from `/specs/003-seo-deployment/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, quickstart.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- (No setup tasks required. Next.js Metadata API is built-in).

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T001 Generate or download a placeholder Open Graph image and save it to `public/og-image.jpg`

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Link Sharing on Social Platforms (Priority: P1) 🎯 MVP

**Goal**: Implement global metadata so social shares render rich preview cards.

**Independent Test**: Can be tested by running the dev server and inspecting the `<head>` DOM for correctly populated `meta` tags.

### Implementation for User Story 1

- [ ] T002 [US1] Update `src/app/layout.tsx` to export a strongly-typed `Metadata` object containing the global title, description, and `openGraph` properties referencing `/og-image.jpg`.

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently.

---

## Phase 4: User Story 2 - Search Engine Indexing (Priority: P1)

**Goal**: Ensure strict semantic HTML markup is used across the application.

**Independent Test**: Can be tested via Lighthouse or manual DOM inspection confirming semantic tags (`<main>`, `<header>`, `<footer>`, `<article>`, `<h1>`).

### Implementation for User Story 2

- [x] T003 [P] [US2] Update `src/app/layout.tsx` to ensure `children` are wrapped in a semantic `<main>` tag.
- [x] T004 [P] [US2] Update `src/app/page.tsx` to include a primary `<h1>` tag (visually hidden or styled as a hero) to satisfy heading hierarchy rules.
- [x] T005 [P] [US2] Audit and update `src/components/ui/Header.tsx` and `src/components/ui/Footer.tsx` to strictly use `<header>` and `<footer>` containers.

**Checkpoint**: At this point, User Story 2 should be fully functional and testable independently.

---

## Phase 5: User Story 3 - Cross-Navigation from Portfolio (Priority: P2)

**Goal**: Link the storefront back to the main portfolio.

**Independent Test**: Can be tested by clicking the links in the browser and verifying successful, secure navigation.

### Implementation for User Story 3

- [x] T006 [P] [US3] Update `src/components/ui/Header.tsx` to ensure the portfolio link explicitly and securely points to `https://muhammad---shariq.vercel.app`.
- [x] T007 [P] [US3] Update `src/components/ui/Footer.tsx` to include explicit portfolio navigation links.

**Checkpoint**: At this point, User Story 3 should be fully functional and testable independently.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T008 Execute `npm run build` to verify Next.js compiles all semantic and metadata changes without type errors.
- [x] T009 Execute `npx vercel --prod` to deploy the standalone project to Vercel (may require user interaction for CLI login).

---

## Dependencies & Execution Order

### Phase Dependencies
- **Setup (Phase 1)**: N/A
- **Foundational (Phase 2)**: Can start immediately.
- **User Stories**: 
  - US1 (Metadata) depends on Phase 2 (needs the OG image).
  - US2 (Semantics) can run in parallel with US1.
  - US3 (Navigation) can run in parallel with US1 and US2.
- **Polish (Final Phase)**: Depends on all user stories being complete.

### Parallel Opportunities
- T003, T004, T005, T006, and T007 can all be executed in parallel as they touch independent files or discrete sections of code.

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 2: Foundational (OG Image)
2. Complete Phase 3: User Story 1 (Metadata)
3. **STOP and VALIDATE**: Verify metadata exists in DOM.
4. Proceed to US2, then US3, and finally Deployment (Phase 6).

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Verify tests fail before implementing
- Stop at any checkpoint to validate story independently
