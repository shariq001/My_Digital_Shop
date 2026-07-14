# Quickstart: Validation Scenarios

This guide provides steps to validate the SEO configurations and the deployment pipeline.

## Scenario 1: Metadata & Open Graph Verification

**Purpose**: Confirm that metadata exists and is structured correctly for social platforms.

1. Start the local server (`npm run dev`) or view the deployed site.
2. Open browser developer tools and inspect the `<head>`.
3. **Expected Outcome**:
   - `<title>` matches "DevThemes — Developer Templates by [Name]".
   - `<meta name="description" ...>` exists with a relevant description.
   - `<meta property="og:title" ...>`, `og:description`, and `og:image` all exist and hold correct values.
4. Copy the public deployment URL and paste it into [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) or similar.
5. **Expected Outcome**: The tool renders a full card with the correct image, title, and description.

## Scenario 2: Semantic HTML Audit

**Purpose**: Ensure the document hierarchy is correct for search engine crawlers.

1. View the source of the index page (`http://localhost:3000`).
2. Run a DOM search (`Ctrl+F`).
3. **Expected Outcome**:
   - Exactly one `<main>` tag wrapping the core content.
   - `<header>` and `<footer>` tags wrapping the top and bottom navigation.
   - Each product card is wrapped in an `<article>` tag.
   - Exactly one `<h1>` tag exists on the page.

## Scenario 3: Bi-directional Linking

**Purpose**: Verify the portfolio and storefront connect seamlessly.

1. Navigate to the storefront.
2. Click the "Portfolio" link in the header or footer.
3. **Expected Outcome**: You are securely navigated to the portfolio (`muhammad---shariq.vercel.app`).
4. Navigate to the main portfolio.
5. (Manual task for the user later) Ensure a link points back to `devthemes-store.vercel.app`.

## Scenario 4: Vercel Production Build

**Purpose**: Verify the application builds successfully without type errors before pushing.

1. Run `npm run build` in the terminal.
2. **Expected Outcome**: The build completes successfully with zero TypeScript compilation errors.
