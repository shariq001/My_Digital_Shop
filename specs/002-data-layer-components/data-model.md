# Data Model: Data Layer & Core Components

## Entities

### `DevThemeListing`

The primary entity representing a single digital product/theme available on the storefront.

**Source of Truth**: Defined and validated using Zod in `src/config/shop-data.ts`.

#### Fields

| Field | Type | Required | Description | Validation Rules |
|-------|------|----------|-------------|------------------|
| `id` | string | Yes | Unique identifier for the theme | Must be a non-empty string |
| `title` | string | Yes | Display name of the theme | Must be a non-empty string |
| `description` | string | Yes | Short promotional description | Must be a non-empty string |
| `thumbnailUrl` | string | Yes | Path to the preview image | Must be a valid URL or a local path starting with `/` |
| `etsyUrl` | string | Yes | URL to purchase the theme on Etsy | Must be a valid URL |
| `livePreviewUrl` | string | Yes | URL to view the live demo | Must be a valid URL |
| `tags` | string[] | No | Array of category/tech tags | Array of strings (e.g., `["Next.js", "Tailwind"]`) |

## Validation Logic

The array of listings (`DEV_THEMES`) is parsed through the Zod array schema upon initialization. If any required field is missing, or if a URL is malformed, Zod will throw an error. In a Next.js environment, because this config file is imported during the build process to render static pages, this error will surface as a build failure—satisfying the requirement to "fail fast".
