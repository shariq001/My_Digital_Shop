# Data Model: Architecture & Theming

## ThemeTokens

Centralized visual identity configuration elements that map exactly to the main portfolio design system. 
While not a traditional database entity, these tokens form the foundational data structure for the application's presentation layer.

### Fields
- `colors.background`: Main page background color.
- `colors.text.primary`: Main body text color.
- `colors.accent`: Brand accent color used for highlights and interactions.
- `colors.surface`: Card and floating element background tones.
- `font.heading`: Font family for headings.
- `font.body`: Font family for body text.

### Validation Rules
- All values MUST be valid CSS color strings or font families.
- Tokens MUST be implemented centrally in `tailwind.config.ts` and `globals.css`, never hardcoded in component files.
