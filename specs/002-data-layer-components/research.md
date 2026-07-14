# Research & Technical Decisions: Data Layer & Core Components

## Topic 1: Lightweight Schema Validation

**Context**: The specification requires a "lightweight runtime type guard (or schema check) that validates each entry in DEV_THEMES has the required fields, so a malformed listing fails fast during build."

**Decision**: Use **Zod** (`zod`).

**Rationale**: 
- **Type Safety**: Zod integrates seamlessly with TypeScript, allowing us to infer the `DevThemeListing` type directly from the schema (`z.infer<typeof DevThemeSchema>`). This avoids duplicating the type definition and the validation logic.
- **Fail Fast**: By exporting the `DEV_THEMES` array after running it through `DevThemeSchema.array().parse()`, any malformed data will immediately throw a `ZodError` during compilation/build time in Next.js, explicitly preventing the site from building with broken UI state.
- **Lightweight**: Zod is relatively small and, since the validation occurs exclusively at build/server time for this static configuration, it contributes exactly 0 bytes to the client-side JavaScript bundle.

**Alternatives Considered**:
- **Custom Type Guards (`typeof` / `in` checks)**: While dependency-free, custom type guards require manually maintaining both the TypeScript `interface` and the validation function. This increases the surface area for bugs (e.g., adding a field to the interface but forgetting to update the type guard).
- **Yup / Joi**: Heavier alternatives that don't offer the same first-class TypeScript inference as Zod.
