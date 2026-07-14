# Quickstart: Validation Scenarios

This guide provides steps to validate the data layer configuration, the `ListingCard` component, and the build-time fail-fast mechanism.

## Prerequisites
- The project is fully set up and running locally (`npm run dev`).
- The user is viewing the index page (`http://localhost:3000`).

## Scenario 1: Adding a New Listing Successfully

**Purpose**: Verify that appending a new object to the configuration array renders it automatically without UI code changes.

1. Open `src/config/shop-data.ts`.
2. Locate the `DEV_THEMES` array and append a new valid entry:
   ```typescript
   {
     id: "test-theme-02",
     title: "Awesome Portfolio",
     description: "A dark mode portfolio template.",
     thumbnailUrl: "/test.jpg", // Ensure a placeholder image exists or use an external URL
     etsyUrl: "https://www.etsy.com",
     livePreviewUrl: "https://example.com",
     tags: ["React", "Framer Motion"]
   }
   ```
3. Save the file.
4. **Expected Outcome**: The browser hot-reloads and the new card appears in the grid immediately. The primary and secondary CTAs link correctly to the provided URLs.

## Scenario 2: Build-Time Schema Validation Failure

**Purpose**: Verify that malformed data prevents the application from building, avoiding a broken UI in production.

1. Open `src/config/shop-data.ts`.
2. Modify one of the existing listings to intentionally break the schema. For example, remove the `etsyUrl` field entirely, or change it to an invalid URL string like `"not-a-url"`.
3. Save the file.
4. Run the production build command in your terminal:
   ```bash
   npm run build
   ```
5. **Expected Outcome**: The build process fails with a clear Zod validation error indicating which field failed (e.g., `Invalid url` for `etsyUrl`). The application does not compile.

## Scenario 3: Empty State Handling

**Purpose**: Verify the grid degrades gracefully when there are no products to display.

1. Open `src/config/shop-data.ts`.
2. Temporarily comment out all entries in the `DEV_THEMES` array, making it empty `[]`.
3. Save the file and view the application in the browser.
4. **Expected Outcome**: The grid does not crash or render empty space. Instead, a clear "No listings yet" (or similar) message is displayed to the user.

## Scenario 4: UI Truncation and Robustness

**Purpose**: Verify that unusually long titles or descriptions do not break the card layout.

1. Open `src/config/shop-data.ts`.
2. Edit an entry to have an extremely long title and description (e.g., 500 characters of "Lorem ipsum...").
3. Save the file and view the application.
4. **Expected Outcome**: The card dimensions remain consistent with other cards in the grid. The overly long text is either wrapped appropriately or truncated with an ellipsis (`...`), maintaining the structural integrity of the grid.
