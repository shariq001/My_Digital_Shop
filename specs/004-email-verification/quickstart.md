# Quickstart Validation Guide: Email Verification

## Prerequisites
1. Set up your `.env.local` file with the required external API credentials:
   ```env
   ABSTRACT_API_KEY=your_abstract_api_key
   GOOGLE_SERVICE_ACCOUNT_EMAIL=your_service_account_email
   GOOGLE_PRIVATE_KEY="your_private_key"
   GOOGLE_SHEET_ID=your_spreadsheet_id
   ```
2. Install dependencies: `npm install googleapis` (if not already installed).

## Validation Scenarios

### Scenario 1: Valid Email Submission
1. Start the development server: `npm run dev`
2. Navigate to the page containing the `PromoEmailForm` component.
3. Enter a known valid email (e.g., `test@gmail.com`) into the input field.
4. Click "Submit".
5. **Expected Outcome**: The UI updates instantly (under 1s) to reveal the promo code (e.g., "DISCOUNT10") without reloading the page.
6. **Data Verification**: Check your connected Google Sheet. A new row should be appended containing the submitted email and timestamp.

### Scenario 2: Invalid/Fake Email Submission
1. In the same form, enter an invalid email such as `test@fake12345.com` or `user@gamil.co`.
2. Click "Submit".
3. **Expected Outcome**: The UI displays an inline error message: "Please provide a valid, active email address." The promo code is NOT revealed.
4. **Data Verification**: Check your connected Google Sheet. No new row should be appended.
