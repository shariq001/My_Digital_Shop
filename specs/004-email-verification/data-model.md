# Data Model: Email Verification

## Entities

### EmailLead
Represents a validated email address that is stored in Google Sheets.

**Fields**:
- `email` (string): The validated email address.
- `submittedAt` (string/ISO Date): The timestamp of when the email was submitted.
- `status` (string): Fixed to "Valid".
- `promoCode` (string): The generated/assigned promo code (optional).

**Validation Rules**:
- Must be a valid email format.
- Must not be a disposable/fake domain.
- Must not be a common typo.
- Must not be gibberish.

## State Transitions (UI)
1. **Idle**: User has not submitted anything.
2. **Submitting**: Form is disabled, background validation in progress.
3. **Success**: Form is replaced by or dynamically shows the 10% promo code.
4. **Error**: Form shows inline error message, user can retry.
