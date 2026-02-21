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
| 1 | Supporter | $5/mo | $50/yr | Patronage tier: forum Verified badge, 24-hour early report access, monthly briefing email. Support framing — not feature framing. |
| 2 | Investigator | $20/mo | $200/yr | All weekly reports as they release (bi-weekly at launch), everything in Supporter |
| 3 | Clearance | $35/mo founding rate (locks permanently) | $350/yr founding rate | WAITLIST ONLY AT LAUNCH. AI news feed (X keyword tracking + push notifications), private AI research assistant, personal research repository, everything in Investigator. Features deliver within 12 months of launch or founding rate extends. |

**Tier notes:**
- Supporter is a patronage tier. Primary benefit is supporting independent UAP research. Secondary benefits are early access and community status.
- Community forum is open to ALL tiers including free. Supporter gets a verified forum badge.
- Clearance shown at launch as founding waitlist. $35/month rate locks permanently when features go live. Limited founding spots.
- Individual reports available a la carte at $18 each. Investigator subscription becomes obviously good value after first report.
- Annual plans available for all paid tiers. Annual = approximately 2 months free.

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

### 5. ABOUT / METHODOLOGY
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
Every free article must include:
- Email capture (newsletter CTA) above the fold on mobile, inline after first section on desktop
- Report preview hook at bottom of each Case article (teaser of most recent Report with paywall prompt)
- Membership tier prompt on any content with a paywall indicator
- Newsletter landing page linked from nav

**Homepage newcomer orientation block (required):**
Above the section grid, a single compact block that reads: what UAPI is, what the badge system means in one sentence, and a CTA to the methodology page. First-time visitors must be oriented before they hit content. Power users can ignore it.

**Newsletter spec:**
The UAPI newsletter is a free bi-weekly email that contains: (1) one Dispatch roundup of the most significant UAP news since the last issue, (2) one badge-annotated Case excerpt (free), (3) a one-paragraph preview of the upcoming Report with a subscribe CTA. It is the conversion engine between free readers and Investigator subscribers. Content is distinct from the site -- it is a curated summary, not a repost.

### Cross-Index Visual Treatment
When speculative content links to official sources (or vice versa), the link block must display:
- Label: "RELATED OFFICIAL SOURCES" or "RELATED ANALYSIS"
- Disclosure line: "Links indicate topical relevance, not evidentiary endorsement."
- Visual treatment must be clearly subordinate to the article body — not presented as supporting evidence

---

## Navigation Structure

```
[UAPI CLASSIFICATION HEADER — document aesthetic]

UAPI | Cases  Reports  Dispatches  Library  About

[Search] [Subscribe]

[footer]
UAP INVESTIGATIONS — CASE REF: UAPI-2026 — uapinvestigations.com — METHODOLOGY: UAPINVESTIGATIONS.COM/ABOUT
```

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
| Site search | Ghost native search + tag filtering across Cases, Dispatches, Library | Phase 1 |
| Analytics | Ghost built-in + Plausible | Phase 2 |
| Dispatch automation | Cron + RSS → draft queue | Phase 2 |
| Affiliate links | Amazon Associates | Phase 2 |
| AI news feed (Clearance) | X API + keyword tracking | Phase 3 |
| Research AI (Clearance) | Custom (trained on UAPI corpus) | Phase 3 |
| Member research repository (Clearance) | Custom | Phase 3 |

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
- [ ] Seed content: 5-10 Cases, 10+ Library entries, 5 Dispatches

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
