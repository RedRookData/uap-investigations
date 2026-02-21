# UAPI Theme Build Plan
_Last updated: 2026-02-21_
_Reference: SITE-PLAN.md (locked), PANEL-REVIEW.md_

---

## Overview

We are building a custom Ghost 6.x theme from scratch. The existing `uapi-theme` in `ghost-theme/uapi-theme/` is archived -- this is a full replacement built to spec.

**Stack:** Ghost Handlebars (HBS) templates + vanilla CSS with custom properties + vanilla JS (no frameworks). Algolia for search. No npm build step -- Ghost accepts a zip of raw files.

**Design system:** Parchment (#F4F1EA) background, IBM Plex Mono for metadata/badges, Source Serif 4 for body/headlines, red (#9B1C1C) as sole accent. Document aesthetic throughout.

**Hosting target:** Ghost 6.19 at uapinvestigations.com (DigitalOcean). Deploy via Ghost Admin UI (theme zip upload) or direct file copy on server.

---

## Theme File Manifest

```
uapi-dossier/
├── package.json                   # Theme metadata, Ghost feature declarations
├── default.hbs                    # Master layout shell
├── index.hbs                      # Homepage
├── post.hbs                       # Single article (Cases + Reports)
├── page.hbs                       # Static pages (About/Methodology)
├── tag.hbs                        # Tag archive (fallback browse by tag)
├── error.hbs                      # 404 + error pages
│
├── custom-library.hbs             # Library section with JS filter
├── custom-researchers.hbs         # Researchers directory
├── custom-reports.hbs             # Reports archive (Investigator gate)
├── custom-dispatches.hbs          # Dispatches archive
│
├── partials/
│   ├── header.hbs                 # Classification header + nav
│   ├── footer.hbs                 # Document footer
│   ├── card-case.hbs              # Dossier card (Cases)
│   ├── card-report.hbs            # Report card (with paywall indicator)
│   ├── card-dispatch.hbs          # Dispatch link card
│   ├── card-researcher.hbs        # Researcher profile card
│   ├── card-library.hbs           # Library entry card
│   ├── badges.hbs                 # Badge rendering (reads tag slugs)
│   ├── search-trigger.hbs         # Search icon/bar in nav
│   ├── search-modal.hbs           # Algolia search overlay + login gate
│   ├── newsletter-cta.hbs         # Email capture block (inline articles)
│   ├── report-preview.hbs         # Report teaser hook (bottom of Cases)
│   ├── tier-prompt.hbs            # Membership upgrade prompt (paywalled content)
│   ├── newcomer-block.hbs         # Homepage orientation block
│   └── cross-index.hbs            # Related sources block (topical, not evidentiary)
│
└── assets/
    ├── css/
    │   ├── tokens.css             # Design tokens (all CSS custom properties)
    │   ├── base.css               # Reset + root styles
    │   ├── typography.css         # Font declarations + heading/body scale
    │   ├── layout.css             # Grid, containers, spacing
    │   ├── header.css             # Navigation + classification bar
    │   ├── footer.css             # Document footer
    │   ├── cards.css              # All card types (case, report, dispatch, etc.)
    │   ├── badges.css             # Badge system (all types + colors)
    │   ├── article.css            # Single post layout + content styles
    │   ├── library.css            # Library grid + filter UI
    │   ├── researchers.css        # Researcher directory grid
    │   ├── search.css             # Search modal + overlay
    │   ├── conversion.css         # CTA blocks, newsletter, tier prompts
    │   └── responsive.css         # All breakpoints
    │
    └── js/
        ├── badges.js              # Reads tag slugs, applies badge classes to cards
        ├── library-filter.js      # Client-side multi-axis filter for Library
        ├── search-gate.js         # Ghost member detection + search modal logic
        ├── algolia-search.js      # Algolia InstantSearch integration
        └── cross-index.js         # Fetch + render cross-indexed related posts
```

---

## Template Breakdown

### `package.json`
Declares theme name, version, Ghost version compatibility. Declares custom templates (`custom-library`, `custom-researchers`, etc.) so they appear as page template options in Ghost Admin.

### `default.hbs`
Master shell. Contains:
- Google Fonts preconnect + load (IBM Plex Mono, Source Serif 4)
- CSS load order
- Ghost-required `{{ghost_head}}`
- `{{> header}}` partial
- `{{{body}}}` yield
- `{{> footer}}` partial
- `{{> search-modal}}` partial (always in DOM, hidden until triggered)
- JS load (deferred)
- `{{ghost_foot}}`

### `index.hbs` (Homepage)
Structure:
1. `{{> newcomer-block}}` — orientation block, dismissable via localStorage
2. Section grid: Latest Cases (3 cards), Latest Reports (3 cards), Latest Dispatches (3 cards)
3. Library teaser row (3 cards)
4. Researchers teaser row (3 cards)
5. `{{> newsletter-cta}}` — full-width email capture
6. Each section has "VIEW ALL →" link to its archive page

### `post.hbs` (Articles)
Structure:
1. Article header: Case ID, title, classification stamp, author, date filed, read time
2. Badge row: case status bar (left border), evidence quality tags, source type tags
3. Incident type + witness category + geographic tags (smaller, below badge row)
4. Article body (Ghost content block)
5. `{{> cross-index}}` — related official sources / related analysis (with disclosure)
6. `{{> report-preview}}` — teaser of latest Report with Investigator CTA
7. `{{> newsletter-cta}}` — email capture
8. Tags footer (for browsing)

For paywalled content (Reports): body is truncated after first section, replaced with `{{> tier-prompt}}`.

### `custom-library.hbs`
Structure:
1. Page header: "LIBRARY — REFERENCE ARCHIVE"
2. Filter bar: dropdowns/checkboxes for topic, format, source type, author, era, access (free/paid)
3. Results grid (renders `{{> card-library}}` for each entry)
4. JS-driven filtering (no page reload)
5. All entries visible to all users (no login gate)

### `custom-researchers.hbs`
Structure:
1. Page header: "RESEARCHERS — FIELD PERSONNEL"
2. Filter bar: focus area, affiliation type (military, government, academic, independent)
3. Researcher card grid (renders `{{> card-researcher}}`)
4. Free to all

### `custom-dispatches.hbs`
Structure:
1. Page header with "DISPATCHES — INCOMING SIGNALS" header aesthetic
2. Chronological list of dispatch cards
3. Filter by source outlet
4. Free to all

### `custom-reports.hbs`
Structure:
1. Page header: "REPORTS — CLASSIFIED ANALYSIS" (dossier aesthetic)
2. For logged-out or free/Supporter users: shows report cards with title + summary + locked indicator
3. For Investigator/Clearance: shows full report cards with read links
4. `{{> tier-prompt}}` persistent banner for non-Investigator users
5. Individual purchase CTA ($18) on each locked report card

---

## Badge System Implementation

### How it works
Ghost tags applied to posts use the slug conventions defined in SITE-PLAN.md (`#class-unclassified`, `#status-ongoing`, `#ev-corroborated`, etc.). The `badges.hbs` partial and `badges.js` read these slugs and render the appropriate visual.

### `badges.hbs` logic (Handlebars)
```handlebars
{{#foreach tags}}
  {{#match slug "^#class-"}}
    <span class="badge badge--class badge--{{slug}}">{{name}}</span>
  {{/match}}
  {{#match slug "^#status-"}}
    <span class="badge badge--status badge--{{slug}}">{{name}}</span>
  {{/match}}
  {{#match slug "^#ev-"}}
    <span class="badge badge--evidence badge--{{slug}}">{{name}}</span>
  {{/match}}
  {{#match slug "^#src-"}}
    <span class="badge badge--source badge--{{slug}}">{{name}}</span>
  {{/match}}
{{/foreach}}
```

### `badges.css` color rules
- Classification: monospace stamp aesthetic, dark border, position top-right of card
  - `UNCLASSIFIED`: black text, transparent bg
  - `EYES ONLY`: black text, subtle border
  - `FOIA RELEASE`: green (#2D5A27) text
  - `DECLASSIFIED`: green (#2D5A27), strikethrough effect optional
- Case status (left-border bar, 4px):
  - ONGOING: #9B1C1C
  - CLOSED: #4A4A4A
  - COLD CASE: #2C4A6E
  - PENDING REVIEW: #8B6914
- Evidence quality + Source type: inline monospace capsules, muted bg (#E0DDD4), IBM Plex Mono

### Case ID generation
Auto-formatted via Ghost's `{{post_number}}` or via a custom field in Ghost Admin. Format: `UAPI-CASE-YYYY-NNN`. If Ghost doesn't support auto-increment natively, ID is set manually as a custom field and rendered in the template.

---

## Search Implementation

### Algolia setup (before build)
1. Create Algolia free account
2. Create index: `uapi_content`
3. Configure facets: `tags.slug`, `published_at`, `primary_author.name`
4. Set up Ghost → Algolia sync: use `@tryghost/algolia` package or a Ghost webhook + Algolia API on the server
5. Store Algolia App ID + Search-Only API key in Ghost theme (public, read-only key only)

### Search gate logic (`search-gate.js`)
```
if (user clicks search trigger) {
  if (Ghost member session detected) {
    open Algolia search modal
  } else {
    open "Create free account to search" modal
    modal contains: Ghost signup form (email input + submit)
    on submit: Ghost member signup → redirect back to search
  }
}
```

Ghost member detection: check for `gh-auth-secret` cookie or use Ghost Content API member endpoint.

### Algolia modal UI
- Full-screen overlay, parchment bg
- Facet filter panel (left): incident type, evidence quality, geographic region, date range, section
- Results panel (right): rendered as mini case cards
- IBM Plex Mono search input, dossier aesthetic throughout
- "CLOSE" in top right

---

## Conversion Mechanics Implementation

### Newsletter CTA (`newsletter-cta.hbs`)
Ghost's built-in `{{subscribe_form}}` helper styled to match dossier aesthetic. Text: "FIELD DISPATCHES — Bi-weekly analysis delivered to your inbox." Appears inline in articles after first 2-3 paragraphs (injected via Ghost content card OR JS scroll trigger) and at article end.

### Report preview hook (`report-preview.hbs`)
At the bottom of every free Case article: fetches the most recent Report via `{{#get "posts" filter="tag:hash-report" limit="1"}}`, renders a mini card with title, executive summary excerpt, and "FULL REPORT — INVESTIGATOR ACCESS" button linking to Reports page with tier prompt.

### Tier prompt (`tier-prompt.hbs`)
Shown on: locked Reports, Reports archive for non-Investigator users. Content:
- Title: "INVESTIGATOR ACCESS REQUIRED"
- Brief description of the Investigator tier ($20/mo, all reports, bi-weekly)
- "SUBSCRIBE — $20/MO" button (Ghost Portal subscribe link)
- "PURCHASE THIS REPORT — $18" link (individual purchase)
- "SUPPORTER TIER — $5/MO" supporting link below

### Newcomer block (`newcomer-block.hbs`)
Dismissable (localStorage flag). Content:
- "UAPI investigates UAP phenomena across the full evidence spectrum."
- One-sentence badge explanation: "Every case is tagged by evidence quality and source type — you always know what you're looking at."
- Link: "READ THE METHODOLOGY →"
- Visually subtle -- thin bordered block, not a hero banner

---

## Ghost-Specific Notes

### Custom page templates
In `package.json`, declare:
```json
"custom": {
  "templates": {
    "library": "custom-library",
    "researchers": "custom-researchers",
    "reports": "custom-reports",
    "dispatches": "custom-dispatches"
  }
}
```
Then in Ghost Admin, set each page to its custom template.

### Member access control
Ghost 6.x handles paywall natively via post `access` setting (public / members / paid / specific tiers). Set Reports to `paid` (Investigator tier). Ghost renders `{{#is "member" tier="investigator"}}` blocks for conditional content. The `{{> tier-prompt}}` partial goes in the `{{else}}` block.

### Tags as data
Internal tags (prefixed `#`) are hidden from public tag pages and the nav but still available in templates. All badge tags use `#` prefix and will not appear as browsable tag pages unless we explicitly route them.

### Researchers as pages
Each researcher is a Ghost **Page** (not Post) with template `custom-researcher-profile` (a variation of `page.hbs`). The directory (`custom-researchers.hbs`) fetches them via `{{#get "pages" filter="tag:hash-profile"}}`.

---

## Build Sequence

Build in this order -- each stage is independently deployable for testing.

### Stage 1 — Core Shell (Day 1)
1. `package.json`
2. `assets/css/tokens.css` — all design tokens defined here first
3. `assets/css/base.css` + `typography.css`
4. `default.hbs` — layout shell, fonts loading, empty header/footer partials
5. `partials/header.hbs` — classification bar + nav (static, no JS)
6. `partials/footer.hbs` — document footer
7. `assets/css/header.css` + `footer.css`
8. `error.hbs`
**Deliverable:** Installable theme. Site has correct fonts, header, footer. No content yet.

### Stage 2 — Cards + Badge System (Day 1-2)
1. `assets/css/badges.css`
2. `partials/badges.hbs`
3. `partials/card-case.hbs`
4. `partials/card-dispatch.hbs`
5. `partials/card-report.hbs`
6. `partials/card-researcher.hbs`
7. `partials/card-library.hbs`
8. `assets/css/cards.css`
9. `assets/js/badges.js`
**Deliverable:** All card types render correctly with badges. Can test with real Ghost content.

### Stage 3 — Homepage + Article (Day 2)
1. `index.hbs` — section grids, newcomer block slot
2. `partials/newcomer-block.hbs`
3. `post.hbs` — article layout + badge row + tag footer
4. `assets/css/article.css`
5. `assets/css/layout.css`
**Deliverable:** Homepage shows content grids. Articles render with full badge system.

### Stage 4 — Section Archives (Day 2-3)
1. `custom-dispatches.hbs`
2. `custom-reports.hbs` (with paywall handling)
3. `tag.hbs` (generic fallback)
4. `page.hbs` (for About/Methodology)
**Deliverable:** All sections navigable. Reports section shows tier gate.

### Stage 5 — Library + Researchers (Day 3)
1. `custom-library.hbs`
2. `assets/css/library.css`
3. `assets/js/library-filter.js`
4. `custom-researchers.hbs`
5. `assets/css/researchers.css`
**Deliverable:** Library filterable client-side. Researchers directory renders.

### Stage 6 — Conversion Mechanics (Day 3-4)
1. `partials/newsletter-cta.hbs`
2. `partials/report-preview.hbs`
3. `partials/tier-prompt.hbs`
4. `partials/cross-index.hbs`
5. `assets/css/conversion.css`
**Deliverable:** All conversion hooks present in templates. Newsletter capture, report preview, tier prompts, cross-index blocks all render.

### Stage 7 — Search (Day 4)
1. `partials/search-trigger.hbs`
2. `partials/search-modal.hbs`
3. `assets/css/search.css`
4. `assets/js/search-gate.js`
5. `assets/js/algolia-search.js`
6. Algolia account + index setup
7. Ghost → Algolia sync setup (webhook or package)
**Deliverable:** Search icon in nav triggers login gate for logged-out users. Logged-in users get full Algolia faceted search modal.

### Stage 8 — Responsive + Polish (Day 4-5)
1. `assets/css/responsive.css` — all breakpoints
2. Cross-browser test
3. Ghost Admin UX test (verify custom templates appear correctly)
4. Accessibility pass (contrast ratios, focus states, ARIA labels on badges)
5. Performance pass (font loading, image handling, JS defer)
**Deliverable:** Theme is production-ready.

### Stage 9 — Deploy + Seed
1. Zip theme: `uapi-dossier.zip`
2. Upload via Ghost Admin → Settings → Design → Upload theme
3. Assign custom templates to pages in Ghost Admin
4. Configure Algolia index
5. Configure Stripe tiers in Ghost (Free / Supporter / Investigator / Clearance waitlist)
6. Publish seed content: 5-10 Cases, 10+ Library entries, 5 Dispatches, 10+ Researcher profiles
7. Write and publish About/Methodology page
8. Test full funnel: browse → search gate → signup → newsletter → report preview → tier upgrade

---

## Pre-Build Decisions Needed

None blocking build start. These can be resolved during build:

1. **Case ID format:** Auto-increment via custom field (manual) or derived from publish date? Recommend: `UAPI-{YEAR}-{sequence}` set manually as Ghost custom field until Ghost supports auto-increment.

2. **Researcher profile template:** Full Ghost page per researcher, or a structured custom field approach? Recommend: Ghost pages with `#profile` tag. Simple, flexible, no custom fields needed.

3. **Ghost → Algolia sync method:** `@tryghost/algolia` npm package on the server (most reliable) vs. Zapier/n8n webhook (easier setup). Recommend: server-side package for reliability.

4. **Community forum platform:** Ghost Comments (simple, no extra setup) vs. external forum software (Discourse, Flarum). Decision needed before Phase 1 complete but does not block theme build.

---

## Files NOT in This Build (Phase 2+)

- Dispatch automation (RSS cron): separate server-side script, not a theme concern
- Plausible analytics snippet: added to Ghost Code Injection, not theme
- Algolia index automation: server-side, separate from theme
- Clearance AI features: Phase 3, entirely separate build

---

## Estimated Build Time

| Stage | Complexity | Est. Time |
|-------|-----------|-----------|
| 1. Core shell | Low | 2-3 hrs |
| 2. Cards + badges | Medium | 3-4 hrs |
| 3. Homepage + article | Medium | 3-4 hrs |
| 4. Section archives | Low-Medium | 2-3 hrs |
| 5. Library + researchers | Medium-High | 4-5 hrs |
| 6. Conversion mechanics | Medium | 3-4 hrs |
| 7. Search | High | 5-6 hrs |
| 8. Responsive + polish | Medium | 3-4 hrs |
| 9. Deploy + seed | Low | 2-3 hrs |
| **Total** | | **~27-36 hrs** |

Realistically 3-5 days of focused build time, or faster with a coding agent handling templating and CSS in parallel.
