# Research: Email Verification

## Unknowns Resolved

### 1. External Validation API Choice
- **Context**: The spec allowed either Abstract API or Hunter.io.
- **Decision**: Abstract API.
- **Rationale**: Abstract API's email validation endpoint is simpler and highly performant. Hunter.io is great but more geared towards finding professional emails rather than basic validation (spam/typo checking).
- **Alternatives**: Hunter.io (rejected because it is more expensive for basic validation and focused on B2B lead generation).

### 2. Next.js Data Fetching/Mutation Pattern
- **Context**: How to implement the backend call to the validation API and Google Sheets while keeping the secret keys secure.
- **Decision**: Use Next.js Server Actions.
- **Rationale**: Next.js App Router allows Server Actions for form mutations. This keeps the API keys for Abstract API and Google Sheets entirely on the server-side, preventing exposure. It also avoids creating a separate API route, keeping the logic co-located with the feature.
- **Alternatives**: Next.js API Routes (Route Handlers) - viable but slightly more boilerplate than Server Actions.

### 3. Google Sheets Integration
- **Context**: How to authenticate and append data to Google Sheets securely in a serverless environment.
- **Decision**: Use the official `googleapis` npm package with a Google Service Account.
- **Rationale**: It is the most robust and officially supported method for server-to-server communication with Google APIs.
- **Alternatives**: Third-party wrappers or Zapier (rejected to reduce dependencies and latency).

### 4. Testing Framework
- **Context**: No testing framework is specified in the constitution.
- **Decision**: Manual testing for now, aligned with project defaults.
- **Rationale**: The `package.json` doesn't include Jest or Playwright, so we will not introduce a heavy testing framework for a single feature unless specified.
