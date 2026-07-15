# Tasks: Email Verification

**Input**: Design documents from `/specs/004-email-verification/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 [P] Install `googleapis` dependency in `package.json`
- [X] T002 [P] Create or update `.env.local` with placeholder variables for Abstract API and Google Sheets

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T003 [P] Implement `src/lib/abstract-api.ts` to wrap Abstract API email validation fetch call
- [X] T004 [P] Implement `src/lib/google-sheets.ts` to handle authentication and appending rows via `googleapis`

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Instant Promo Code for Valid Email (Priority: P1) 🎯 MVP

**Goal**: Users can enter their email to seamlessly receive a 10% discount promo code.

**Independent Test**: Can be fully tested by submitting an email and observing the promo code appearance without a page reload.

### Implementation for User Story 1

- [X] T005 [P] [US1] Create standalone UI component `src/components/feature/promo-email-form.tsx` with basic form state
- [X] T006 [P] [US1] Create Server Action `src/app/api/actions/email-subscribe.ts` (implement basic success response and Google Sheets logging)
- [X] T007 [US1] Connect `promo-email-form.tsx` to `email-subscribe.ts` Server Action
- [X] T008 [US1] Wire component into `src/app/page.tsx`
- [X] T009 [US1] Verify semantic HTML usage and Tailwind CSS states inside `promo-email-form.tsx`

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Prevent Invalid Emails (Priority: P1)

**Goal**: The system must block invalid, fake, or typo-filled emails.

**Independent Test**: Can be tested by attempting to submit fake domains or typos and verifying the inline error appears.

### Implementation for User Story 2

- [X] T010 [US2] Integrate `abstract-api.ts` into `src/app/api/actions/email-subscribe.ts` Server Action to reject invalid emails
- [X] T011 [US2] Update `src/components/feature/promo-email-form.tsx` to display inline error message from the Server Action response

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [X] T012 Run manual validation following `quickstart.md` scenarios
- [X] T013 Ensure TSDoc comments are complete in `email-subscribe.ts` and `promo-email-form.tsx`
- [X] T014 Verify UI looks visually premium with micro-animations

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2)
- **User Story 2 (P1)**: Depends on User Story 1 UI components existing

### Parallel Opportunities

- T001 and T002 can run in parallel.
- T003 and T004 can run in parallel.
- T005 and T006 can run in parallel.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → MVP!
3. Add User Story 2 → Test independently → Secure from spam!
