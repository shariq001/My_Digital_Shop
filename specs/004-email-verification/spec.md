# Functional Specification Document (FSD)
## Feature: Email Verification for Promo Code Capture

**Product:** DevThemes Digital Storefront
**Feature Owner:** Product/Engineering
**Status:** Draft for review

---

## 1. Overview

### 1.1 Feature Goal
Capture high-quality, verified user emails in exchange for a 10% discount promo code, while preventing spam submissions, common typos, disposable/fake domains, and gibberish input — all validated in real time.

### 1.2 Problem Statement
An unvalidated email capture form invites low-quality leads (typos, throwaway addresses, bots), which pollutes the marketing list and wastes the promo code on unreachable or fake users. This feature adds a real-time verification layer before any email is stored or any code is issued.

### 1.3 Success Metrics
- ≥ 95% of stored emails pass a follow-up deliverability spot-check.
- < 1s median validation response time.
- < 2% of legitimate users falsely blocked (false-positive rate).

---

## 2. Technical Stack & Requirements

| Component | Choice | Notes |
|---|---|---|
| Validation Service | Abstract API (Email Validation endpoint) or Hunter.io Email Verifier | Pick one primary provider; design the integration behind a thin adapter so the provider can be swapped without touching UI code |
| Data Storage | Google Sheets (via Google Sheets API / service account) | Append-only log of verified emails |
| Frontend | Existing Next.js/TypeScript/Tailwind stack (per project constitution) | Client-side form, server route (API route / Route Handler) for the actual validation + write, to keep API keys server-side only |
| Performance Target | Real-time validation, < 1 second end-to-end | Includes API call + Sheets write on the happy path |

### 2.1 Architecture Notes
- The validation API key and Google Sheets service account credentials live in environment variables only (per project constitution's security rules) — never exposed to the client.
- All validation and storage logic runs in a Next.js Route Handler (e.g., `POST /api/promo-signup`), called by the client form via `fetch`. The client never talks to Abstract API/Hunter.io or Google Sheets directly.
- The endpoint returns a simple JSON contract:
  ```json
  // Success
  { "status": "valid", "promoCode": "WELCOME10" }
  // Failure
  { "status": "invalid", "reason": "disposable_domain" }
  ```

---

## 3. Business Logic & Validation Rules

### 3.1 Block List (Reject)
- **Disposable/fake domains** — e.g., `xyz@fake12345.com`, known temp-mail providers (Mailinator, Guerrilla Mail, etc.) — flagged via the validation service's disposable-domain detection.
- **Common typos in popular domains** — e.g., `user@gamil.co`, `user@yaho.com`, `user@hotmial.com` — flagged via the validation service's typo/"did you mean" suggestion feature, if available, otherwise a small local lookup table of common typo patterns as a fallback.
- **Gibberish/malformed input** — e.g., `asdfasdf`, missing `@`, missing TLD — rejected first at basic regex/format validation, before even calling the paid API (saves API calls on obviously invalid input).
- **Non-existent/unreachable mailboxes** — domain resolves but the specific mailbox does not (SMTP/MX check via the validation service).

### 3.2 Allow List (Accept)
- Only emails the validation service returns as **deliverable/verified** with reasonable confidence (e.g., Abstract API `deliverability: "DELIVERABLE"`, or Hunter.io `result: "deliverable"` / high `score`).
- Role-based addresses (e.g., `info@`, `support@`) — **decision needed**: recommend allowing but flagging, since they're real and monitored, though not personal. (Flagged as an open question — see Section 7.)

### 3.3 Validation Order (for performance + cost efficiency)
1. Client-side format check (regex) — instant, no API call, blocks obvious gibberish immediately.
2. Server-side call to validation API — checks disposable domain, typo suggestion, deliverability.
3. On pass → write to Google Sheets → return promo code.
4. On fail at any stage → return an inline error reason, no Sheets write.

---

## 4. User Experience (UX) Flow

1. **Input:** User types their email into the promo capture field and clicks "Submit."
2. **Instant client check:** Basic format validation runs immediately (no round-trip) to catch empty/malformed input before hitting the API.
3. **Background validation:** A loading indicator (small inline spinner, not a full-page block) shows while the server-side validation call runs — frictionless, no page reload.
4. **Unhappy path (invalid):**
   - Inline error message appears directly under the field (e.g., "That email doesn't look right — please double-check and try again.").
   - Field is not cleared; user can immediately correct and resubmit.
   - No entry is written to Google Sheets.
5. **Happy path (valid):**
   - Email is instantly logged to the designated Google Sheet (timestamp, email, source page).
   - The 10% promo code is dynamically revealed on screen — no page reload — e.g., via an inline success state showing the code with a "Copy Code" button.
   - Optionally route the user to the beautified **Thank-You Page** (see Spec 04, Section 6) as a secondary confirmation step, if product decides a dedicated page is preferred over an inline reveal.

---

## 5. Data Model

### 5.1 Google Sheet Schema
| Column | Type | Notes |
|---|---|---|
| `timestamp` | ISO datetime | Server-generated, not client-supplied |
| `email` | string | Lowercased, trimmed before storage |
| `validationStatus` | string | e.g., `deliverable` |
| `promoCodeIssued` | string | The code shown to the user |
| `sourcePage` | string | e.g., `homepage`, `thank-you-upsell` — for attribution |

### 5.2 Promo Code Generation
- **Open question for stakeholder decision (see Section 7):** single shared static code (e.g., `WELCOME10`) vs. unique per-user code. Static is simpler to ship first; unique codes allow usage tracking/expiry later.

---

## 6. Acceptance Criteria

- [ ] Submitting a syntactically invalid email (no `@`, no TLD) is rejected client-side instantly, with no API call made.
- [ ] Submitting a known disposable-domain email is rejected with an inline error, and nothing is written to Google Sheets.
- [ ] Submitting a common-typo domain (e.g., `gamil.com`) is rejected with an inline error.
- [ ] Submitting a valid, deliverable email results in: (a) a Google Sheets row written within the validation call, (b) the promo code displayed on-screen without a page reload, (c) total round-trip time under 1 second on a normal connection.
- [ ] The validation API key and Google Sheets credentials are never present in client-side JS bundles or network responses.
- [ ] Duplicate submissions from the same email do not create duplicate Sheet rows and do not re-issue a new promo code (see Edge Cases).
- [ ] All error states are inline and non-blocking — no full-page reload or redirect on failure.

---

## 7. Edge Cases & Open Questions

### 7.1 Edge Cases to Handle
- **Duplicate email resubmission:** If an email already exists in the Sheet, decide whether to (a) silently re-show the same promo code, or (b) show a message like "You've already claimed your code — check your inbox." Recommend (b) to discourage repeated form abuse.
- **Validation API timeout/downtime:** If the third-party API doesn't respond within ~2–3 seconds, fail gracefully with a generic "We couldn't verify that right now, please try again" message — do not silently accept unverified emails as a fallback.
- **Google Sheets write failure after successful validation:** If the API call succeeds but the Sheets write fails, the user should still see their promo code (don't punish the user for a backend hiccup), but the failure must be logged server-side for manual reconciliation — this should not silently drop leads.
- **Rate limiting / bot abuse:** A user or script submitting many emails in rapid succession should be throttled (e.g., basic IP-based rate limit on the API route) to protect the validation API quota/cost.
- **Case and whitespace variants:** `User@Example.com ` and `user@example.com` should be treated as the same email (normalize before dedupe/check).
- **Role-based addresses:** Decide explicitly whether `info@`, `sales@`, etc. are allowed (see open question below) rather than leaving it to default API behavior.
- **Copy-to-clipboard failure:** If the "Copy Code" button fails (e.g., browser permissions), the code must still be visible as selectable text — never rely on clipboard as the only way to obtain it.

### 7.2 Open Questions for Stakeholder Sign-off
1. **Promo code strategy:** Single static code for all valid signups, or unique per-user codes with expiry/usage tracking?
2. **Role-based emails** (`info@`, `support@`): allow, block, or allow-with-flag?
3. **Re-submission policy:** Should a previously-verified email be allowed to claim the code again, or is it strictly one-time per email address?
4. **Where does the promo capture form live?** Homepage only, footer, exit-intent modal, or multiple placements? (Affects `sourcePage` attribution design.)
5. **Fallback if the primary validation provider (Abstract API/Hunter.io) has an outage:** hard-block signups temporarily, or degrade to format-only validation with a manual review flag?

---

## 8. Out of Scope (this feature)
- Automated email delivery of the promo code via a transactional email (current flow displays the code in-app; email delivery could be a fast-follow).
- Promo code redemption tracking on Etsy's side (Etsy checkout is outside this system's control).
- CRM/marketing platform integration beyond the Google Sheet (e.g., Mailchimp/Klaviyo sync) — treat the Sheet as the source of truth for now.
