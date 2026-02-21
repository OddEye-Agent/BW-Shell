# Drug Compatibility Registry (Mock Rule Registry)

## Files
- Canonical data source: `src/data/mock/drug-compatibility-registry.json`
- Runtime exposure for current non-bundled app: `src/data/mock/drug-compatibility-registry.js`

## What is confirmed vs inferred
### Confirmed from screenshot extract
- Drug list entries currently visible.
- Legend color meaning:
  - green = compatible
  - red = incompatible
  - yellow = variable
  - light-blue = unknown

### Inferred/scaffolded
- Canonical IDs (slug format, e.g. `glyceryl-trinitrate-gtn`).
- Alias map (normalization shortcuts like `gtn` and `hartmanns`).
- Pair matrix scaffold shape and defaulting strategy.
- Self-pair defaults (`drug` with `drug`) are marked `COMPATIBLE` with `evidence: "inferred"`.
- Non-visible pair statuses are left `UNKNOWN` with `evidence: "unconfirmed"`.

## Maintenance guidance
1. Add new drugs only in canonical `drugs` list with stable `id`.
2. Add optional spellings/synonyms in `aliases` pointing to canonical IDs.
3. Update `pairs` using canonical IDs only.
4. Keep `pairs` symmetric (`A-B` should match `B-A`).
5. For each pair update, include evidence metadata:
   - `confirmed` for verified source values
   - `inferred` for assumptions/defaults
   - `unconfirmed` when placeholder only
6. If the source screenshot/table is fully available later, replace scaffold `UNKNOWN` values with confirmed statuses.

## UI integration
Current UI reads `globalThis.drugCompatibilityRegistry` and renders a small summary panel in Content view to prove registry wiring without disrupting existing content accordions.
