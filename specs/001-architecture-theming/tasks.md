# Tasks: Architecture & Theming

**Input**: Design documents from `/specs/001-architecture-theming/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, quickstart.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Initialize Next.js App Router project with TypeScript and Tailwind CSS in root directory
- [x] T002 [P] Install lucide-react dependency
- [x] T003 [P] Configure strict TypeScript rules in `tsconfig.json`
- [x] T004 [P] Scaffold required directory structure (`src/components/ui`, `src/types`, `src/config`)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T005 Update `src/app/globals.css` with background, text, and base styles
- [x] T006 Update `tailwind.config.ts` (or globals.css for v4) with ThemeTokens (colors.background, colors.accent, surface tones, fonts) based on portfolio

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Storefront Initialization & Navigation (Priority: P1) 🎯 MVP

**Goal**: Establish the base layout structure and visual identity so products can be meaningfully displayed.

**Independent Test**: Can be fully tested by launching the web application locally and verifying that the header, footer, and a placeholder responsive grid display correctly with the proper colors, fonts, and responsive behaviors at various screen sizes.

### Implementation for User Story 1

- [x] T007 [P] [US1] Create Header component with backdrop-blur and portfolio link in `src/components/ui/Header.tsx`
- [x] T008 [P] [US1] Create Footer component with Etsy and portfolio links in `src/components/ui/Footer.tsx`
- [x] T009 [P] [US1] Create Grid skeleton component (1 col to 4 col) in `src/components/ui/Grid.tsx`
- [x] T010 [US1] Update root layout to use semantic HTML and include Header/Footer in `src/app/layout.tsx`
- [x] T011 [US1] Update main page to render placeholder Grid in `src/app/page.tsx`
- [x] T012 [US1] Add visible hover/focus states to interactive elements in `src/components/ui/Header.tsx` and `src/components/ui/Footer.tsx`

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T013 Verify no horizontal scrolling exists at any breakpoint from 320px up to desktop
- [x] T014 Run quickstart.md validation scenarios to verify correct visual token usage and layout behaviors

---

## Dependencies & Execution Order

### Phase Dependencies
- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies
- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories

### Within Each User Story
- Components before layout integration

### Parallel Opportunities
- All Setup tasks marked [P] can run in parallel
- All UI component creation (Header, Footer, Grid) in US1 marked [P] can run in parallel

---

## Parallel Example: User Story 1

```bash
# Launch all components for User Story 1 together:
Task: "Create Header component in src/components/ui/Header.tsx"
Task: "Create Footer component in src/components/ui/Footer.tsx"
Task: "Create Grid skeleton component in src/components/ui/Grid.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Stop at any checkpoint to validate story independently
