# Quickstart & Validation Guide: Architecture & Theming

## Prerequisites
- Node.js 18+ installed
- npm or pnpm installed
- A web browser supporting CSS Grid and `backdrop-blur`

## Setup Commands

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

## Validation Scenarios

### Scenario 1: Visual Identity & Layout
1. Open `http://localhost:3000` in your browser.
2. **Expected Outcome**: The storefront loads without errors. The background color, text color, and typography match `muhammad---shariq.vercel.app`. The layout features a floating glass-effect header and a minimalist footer.

### Scenario 2: Responsive Grid
1. While on the homepage, inspect the placeholder listing grid.
2. Resize the browser window from wide desktop down to 320px (mobile size).
3. **Expected Outcome**: The grid transitions smoothly from 3-4 columns (desktop) to 2 columns (tablet) to 1 column (mobile 320px). There is **zero horizontal scrolling** at any point.

### Scenario 3: Header Interactions & Sticky Behavior
1. Scroll down the page past the viewport height.
2. **Expected Outcome**: The header remains sticky at the top, and the background content blurs beneath it.
3. Click the "Back to Portfolio" link in the header.
4. **Expected Outcome**: A new tab opens to the main portfolio domain securely.

### Scenario 4: Code Quality (Centralized Theming)
1. Run a code search for `#` (hex codes) or `rgb`/`hsl` inside `src/components/ui/`.
2. **Expected Outcome**: Zero instances of hardcoded colors are found. All visual styles are applied via Tailwind classes drawing from `tailwind.config.ts`.
