---
description: "Task list for Vercel/Next build error fixes"
---

# Tasks: Vercel/Next Build Error Fixes

**Input**: Design documents from `/specs/001-social-login/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: The examples below include test tasks. Tests are OPTIONAL - only include them if explicitly requested in the feature specification.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root
- **Web app**: `frontend/src/`
- **Mobile**: `api/src/`, `ios/src/` or `android/src/`
- Paths shown below assume single project - adjust based on plan.md structure

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Fix next.config.ts experimental.serverActions error
- [X] T002 Update images config to use remotePatterns instead of domains

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T003 Fix cookies() async usage in frontend/src/app/api/auth/callback/route.ts
- [X] T004 Fix cookies() async usage in frontend/src/app/api/auth/google/route.ts
- [X] T005 Fix cookies() async usage in frontend/src/app/api/auth/facebook/route.ts

**Checkpoint**: Foundation ready - build should now pass

---

## Phase 3: Verification (Priority: P1) 🎯 MVP

**Goal**: Verify that `npm run build` completes successfully with no TypeScript errors

**Independent Test**: Can be fully tested by running `npm run build` from the frontend directory and confirming it completes without errors.

### Implementation for User Story 1

- [X] T006 Run npm install in frontend directory
- [X] T007 Run npm run build to verify TypeScript passes
- [X] T008 Verify all API routes compile correctly
- [X] T009 Confirm no warnings related to cookies or experimental features

**Checkpoint**: At this point, the build should be fully functional

---

## Phase 4: Git Operations (Priority: P2)

**Goal**: Commit and push the fixes to main branch

**Independent Test**: Can be fully tested by checking that changes are committed and pushed to the repository.

### Implementation for User Story 2

- [X] T010 Commit changes with message "fix: vercel build (cookies async + next config)"
- [X] T011 Push changes to origin main

**Checkpoint**: At this point, all fixes should be committed and pushed

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [X] T012 Verify build passes after all changes
- [X] T013 Confirm no new warnings or errors introduced
- [X] T014 Document all changes made for future reference

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS verification
- **Verification (Phase 3)**: Depends on Foundational phase completion
- **Git Operations (Phase 4)**: Depends on Verification completion
- **Polish (Final Phase)**: Depends on all previous phases

### Within Each User Story

- Setup before Foundational
- Foundational before Verification
- Verification before Git Operations
- Git Operations before Polish

---

## Implementation Strategy

### MVP First (Build Fix Only)

1. Complete Phase 1: Setup (fix config issues)
2. Complete Phase 2: Foundational (fix cookies issues)
3. Complete Phase 3: Verification (test build)
4. Complete Phase 4: Git Operations (commit and push)
5. Complete Phase 5: Polish (final validation)

### Incremental Delivery

1. Fix config issues → Test config → Deploy if needed
2. Fix cookies issues → Test cookies → Deploy if needed
3. Verify build → Test build → Deploy if needed
4. Commit and push → Test repo → Complete
5. Final validation → Test everything → Done

---

## Notes

- All [X] tasks = completed as part of the Vercel build fix implementation
- The application now builds successfully with no TypeScript errors
- All API routes properly handle async cookies operations
- Next.js configuration is compatible with current version