# Tasks: Data Layer & Core Components

**Input**: Design documents from `/specs/002-data-layer-components/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, quickstart.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Install `zod` dependency

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- (No additional blocking foundational tasks beyond Zod installation)

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Developer Adds a Listing (Priority: P1) 🎯 MVP

**Goal**: Establish the centralized data configuration layer with build-time schema validation.

**Independent Test**: Can be tested by running `npm run build` with valid data (passes) and intentionally malformed data (fails).

### Implementation for User Story 1

- [x] T002 [US1] Create Zod schema `DevThemeSchema` and export `DEV_THEMES` array in `src/config/shop-data.ts`

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently via build command.

---

## Phase 4: User Story 3 - User Interacts with Listing Cards (Priority: P1)

**Goal**: Build the individual product card component with primary/secondary CTAs and hover states.

**Independent Test**: Can be tested by rendering a single `ListingCard` in isolation and verifying visual hierarchy and button attributes.

### Implementation for User Story 3

- [x] T003 [US3] Create `ListingCard` component supporting Image, title, description, and themed tags in `src/components/ui/ListingCard.tsx`
- [x] T004 [US3] Add primary ("Get on Etsy") and secondary ("Live Preview") CTA buttons with secure `target="_blank"` attributes to `ListingCard` in `src/components/ui/ListingCard.tsx`
- [x] T005 [US3] Add CSS truncation (e.g., `line-clamp`) to title and description in `ListingCard` to preserve height in `src/components/ui/ListingCard.tsx`

**Checkpoint**: At this point, User Story 3 should be fully functional and testable independently.

---

## Phase 5: User Story 2 - User Browses the Grid (Priority: P1)

**Goal**: Wire the Grid component to the centralized configuration data and handle empty states.

**Independent Test**: Can be tested by viewing the application and observing the grid dynamically rendering all items from `DEV_THEMES`.

### Implementation for User Story 2

- [x] T006 [US2] Update `Grid` component to import `DEV_THEMES` and map over it to render `ListingCard`s in `src/components/ui/Grid.tsx`
- [x] T007 [US2] Implement empty state message ("No listings yet") in `Grid` when `DEV_THEMES` array is empty in `src/components/ui/Grid.tsx`

**Checkpoint**: At this point, User Story 2 should be fully functional and testable independently.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T008 Run quickstart.md validation scenarios to verify hot-reloading, build-time fail-fast mechanism, and empty state behaviors.

---

## Dependencies & Execution Order

### Phase Dependencies
- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion
- **User Stories**: 
  - US1 (Config) depends on Setup (Zod).
  - US3 (ListingCard) depends on US1 (needs the DevThemeListing type).
  - US2 (Grid) depends on US1 (data) and US3 (ListingCard component).
- **Polish (Final Phase)**: Depends on all user stories being complete.

### Parallel Opportunities
- Zod installation (T001) is blocking everything. Once completed, US1 can commence.

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 3: User Story 1
3. **STOP and VALIDATE**: Verify build fails with bad data.
4. Proceed to US3, then US2.

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Verify tests fail before implementing
- Stop at any checkpoint to validate story independently
