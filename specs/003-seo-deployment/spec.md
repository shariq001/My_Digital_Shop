# Feature Specification: SEO, Semantic Structure & Deployment

**Feature Branch**: `003-seo-deployment`

**Created**: 2026-07-15

**Status**: Draft

**Input**: User description: "Make the storefront discoverable and shareable (search engines and social unfurls), verify semantic HTML compliance, and ship it to Vercel as a linked sub-domain/project of the main portfolio."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Link Sharing on Social Platforms (Priority: P1)

As a site owner or visitor, I want to share the storefront URL on platforms like Twitter, LinkedIn, and Discord, so that the link unfurls into a visually appealing preview card containing the site's title, description, and branding image.

**Why this priority**: Discoverability and professional presentation on social channels are critical for driving traffic to the digital products.

**Independent Test**: Can be fully tested by pasting the deployed URL into a social preview debugger (e.g., LinkedIn Post Inspector or Twitter Card Validator) and verifying the rendered card.

**Acceptance Scenarios**:

1. **Given** the storefront URL is shared on a supported platform, **When** the platform fetches the metadata, **Then** a rich card is displayed utilizing the configured `og:title`, `og:description`, and `og:image`.

---

### User Story 2 - Search Engine Indexing (Priority: P1)

As a site owner, I want the storefront to utilize strict semantic HTML and standard metadata, so that search engine crawlers can accurately index the content and improve organic search visibility.

**Why this priority**: A structurally sound document hierarchy is a baseline requirement for modern web accessibility and SEO.

**Independent Test**: Can be tested by running an automated audit tool (like Lighthouse) or manually inspecting the DOM for the presence of a single `<h1>`, `<main>`, `<header>`, `<footer>`, and `<article>` tags replacing arbitrary `<div>` containers.

**Acceptance Scenarios**:

1. **Given** a crawler visits the page, **When** it parses the HTML, **Then** it accurately identifies the primary content area (`<main>`) and the individual products (`<article>`).
2. **Given** the page is analyzed, **When** checking heading structures, **Then** exactly one `<h1>` exists, and headings do not skip levels (e.g., `<h2>` to `<h4>`).

---

### User Story 3 - Cross-Navigation from Portfolio (Priority: P2)

As a visitor exploring the main portfolio, I want to easily discover and navigate to the standalone storefront, and vice-versa, so that the experience feels like a cohesive brand ecosystem despite separate infrastructure.

**Why this priority**: Connects the two isolated deployments together to share traffic.

**Independent Test**: Can be tested by clicking the storefront link on the main portfolio, and clicking the portfolio link on the storefront header/footer.

**Acceptance Scenarios**:

1. **Given** the storefront is deployed on Vercel, **When** a user clicks the "Portfolio" link in the storefront, **Then** they are securely navigated back to the main portfolio.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST implement global `<title>` and `<meta name="description">` tags.
- **FR-002**: The system MUST implement Open Graph tags (`og:title`, `og:description`, `og:image`).
- **FR-003**: The root layout MUST support cascading metadata, allowing future sub-routes to override the global defaults if necessary.
- **FR-004**: The system's DOM MUST utilize semantic HTML5 elements (`<main>`, `<header>`, `<footer>`, `<article>`).
- **FR-005**: The system MUST maintain a strict heading hierarchy, containing exactly one `<h1>` per page without skipped levels.
- **FR-006**: The system MUST be deployed to Vercel as a standalone project (independent from the portfolio project).
- **FR-007**: The system MUST link back to the primary portfolio deployment.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Every page has a unique, correct `<title>` and meta description.
- **SC-002**: Sharing the deployed URL on social media produces a proper image/title/description preview card as validated by external debugging tools.
- **SC-003**: Semantic HTML audit passes—no generic `<div>` is used where a semantic tag (like `<main>` or `<article>`) applies.
- **SC-004**: Site is live on Vercel as its own standalone project.
- **SC-005**: The site is reachable from the main portfolio via a link, and the storefront links back.
- **SC-006**: The production build (`next build`) executes with zero TypeScript errors and zero console errors on load.

## Assumptions

- The Vercel CLI or GitHub integration will be used to handle the deployment.
- No backend Etsy API integration is required at this stage; data remains static.
- A high-quality Open Graph image asset will be provided or generated and placed in the `public/` directory.
