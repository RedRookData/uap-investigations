# UAPI Site Plan — Revised
_Last updated: 2026-02-21 — Post panel review (Neural Hive + Thunderdome v2026)_
_See PANEL-REVIEW.md for full expert analysis and change rationale._

---

## Mission
UAP Investigations (UAPI) is an independent research and analysis platform. UAPI investigates, contextualizes, and evaluates UAP phenomena across the full spectrum -- from official government records and sensor data to speculative claims and fringe sources. Every piece of content is badged by evidence quality and source type so readers know exactly what they are looking at. Editorial judgment is transparent by design.

**Differentiation from existing databases (NUFORC, Black Vault, MUFON):** Those platforms archive raw reports. UAPI analyzes them -- cross-indexing official records against speculative claims, grading evidence quality, and tracing the chain of sourcing. A researcher can follow a claim from its origin to every downstream citation. No existing UAP platform does this systematically. That is the asymmetric advantage.

---

## Membership Tiers

| Tier | Name | Monthly | Annual | Access |
|------|------|---------|--------|--------|
| 0 | Public | Free | Free | All primary sources, full library, all free-tagged Cases, community forum |
| 1 | Supporter | $5/mo | $50/yr | Patronage tier: forum Verified badge, 24-hour early report access, monthly briefing email. **Also serves as stepping stone in conversion path — appears at every report gate alongside Investigator.** |
| 2 | Investigator | $20/mo | $200/yr | All weekly reports as they release (bi-weekly at launch), everything in Supporter |
| 3 | Clearance | **$35/mo founding rate (locks permanently). Public launch rate: $65/mo.** | $350/yr founding rate | WAITLIST ONLY AT LAUNCH. AI news feed (X keyword tracking + push notifications), private AI research assistant, personal research repository, everything in Investigator. Features deliver within 12 months of launch or founding rate extends. |

**Tier notes:**
- Supporter is both a patronage tier AND a conversion stepping stone. $0 → $5 → $20 is a realistic upgrade path. $0 → $20 cold is a cliff. Both tiers appear at every report gate: "Early access $5/mo" and "All reports $20/mo."
- Community forum is open to ALL tiers including free. Supporter gets a verified forum badge.
- Clearance shown at launch as founding waitlist. $35/month rate locks permanently when features go live. Public launch rate will be $65/mo — founding rate lock is the real scarcity (not a fabricated spot count).
- Individual reports available a la carte at $18 each. Investigator subscription becomes obviously good value after first report.
- Annual plans available for all paid tiers. Annual = approximately 2 months free.

**Member Badge System (site UI):**
All paying members receive a visible tier badge in the site nav (next to the Account button) and in their site profile. Badge styling:
- CLEARANCE: red accent (`#9B1C1C`) — top tier visibility
- INVESTIGATOR: FOIA green (`#2D5A27`) — analytical authority
- SUPPORTER: secondary gray (`#4A4A4A`) — community member
Badges reinforce tier identity, reduce churn, and make paying members feel differentiated from free users. Implementation: CSS attribute selectors on `data-member-tier` attribute set via HBS in `<html>` tag — zero runtime JS cost.

**Report cadence:**
- Launch cadence: bi-weekly
- Upgrade to weekly: triggered when Investigator subscriber base exceeds 200 AND 8 consecutive on-time reports delivered
- Minimum report spec: 2,000 words, at least one primary source component (original document review, structured secondary source, or annotated FOIA material)
- Skip-week protocol: if minimum spec cannot be met, skip and publish a longer Dispatch bundle instead. Never publish below spec to maintain cadence.

---

## Content Sections

### 1. CASES
Primary analysis content. UAPI's original investigation and synthesis of incidents, programs, and figures. Covers the full spectrum from highly credible official records to fringe speculation — differentiated by badge metadata, not section separation. UAPI does not report; it analyzes. Every Case article analyzes existing information and cites sources explicitly.

**Structural definition (distinguishes Cases from paid Reports):**
- Cases: Contextual analysis of publicly available information. Free to all.
- Reports: Deep-dive with primary document review, annotated FOIA material, quantitative trend analysis across multiple incidents, or exclusive structured sourcing. Investigator tier.

**Card elements:**
- Case ID (auto-generated: `UAPI-CASE-YYYY-NNN`)
- Title + summary
- Classification badge (top-right stamp)
- Case status bar (left edge color)
- Evidence quality tag(s)
- Source type tag(s)
- Incident type tag (see taxonomy below)
- Witness category tag (if applicable)
- Geographic tag
- Date filed / last updated
- Author
- Estimated read time
- Free / paywalled indicator

### 2. DISPATCHES
Curated external news and links. Updated regularly. Manual curation always; automation (Phase 2) generates draft queue requiring editorial review before publish. No auto-publish. Every Dispatch carries an editorial note of at least one sentence explaining why it is filed.

**Approved sources (initial):** The Debrief, Liberation Times, AARO releases, Congressional records, DoD press, FOIA.gov, major press UAP coverage, international defense journalism.

**Card elements:**
- Source outlet name + reliability indicator
- Date filed
- Headline (links out)
- Editorial note (1-3 sentences, required)
- Source reliability tag

**Automation spec (Phase 2):** Cron-based RSS ingest from approved sources → draft queue in Ghost → editorial review required → publish with note added.

### 3. LIBRARY
Sortable, filterable reference collection. All library content is free. Affiliate links on paid books (Amazon Associates).

**Filter axes:**
- Topic: propulsion, government programs, historical cases, witness accounts, biology, physics, policy, technology
- Format: book, document, website, video, podcast, database
- Source type: government declassified, FOIA release, academic, journalism, independent
- Author
- Era: pre-1947, Cold War, post-2004, contemporary
- Access: free download, affiliate purchase, external link

**Implementation:** Ghost tag-based with client-side JavaScript filter UI. No plugin required. Filter UI is a design-stage requirement. Fallback at scale: Ghost native tag archive pages remain functional if JS filter hits performance limits.

**Monetization:** Amazon affiliate links on paid books. Free downloads hosted externally (Archive.org, DocumentCloud) — UAPI links, does not host.

### 4. REPORTS
Weekly deep-dive publications (bi-weekly at launch). Investigator tier ($20/mo) gets all reports. Supporter tier gets 24-hour early access. Free and Supporter tiers see title + executive summary only.

**Format:** Long-form dossier. Web-only. Minimum 2,000 words. Primary source component required. Fully badged.

**Individual purchase:** $18 per report. Paywall lifts 90 days after original publish date (evergreen SEO).

### 5. RESEARCHERS
Profiles directory. A curated index of notable UAP researchers, scientists, military figures, government officials, journalists, and field investigators. UAPI does not editorialize on researcher credibility here -- profiles link to their own work and let readers evaluate.

**Each profile includes:**
- Name, credentials, institutional affiliation (if any)
- Focus areas (e.g., propulsion, government programs, historical cases, legislation)
- Notable positions or disclosures they are associated with
- Curated links: interviews, papers, congressional testimony, public statements
- Cross-links to UAPI Cases that cite or analyze their work

**Directory filtering:** by focus area, affiliation type (military, government, academic, independent), and active/historical.

**Implementation:** Ghost pages tagged `#profile`. Directory page uses Ghost Content API to render filterable grid. Researcher names in Case articles link to their profile page.

**Access:** Free to all.

### 6. ABOUT / METHODOLOGY
Static page. Launch blocker — must be complete before any content publishes.

**Required content:**
- What UAPI is and does ("We investigate, analyze, and evaluate -- across the full spectrum of evidence.")
- Badge system criteria — specific enough that a third party could audit a badge assignment
- What each evidence quality badge means (exact sourcing standard for CORROBORATED, RADAR CONFIRMED, etc.)
- What each source type tag means (exact definition for ANONYMOUS GOVERNMENT SOURCE, FOIA RELEASE, etc.)
- Policy: UAPI does not host leaked or classified documents. We analyze and link to independently hosted versions.
- Cross-index disclosure: related source links indicate topical relevance, not evidentiary endorsement
- How to submit tips (contact form link)
- Moderation policy (community forum)
- Who runs it

---

## Badge System

All badges applied via Ghost tags. Theme reads tag slugs and renders appropriate visual treatment.

### Classification Level (stamp, top-right of card)
| Tag Slug | Display | Notes |
|----------|---------|-------|
| `#class-unclassified` | UNCLASSIFIED | |
| `#class-eyes-only` | EYES ONLY | |
| `#class-foia` | FOIA RELEASE | Document obtained via FOIA |
| `#class-declassified` | DECLASSIFIED | Formerly classified, officially released |

### Case Status (left-border color bar)
| Tag Slug | Display | Color |
|----------|---------|-------|
| `#status-ongoing` | ONGOING | Red `#9B1C1C` |
| `#status-closed` | CLOSED | Dark gray `#4A4A4A` |
| `#status-cold` | COLD CASE | Steel blue `#2C4A6E` |
| `#status-pending` | PENDING REVIEW | Amber `#8B6914` |

### Evidence Quality (inline tag)
| Tag Slug | Display | Notes |
|----------|---------|-------|
| `#ev-alleged` | ALLEGED | Claim without supporting documentation |
| `#ev-primary-witness` | PRIMARY WITNESS | Direct account from someone present at the event |
| `#ev-anonymous-report` | ANONYMOUS REPORT | Claim without an attributed source |
| `#ev-single-source` | SINGLE-SOURCE | One document or source, not independently corroborated |
| `#ev-uncorroborated` | UNCORROBORATED | Multiple claims but no independent sourcing |
| `#ev-disputed` | DISPUTED | Actively contested by credible parties with evidence |
| `#ev-corroborated` | CORROBORATED | Two or more independent primary sources (circular co-citation does not qualify — see methodology) |
| `#ev-radar` | RADAR CONFIRMED | Sensor data (radar, IR, FLIR) from documented official record |
| `#ev-physical` | PHYSICAL EVIDENCE | Documented physical trace, material sample, or instrumented measurement |

### Source Type (inline tag)
| Tag Slug | Display | Notes |
|----------|---------|-------|
| `#src-whistleblower` | WHISTLEBLOWER | Self-identified/claimed whistleblower. UAPI does not independently verify insider status — see methodology. |
| `#src-anonymous-gov` | ANONYMOUS GOVERNMENT SOURCE | Unnamed government/official source |
| `#src-anonymous` | ANONYMOUS SOURCE | Unnamed non-government source |
| `#src-witness` | WITNESS ACCOUNT | Named or attributable witness |
| `#src-official` | OFFICIAL RECORD | Published government statement or document |
| `#src-foia` | FOIA RELEASE | Obtained via formal FOIA request |
| `#src-leaked` | LEAKED DOCUMENT | Document UAPI has analyzed; hosted externally. UAPI does not host leaked material. |
| `#src-press` | PRESS REPORT | Credible journalistic source |
| `#src-academic` | ACADEMIC | Peer-reviewed or institutional research |

### Incident Type (standard tags, not badge-rendered — used for filtering)
| Tag | Display |
|-----|---------|
| `#inc-aerial` | Aerial |
| `#inc-submersible` | Submersible / USO |
| `#inc-ground` | Ground / Landing |
| `#inc-space` | Space / Orbital |
| `#inc-trans-medium` | Trans-Medium |

### Witness Category (standard tags)
| Tag | Display |
|-----|---------|
| `#wit-military` | Military |
| `#wit-aviation` | Commercial Aviation |
| `#wit-law-enforcement` | Law Enforcement |
| `#wit-government` | Government / Official |
| `#wit-civilian` | Civilian |
| `#wit-multiple` | Multiple Witnesses |

### Geographic Region (standard tags)
| Tag | Display |
|-----|---------|
| `#geo-northamerica` | North America |
| `#geo-europe` | Europe |
| `#geo-asia` | Asia-Pacific |
| `#geo-middleeast` | Middle East |
| `#geo-latinamerica` | Latin America |
| `#geo-oceania` | Oceania |
| `#geo-international` | International / Multi-Region |
| `#geo-space` | Space / Orbital |

---

## Design System

### Palette
| Role | Hex |
|------|-----|
| Background | `#F4F1EA` (parchment) |
| Surface (cards) | `#EDEAE0` |
| Text primary | `#1A1A1A` |
| Text secondary | `#4A4A4A` |
| Accent / red | `#9B1C1C` |
| Border | `#C8C4B8` |
| FOIA / Declassified green | `#2D5A27` |
| Cold case blue | `#2C4A6E` |
| Pending amber | `#8B6914` |

### Typography
| Role | Font |
|------|------|
| Headlines | Source Serif 4 (Google Fonts) |
| Body | Source Serif 4 |
| Metadata / IDs / badges | IBM Plex Mono |
| Navigation / UI labels | IBM Plex Mono |

### Layout
- Max content width: 1,100px
- Card grid: 3-col desktop, 2-col tablet, 1-col mobile
- Dense information hierarchy — document aesthetic, not magazine
- No decorative hero images; evidence photos only when directly relevant
- Navigation bar: document classification header aesthetic
- Footer: document footer aesthetic with site case reference number

### Conversion Mechanics (design-stage requirement)

**Full conversion funnel (SOTA 2026):**
1. Visitor arrives → classification bar + dossier aesthetic establishes credibility immediately
2. Newcomer block (logged-out only) → explains UAPI, shows live archive stats (N Cases / N Reports / N Library), links to methodology. Dismissible via localStorage.
3. Reads a Case article → full, free, high-quality. Badge taxonomy visible throughout.
4. Sees Newsletter CTA inline → copy: "Stay ahead of the next disclosure." — free subscribe. JTBD-aligned, benefit not feature.
5. Sees Report preview at bottom of Case → title + 30-word excerpt + "INVESTIGATOR ACCESS" + $20/mo OR $18 one-time (equal prominence). First view = full card. Repeat views = compact one-liner (frequency cap via sessionStorage).
6. Sees AI teaser band below content sections → "Clearance Tier — AI Research Assistant — Founding Rate $35/mo →"
7. Clicks Search → logged-out → gate modal ("Create free account to search the database") → highest-intent signup touchpoint.
8. Returns via newsletter → gets full Dispatch + teaser of upcoming Report → clicks through → Report gate shows **both Supporter ($5 early access) AND Investigator ($20 all reports)**. $18 a-la-carte equally prominent.
9. Visits `/reports` → sees ALL reports in locked-but-visible list. Archive counter shows total ("47 REPORTS IN ARCHIVE"). Locked cards show title + 20-word excerpt behind blur overlay + "$18 this report" / "$20/mo all reports".
10. Clicks AI nav button → gate page → capability preview with redacted example queries → founding rate lock CTA.

Every free article must include:
- Email capture (newsletter CTA) above the fold on mobile, inline after first section on desktop
- Report preview hook at bottom of each Case article
- **Two-tier gate at every report paywall: Supporter ($5 early access) + Investigator ($20 all reports) + $18 one-time purchase. All three options equally prominent.**
- Newsletter landing page linked from nav
- **Search gate:** Search bar visible to all. Logged-out users who trigger it see a "Create free account to search the database" modal. Primary free account acquisition driver.

**Affiliate disclosures (FTC 16 CFR Part 255 required):**
- Library affiliate links (Amazon Associates) disclosed in Library page header and site footer
- Any Case article with an affiliate book link: "[Affiliate]" inline label
- Methodology page must include full affiliate disclosure policy

**No advertising:** Zero ad network integrations. No Google AdSense, no programmatic. Removes ~6-10 external DNS requests and the primary source of Core Web Vitals degradation. Revenue from memberships, reports, and affiliate only.

**Homepage newcomer orientation block (required):**
Above the section grid, logged-out visitors only. Compact block: what UAPI is + live archive stats (Cases/Reports/Library counts pulled live from Ghost) + methodology CTA. Dismissible (localStorage). Logged-in members never see it.

**Newsletter spec:**
The UAPI newsletter is a free bi-weekly email: (1) one Dispatch roundup of the most significant UAP news since the last issue, (2) one badge-annotated Case excerpt (free), (3) a one-paragraph preview of the upcoming Report with subscribe CTA. It is the conversion engine between free readers and Investigator subscribers. Copy direction: "Stay ahead of the next disclosure." Content is distinct from the site — curated summary, not a repost.

### Cross-Index Visual Treatment
When speculative content links to official sources (or vice versa), the link block must display:
- Label: "RELATED OFFICIAL SOURCES" or "RELATED ANALYSIS"
- Disclosure line: "Links indicate topical relevance, not evidentiary endorsement."
- Visual treatment must be clearly subordinate to the article body — not presented as supporting evidence

---

## Navigation Structure

```
[UAPI CLASSIFICATION HEADER — document aesthetic, context-specific text on /reports and /ai-assistant]

UAPI | Cases  Reports  Dispatches  Library  Researchers  About  |  [AI ●]  [⊕ SEARCH]  [SUBSCRIBE]

[footer]
UAP INVESTIGATIONS — CASE REF: UAPI-2026 — uapinvestigations.com — METHODOLOGY: UAPINVESTIGATIONS.COM/ABOUT
```

**Nav zones:**
- Left: UAPI wordmark (links to homepage)
- Center: section links (Cases, Reports, Dispatches, Library, Researchers, About)
- Right: action buttons — AI feature, Search, Subscribe/Account

**AI button placement:** Right-side actions area, NOT in the section nav list. The AI feature is a product tier, not a content section. Visually distinct from nav links: bordered button with pulsing indicator dot.
- For Clearance members: `[AI ●]` with pulsing red dot (live/active signal)
- For all others: `[AI ●]` with gray dot (locked signal) → links to `/ai-assistant` FOMO gate

**AI page URL:** `/ai-assistant` — Ghost Page with `custom-ai` template assigned.

**Member state in nav actions (right side):**
- Logged out: `[SUBSCRIBE]` CTA button (red, prominent)
- Logged in: `[SUPPORTER]` / `[INVESTIGATOR]` / `[CLEARANCE]` tier badge + `[ACCOUNT]` link
  - Tier badge rendered via CSS `data-member-tier` attribute on `<html>` — zero HBS evaluation overhead
  - Color coding: CLEARANCE = red, INVESTIGATOR = FOIA green, SUPPORTER = gray
  - Psychological function: reinforces identity ("I am an Investigator") → reduces churn

---

## Community Forum
- Open to all tiers (including free)
- Supporter tier gets "VERIFIED SUPPORTER" forum badge
- Investigator and Clearance get additional status indicators
- Moderation plan required before launch (see Phase 1)
- Platform TBD (Ghost comments + external forum, or dedicated forum software)

---

## Technical Stack

| Component | Solution | Phase |
|-----------|---------|-------|
| CMS | Ghost 6.x (DigitalOcean, self-hosted) | Live |
| Email | Gmail SMTP (configured) | Live |
| Theme | Custom dossier theme (this build) | Phase 1 |
| Memberships + payments | Stripe via Ghost | Phase 1 |
| Individual report sales | Ghost + Stripe (same stack) | Phase 1 |
| SEO (schema, metadata, sitemap) | Theme-native | Phase 1 |
| Library filter UI | Client-side JS | Phase 1 |
| Community forum | TBD (Ghost comments or dedicated) | Phase 1 |
| Site search | Algolia (free tier) — faceted search across all sections, filterable by badge, date, incident type, geographic region, evidence quality simultaneously. Ghost native search as fallback. **Gated: free account required to search.** Logged-out users who trigger search see a "Create free account to search the database" modal. Ghost member detection handles this in theme JS. | Phase 1 |
| Analytics | Ghost built-in + Plausible | Phase 2 |
| Dispatch automation | Cron + RSS → draft queue | Phase 2 |
| Affiliate links | Amazon Associates | Phase 2 |
| AI news feed (Clearance) | X API + keyword tracking | Phase 3 |
| Research AI (Clearance) | Custom RAG over UAPI corpus (OpenAI Assistants API or Perplexity API) | Phase 3 |
| Member research repository (Clearance) | Custom | Phase 3 |
| Font delivery | Self-hosted woff2 via @font-face in tokens.css (no Google Fonts DNS call) | Phase 1 |
| CDN + caching | Cloudflare with Cache Rules: static assets = 1yr edge TTL, HTML = 30min edge TTL | Phase 1 |
| AI gate page | `/ai-assistant` — Ghost Page with custom-ai.hbs template. Gate for non-Clearance, confirmation for founding Clearance. | Phase 1 |

---

## Build Phases

### Phase 1 — Foundation
**Launch blockers (nothing publishes until these are done):**
- [ ] Methodology page written with specific badge criteria
- [ ] Community moderation plan + code of conduct written
- [ ] "UAPI does not host leaked documents" policy documented

**Phase 1 build tasks:**
- [x] Ghost CMS live
- [x] SSL + domain
- [x] Email (Gmail SMTP) configured
- [ ] Dossier theme built and deployed
- [ ] Membership tiers configured (Free / Supporter $5 / Investigator $20 / Clearance waitlist $35)
- [ ] Annual pricing configured for all paid tiers
- [ ] Stripe connected
- [ ] Founding-rate Clearance waitlist live
- [ ] SEO foundations: schema markup, meta tags, Open Graph, sitemap
- [ ] Library filter UI built
- [ ] Email capture + newsletter CTA integrated into theme
- [ ] Report preview hooks integrated into theme
- [ ] About/Methodology page complete
- [ ] Community forum set up with moderation tools
- [ ] Algolia search integration (index all content, faceted filters)
- [ ] Researcher profiles directory template built
- [ ] Seed content: 5-10 Cases, 10+ Library entries, 5 Dispatches, 10+ Researcher profiles

### Phase 2 — Monetization and Growth
- [ ] First bi-weekly report published
- [ ] Individual report sales ($18 each)
- [ ] Dispatch automation (RSS → draft queue, editorial review required)
- [ ] Amazon affiliate links in Library
- [ ] Plausible analytics
- [ ] 90-day paywall lift on reports (evergreen SEO)
- [ ] Upgrade cadence to weekly (milestone: 200 Investigator subscribers + 8 consecutive on-time reports)

### Phase 3 — AI Features (Clearance Tier)
- [ ] X API keyword tracking + push notifications
- [ ] Research AI (trained on UAPI public corpus)
- [ ] Member research repository
- [ ] Clearance tier goes live; founding rate locked for waitlist members

---

## Pricing Architecture Summary

| Product | Price | Notes |
|---------|-------|-------|
| Public | Free | Always free |
| Supporter (monthly) | $5/mo | |
| Supporter (annual) | $50/yr | 2 months free |
| Investigator (monthly) | $20/mo | |
| Investigator (annual) | $200/yr | 2 months free |
| Clearance (founding, monthly) | $35/mo | Waitlist; locks permanently |
| Clearance (founding, annual) | $350/yr | Waitlist; locks permanently |
| Individual report | $18 | Paywall lifts at 90 days |

**What a Report is (buyer-facing description):** Every bi-weekly Report is a structured investigation of a single incident, program, or pattern. Minimum 2,000 words. Includes: primary document review or annotated FOIA material, evidence quality assessment across all cited sources, cross-index to related Cases and official records, and an editorial conclusion. Not a news summary -- a dossier. Investigator subscribers receive all Reports. Individual purchase available at $18 per report.

---

## Open Questions (Resolved)
- Tip submission: contact form ✓
- Reports: web-only ✓
- Community: real forum (platform TBD — needs moderation plan before launch) ✓
- Affiliates: Amazon Associates only for now ✓
- Report cadence: bi-weekly launch, milestone-gated upgrade to weekly ✓
