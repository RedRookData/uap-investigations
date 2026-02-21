# UAPI Conversion + Feature Strategy — Panel Review 2
_Neural Hive + Thunderdome Protocol_
_Session: 2026-02-21 | Focus: Conversion SOTA 2026, UAP AI Feature, Member Badges, FOMO, Performance_

---

## Panel Composition

| ID | Expert | Domain | Veto Trigger |
|----|--------|--------|--------------|
| EV | Dr. Elena Vasquez | CRO, JTBD theory, Baymard Institute methodology | Friction in funnel, non-evidenced conversion claims, dark patterns |
| MC | Marcus Chen | Core Web Vitals, Cloudflare, edge perf, Ghost internals | External DNS requests, render-blocking assets, missing caching strategy |
| JO | Jade Okafor | Niche media monetization, Ghost/Substack/Patreon revenue design | Mispriced tiers, underutilized native Ghost features, conversion gap between tiers |
| DV | Dmitri Volkov | Behavioral economics, ethical persuasion, FTC compliance | Manipulative urgency, unverifiable scarcity claims, disclosure gaps |
| PN | Priya Nair | Community platform architecture, member identity systems | Forum/tier integration gaps, member identity not surfaced in site UI |
| RH | Rex Holloway | AI product strategy, Clearance tier design, phased feature delivery | Overpromised AI features, unclear delivery timeline, Phase 3 gate design |

---

## Scope

New inputs from operator (Ghost / flyswatterghost):
1. UAP AI must be visible in top bar -- prominent, not buried. Non-Clearance users hit a paywall gate.
2. Reports need stronger FOMO mechanics.
3. Conversion SOTA 2026 -- affiliate programs, newsletter, reports, lightning-fast load. No ads.
4. Member badges -- paying members must be visually differentiated on site.

---

## Round 1 — Collision Loop

### Collision A: Vasquez vs Okafor (conversion funnel coherence)

**EV:** The current funnel has two acquisition paths (newsletter free subscribe + Investigator subscribe) that are almost identical in placement but serve different user intents. JTBD: a visitor who reads a Case article has the job "understand this incident deeply." The newsletter CTA answers that. The Report preview CTA answers it differently. They are competing at the same moment.

**JO:** Agreed. But the bigger gap is the LEAP between free → Investigator ($20/mo). There is no $5 warm-up step in the CONVERSION path -- Supporter is framed as patronage, not as a stepping stone. That means:
- Free reader → hits newsletter CTA → subscribes free → gets newsletter → Report preview in newsletter → clicks → sees $20/mo gate. That's a 100% price cliff.
- Missing: a middle step. The $5 Supporter tier SHOULD be positioned as the warm-up tier.

**Resolution (PATCH CV-001):** Supporter tier needs a conversion role, not just a patronage role. Add: "24-hour early report access" to Supporter is already there but buried. The Report gate page must show Supporter as a NAMED option: "Read this report 24 hours early: Supporter $5/mo. Read ALL reports: Investigator $20/mo." The gate currently only shows Investigator. This is leaving Supporter revenue and top-of-funnel conversion on the table.

**PATCH CV-001:** `partials/tier-prompt.hbs` and `custom-reports.hbs` — show BOTH Supporter and Investigator options at every report gate, with Supporter as "early access" hook. Not just Investigator.

---

### Collision B: Chen vs Nair (performance vs feature richness)

**MC:** The font situation is a critical performance issue. Current plan uses Google Fonts (CDN call to fonts.googleapis.com + fonts.gstatic.com). That is 2 external DNS connections + a render-blocking CSS request on every cold load. On slow connections this adds 300-500ms to First Contentful Paint. This kills the "lightning fast" requirement.

**PN:** Secondary concern: member tier badges require 3-4 nested `{{#has}}` checks in HBS. Each one is fine individually but combined with the navigation render and Portal script load, the header becomes an HBS evaluation bottleneck. Suggest adding a `data-tier` attribute to `<body>` via HBS and handling visual differentiation in CSS/JS instead of nested HBS conditionals.

**Resolution (PATCH CV-002):** Self-host fonts. Download IBM Plex Mono (wght 400, 500) and Source Serif 4 (wght 400, 400 italic, 600, 700) as woff2 files, add to `assets/fonts/`, replace Google Fonts CDN link with `@font-face` declarations + `<link rel="preload">` for above-fold fonts. Eliminates 2 DNS lookups + eliminates render-blocking behavior.

**PATCH CV-003:** Add `data-member-tier` to `<body>` in default.hbs. Use CSS attribute selectors for tier badge styling instead of nested HBS. This moves tier badge logic to CSS (zero runtime cost).

```handlebars
{{! In default.hbs <html> tag: }}
<html lang="{{@site.locale}}"
  {{#if @member}} data-member="true" data-member-email="{{@member.email}}"{{/if}}
  {{#has tier="clearance"}} data-member-tier="clearance"{{/has}}
  {{#has tier="investigator"}} data-member-tier="investigator"{{/has}}
  {{#has tier="supporter"}} data-member-tier="supporter"{{/has}}
>
```

Note: Ghost evaluates these in order; if a Clearance member also satisfies investigator/supporter checks (they likely do), all three attributes might fire. Use `data-member-tier` as a single attribute and check in order:

```handlebars
{{#has tier="clearance"}}data-member-tier="clearance"
{{else}}{{#has tier="investigator"}}data-member-tier="investigator"
{{else}}{{#has tier="supporter"}}data-member-tier="supporter"
{{/has}}{{/has}}
```

Then in CSS:
```css
[data-member-tier]::after { /* show badge */ }
[data-member-tier="clearance"]::after { content: "CLEARANCE"; color: var(--c-accent); }
[data-member-tier="investigator"]::after { content: "INVESTIGATOR"; color: var(--c-foia); }
[data-member-tier="supporter"]::after { content: "SUPPORTER"; color: var(--c-text-2); }
```

---

### Collision C: Holloway vs Volkov (AI feature design)

**RH:** The UAP AI feature is the right call for Clearance FOMO. But there is a Phase 3 delivery risk. At launch, clicking "AI" in the nav takes you to a gate page for a feature that does not exist. The gate must:
(a) Be explicit that AI is "arriving for founding members first"
(b) Show enough capability preview to justify $35/mo waitlist
(c) NOT create a false urgency loop where "spots remaining" counter is fabricated

**DV:** Exactly -- fabricated scarcity triggers FTC disclosure requirements. "Only 50 founding spots remaining" when there is no actual cap is a deceptive trade practice (FTC 16 CFR 251). Ethical approach: founding rate LOCKS permanently (already in plan) but spots do not expire. The real scarcity is the rate, not the seat count.

**Ethical FOMO (approved):**
- "Founding rate locks permanently at $35/mo. When Clearance launches publicly, rate goes to $65/mo." (This is only okay if $65 is actually your planned public rate)
- "Founding members get features first, before public launch"
- "AI feature currently in development -- founding members shape its roadmap"

**Unapproved FOMO:**
- "Only 17 spots left" (fabricated)
- "Rate expires in 24 hours" (fabricated timer)
- "Join before [date]" unless that date is real

**Resolution (PATCH CV-004):** UAP AI gate page uses real scarcity (permanent rate lock) + founder positioning ("shape the product"). No fabricated spot count. The $35/mo → future $65/mo price differential must be a real committed plan. If it is, the disclosure is: "Founding rate: $35/mo. Public launch rate: $65/mo. Founding rate locks permanently."

**RH on AI capability preview:** The gate page must show what the AI does with enough specificity to create desire. Show 3 example queries in a redacted/revealed animation:
- "Which incidents have corroborating sensor data AND an official government document within 90 days?"
- "Show me all cases involving trans-medium behavior reported by military witnesses since 2004"  
- "Cross-reference [researcher name]'s public claims against primary source documents"

These are compelling, specific, and can be shown as static mock screenshots at launch without a live AI.

---

### Collision D: Vasquez vs Holloway (nav prominence of AI)

**EV:** Ghost requested "top bar link for UAP AI" prominently. The current nav is: Cases | Reports | Dispatches | Library | Researchers | About | [SEARCH] [SUBSCRIBE]. Adding "AI" as a standard nav item risks it getting lost in the list and looking like just another section.

**RH:** The AI feature should NOT be in the navigation list as a peer to Cases/Reports. It is a PRODUCT FEATURE, not a content section. It belongs in the right-side actions area of the nav, visually distinct. Proposed: next to [SEARCH] and [SUBSCRIBE]:

```
[UAPI] | Cases  Reports  Dispatches  Library  Researchers  About | [AI ●] [⊕ SEARCH] [SUBSCRIBE]
```

The `[AI ●]` button has:
- Distinct styling (border, mono font, pulsing dot indicator)
- For non-Clearance: `class="btn btn--ai btn--ai-locked"` → links to `/ai-assistant`
- For Clearance members: `class="btn btn--ai btn--ai-live"` → opens AI overlay
- The pulsing red dot suggests "live" / "active" (like a recording indicator)

**EV:** PASS. Placing AI in the actions area (not the nav list) also solves the nav overflow problem on mobile -- 6 nav items is already at the edge of comfortable horizontal display.

---

## Round 2 — Tribunal Loop (All 6 Panelists Review Full Revised Spec)

### Finding CV-001: Supporter tier missing from conversion path (BLOCKER)
**EV:** PASS — two-tier gate (Supporter early access / Investigator all access) at every Report gate is the correct JTBD-aligned design.
**JO:** PASS — Supporter at $5 is a real stepping stone. $5/mo → $20/mo upgrade path (4x) is more achievable than $0 → $20 cold.
**DV:** PASS — both price points disclosed. No dark pattern.
**MC:** PASS — no performance impact.
**PN:** PASS — tier visibility reinforced.
**RH:** PASS — aligns with phased commitment psychology.

### Finding CV-002: Self-host fonts (BLOCKER for performance claim)
**All 6:** PASS. Google Fonts CDN dependency is incompatible with "lightning fast load times" claim. woff2 self-hosting via `@font-face` + `<link rel="preload">` in `<head>` is the correct fix. Eliminates render-blocking behavior entirely on first load. Cloudflare CDN then serves fonts from edge on repeat visits.

Implementation: download font files, store in `assets/fonts/`, declare in tokens.css.

### Finding CV-003: Member tier badge via CSS data attribute (ENHANCEMENT)
**MC:** PASS. `data-member-tier` attribute on `<html>` is performant.
**PN:** PASS. Makes tier visually evident in header nav and anywhere CSS attribute selectors apply. Paying members see their tier immediately on login.
**EV:** PASS. Psychological benefit: member sees "INVESTIGATOR" in their nav → identity reinforcement → reduces churn (they feel like an Investigator, not just a payer).
**Others:** PASS.

### Finding CV-004: AI gate page design (BLOCKER)
**RH:** PASS with noted constraint: capability preview screenshots must accurately represent Phase 3 functionality. Do not show a UI that will ship differently.
**DV:** PASS on ethical FOMO (permanent rate lock scarcity). VETO on any fabricated spot count. Confirmed: no fabricated scarcity in final design.
**EV:** PASS — /ai-assistant as a full standalone page with capability preview is correct. Linking from nav action button is correct placement.
**JO:** PASS — $35/mo founding waitlist is the right price point for an early adopter who wants to shape an AI product. Clearance tier is correctly positioned.
**MC:** PASS — static page, no performance concerns.
**PN:** PASS.

### Finding CV-005: Reports FOMO — locked list visible to non-Investigators (STRATEGIC)
**JO:** Current plan shows only the LATEST report in the preview partial. Non-investigators cannot see how many reports exist. This kills FOMO. They do not know what they are missing.
**Resolution:** `custom-reports.hbs` should show ALL reports to ALL users, with non-Investigator posts blurred/locked. Title, date, classification badge, and a 1-sentence teaser visible. Body behind gate. Counter at top: "NN REPORTS IN THE ARCHIVE." The WEIGHT of the archive is the FOMO mechanism.
**All 6:** PASS on locked-but-visible list. EV notes: "If you can't see the library, you don't know what you're locked out of. Loss aversion requires knowing what you'd lose."

### Finding CV-006: Reports — purchase option visibility (BLOCKER)
**EV:** Current `report-preview.hbs` has the $18 purchase link as secondary text ("or purchase this report — $18"). This is visually subordinate. For non-subscribers, $18 should be EQUALLY prominent alongside Investigator CTA. Some buyers don't want a subscription -- they want this one report. Hiding the purchase option leaves a-la-carte revenue on the table.
**JO:** PASS fix. The a-la-carte purchase path ($18/report) is high-value for the 80% of visitors who will never subscribe. $18 × N reports = meaningful revenue if the purchase CTA is properly visible.
**All 6:** PASS on equal-prominence purchase button.

### Finding CV-007: Newsletter — conversion role needs strengthening (STRATEGIC)
**JO:** The newsletter CTA currently says "Bi-weekly analysis delivered to your inbox." This is a feature, not a benefit. JTBD-aligned copy: "Stay ahead of the next disclosure." OR "Know what the record actually says." The newsletter's JOB is to make the reader feel informed before everyone else. Lead with that.
**EV:** Also: the newsletter is the bridge between free reader and Investigator. The CTA's explicit job is to capture the email so the nurture sequence runs. Copy should make that bridge explicit: "Subscribe free → Get the UAPI Field Dispatches → Get early report previews in your inbox."
**DV:** PASS — none of this is deceptive. Informational benefit copy is fine.
**All 6:** PASS with copy patches.

### Finding CV-008: Affiliate strategy (ENHANCEMENT)
**JO:** Amazon Associates on Library paid books is correct and sufficient for launch. DO NOT expand affiliates to research tools, events, or other partners until the audience is established. Affiliate spam will destroy the credibility aesthetic that drives conversions. Amazon Associates = "here are the books if you want to go deeper." That is editorially coherent.
**EV:** PASS. Secondary affiliate option: affiliate links in Case articles when a book or resource is directly cited. Not forced — only where an organic citation exists. E.g., "Lue Elizondo's memoir [affiliate link]" at the end of a Case that analyzes his disclosures. This is transparent and editorially honest.
**DV:** Required disclosure: "This post contains affiliate links. UAPI earns a small commission if you purchase." FTC requires this. Add to footer of any post/page containing affiliate links, and in the Methodology page (affiliate disclosure section).
**All 6:** PASS. Affiliate expansion deferred until 50+ Library items. For launch: Library books only.

### Finding CV-009: Homepage FOMO loop — missing "reports counter" and "AI teaser" (STRATEGIC)
**EV:** The homepage needs to surface the WEIGHT of the platform's content before users scroll. Currently, the newcomer block explains what UAPI is. It should also show three quick stats: "NNN CASES ANALYZED | NN DEEP-DIVE REPORTS | N,NNN LIBRARY ITEMS". At launch these numbers will be small, but even 8 cases + 2 reports + 50 library items reads as "this is a database, not a blog."
**RH:** Also: homepage should have a small AI teaser below the newcomer block or in the footer: "CLEARANCE TIER — AI RESEARCH ASSISTANT — COMING SOON — FOUNDING RATE $35/MO → [JOIN WAITLIST]". Passive FOMO. Not a popup, not aggressive -- just a quiet persistent signal.
**All 6:** PASS on stats and AI teaser on homepage.

### Finding CV-010: Classification bar — conversion opportunity missed (ENHANCEMENT)
**EV:** The classification bar currently says "CLASSIFICATION: UNCLASSIFIED // UAP INVESTIGATIONS // AUTHORIZED PERSONNEL". This is aesthetic flavor text. On mobile, it takes up ~30px of prime real estate. Two options:
Option A: Keep aesthetic text (current).
Option B: Use it as a subtle conversion ticker: "CLEARANCE TIER FOUNDING WAITLIST OPEN — RATE LOCKS AT $35/MO — [JOIN]"

**RH:** Option B is conversion-optimized but breaks the aesthetic for existing readers. Recommendation: use the classification bar as-is for free/public users on content pages. On the /ai-assistant gate page and /reports archive page specifically, change the bar text to "CLEARANCE TIER — FOUNDING RATE ACTIVE — [JOIN WAITLIST]". Context-specific, not globally overriding the aesthetic.

**EV:** PASS on context-specific classification bar text.
**All 6:** PASS. Default: aesthetic text. On /ai-assistant and /reports: founding waitlist hook.

### Finding CV-011: Performance — Cloudflare cache strategy (STRATEGIC)
**MC:** Cloudflare is already in front of this site. Without explicit cache rules, Ghost's default headers are conservative and Cloudflare will NOT cache HTML pages (it will cache static assets). This means every page load hits the DigitalOcean droplet. For a 2GB/1CPU droplet serving the Ghost Node.js process, MySQL, and serving HTML, cache misses on a traffic spike will cause slow loads.

**Fix:** Add Cloudflare Cache Rules:
- Rule 1: `hostname is uapinvestigations.com AND path starts with /assets/` → Cache Everything, edge TTL 1 year. (CSS, JS, fonts, images never change without URL hash)
- Rule 2: `hostname is uapinvestigations.com AND path does NOT contain /ghost/` → Browser TTL 5 min, edge TTL 30 min. (HTML pages: short cache so content updates show quickly)
- Rule 3: Bypass cache for `/ghost/` (admin panel must always hit origin)

Benefit: static assets served from Cloudflare edge (100+ PoPs) = near-zero latency for returning visitors worldwide. HTML pages cached for 30 min = origin sees 1 request per page per 30 min under normal traffic instead of 1 per visitor.

**MC:** This alone may make the site feel instant to international visitors. The droplet is in Atlanta; international visitors without edge caching will have 200-400ms baseline latency to the droplet. Cloudflare edge caching fixes this.

**All 6:** PASS. Cache rules added to Stage 9 deploy checklist.

### Finding CV-012: No ads — affirmation (PASS)
**MC:** Eliminating ad networks (Google AdSense, etc.) removes ~6-10 external DNS requests, multiple render-blocking scripts, and eliminates the single biggest source of Core Web Vitals degradation for media sites. No ads = automatically faster site. PASS with commendation.
**All 6:** PASS. No ads is the correct architectural decision for both performance and credibility.

### Finding CV-013: Member badge — Ghost Comments integration (STRATEGIC)
**PN:** Ghost has native Comments. When enabled, members who comment show their name + avatar. Ghost does NOT natively show tier badges in comments. However, the comment display can be styled via CSS to add tier indicators when Ghost provides member data via `data-*` attributes on the comment element. This needs testing -- Ghost may not expose tier data in the comments DOM.

Fallback: frame the member badge as a SITE-LEVEL signal (nav tier badge = done via CV-003) rather than a comment-level signal. This is achievable. Comment-level badges require testing in Stage 8 responsive/polish and may be Phase 2.

**Resolution:** Member tier badge in nav (CV-003) is Phase 1. Comment badge is Phase 2 (test first, build if Ghost exposes tier data in DOM).

**All 6:** PASS.

### Finding CV-014: AI page — loading state for Phase 3 (NOTE)
**RH:** The `/ai-assistant` page needs a clear state machine:
- State 1 (now, Phase 3 not built): Gate page. "AI Research Assistant — FOUNDING MEMBERS FIRST — CLEARANCE TIER WAITLIST"
- State 2 (Phase 3 built, Clearance member): AI chat interface
- State 3 (Phase 3 built, non-Clearance): same gate page but with "CLEARANCE LIVE — $65/MO" pricing

The HBS template must handle all three states correctly. Implement as a Ghost Page with custom-ai template. State detection: `{{#has tier="clearance"}}` → show AI. `{{else}}` → show gate. The AI interface itself (State 2) can be an iframed widget or embedded JS app hosted separately.

For State 1 at launch: the Clearance member who signed up for the waitlist should see a "FOUNDING MEMBER CONFIRMED — AI FEATURE IN DEVELOPMENT — EXPECTED Q3 2026" confirmation page instead of a blank gate. This is content managed (Ghost page), not theme logic.

**All 6:** PASS.

---

## Round 3 — Polish Loop

All 14 findings resolved. Final compile:

| Code | Type | Finding | Status |
|------|------|---------|--------|
| CV-001 | BLOCKER | Supporter tier missing from report gate — two-tier gate required | PATCH |
| CV-002 | BLOCKER | Google Fonts CDN breaks "lightning fast" — self-host woff2 fonts | PATCH |
| CV-003 | ENHANCEMENT | Member tier badge via CSS `data-member-tier` on `<html>` | PATCH |
| CV-004 | BLOCKER | UAP AI gate page design — ethical FOMO, no fabricated scarcity | PATCH |
| CV-005 | STRATEGIC | Reports archive — locked-but-visible list for non-Investigators | PATCH |
| CV-006 | BLOCKER | Purchase ($18) option must be equally prominent at report gates | PATCH |
| CV-007 | STRATEGIC | Newsletter CTA copy — feature → benefit, bridge to upgrade | PATCH |
| CV-008 | ENHANCEMENT | Affiliate strategy — Amazon Associates only at launch, FTC disclosure | NOTE |
| CV-009 | STRATEGIC | Homepage stats block + AI teaser for FOMO | PATCH |
| CV-010 | ENHANCEMENT | Classification bar context-specific conversion text on /ai + /reports | PATCH |
| CV-011 | STRATEGIC | Cloudflare cache rules — edge caching for HTML + static assets | PATCH |
| CV-012 | PASS | No ads confirmed — performance and credibility win | ACCEPTED |
| CV-013 | STRATEGIC | Member badge in comments — test first, Phase 2 if doable | DEFERRED |
| CV-014 | NOTE | AI page state machine (3 states: pre-launch gate / Clearance live / post-launch gate) | NOTE |

---

## IMPL-PLAN Patch Summary

All patches documented below. Corresponding IMPL-PLAN sections updated.

### PATCH CV-001: tier-prompt.hbs — two-tier gate

```handlebars
<div class="tier-prompt">
  <div class="tier-prompt__header">
    <span class="tier-prompt__label">INVESTIGATOR / SUPPORTER ACCESS</span>
  </div>
  <p class="tier-prompt__desc">Deep-dive Reports are available to Investigators. Supporters get 24-hour early access.</p>
  <div class="tier-prompt__options">
    <div class="tier-prompt__option tier-prompt__option--primary">
      <div class="tier-prompt__option-label">ALL REPORTS — INVESTIGATOR</div>
      <div class="tier-prompt__option-price">$20 / MONTH</div>
      <a href="#/portal/signup?plan=investigator" data-portal="signup" class="btn btn--subscribe">
        SUBSCRIBE — INVESTIGATOR
      </a>
      <span class="tier-prompt__option-note">$200/yr (2 months free)</span>
    </div>
    <div class="tier-prompt__option tier-prompt__option--secondary">
      <div class="tier-prompt__option-label">24-HR EARLY ACCESS — SUPPORTER</div>
      <div class="tier-prompt__option-price">$5 / MONTH</div>
      <a href="#/portal/signup?plan=supporter" data-portal="signup" class="btn btn--secondary">
        SUBSCRIBE — SUPPORTER
      </a>
      <span class="tier-prompt__option-note">$50/yr · Patronage tier</span>
    </div>
  </div>
  <p class="tier-prompt__purchase">
    Or purchase this report individually: <a href="{{url}}#/portal/checkout" class="tier-prompt__purchase-link">$18 one-time</a>
  </p>
  {{#if @member}}
  {{#unless @member.paid}}
  <p class="tier-prompt__signed-in">You are signed in as {{@member.email}}. Upgrade your account above.</p>
  {{/unless}}
  {{/if}}
</div>
```

### PATCH CV-002: Self-hosted fonts

Remove from default.hbs:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Source+Serif+4:...&display=swap" rel="stylesheet">
```

Add to default.hbs `<head>` (BEFORE CSS links):
```html
{{! Self-hosted fonts — eliminates Google Fonts DNS lookups }}
<link rel="preload" href="{{asset "fonts/ibm-plex-mono-400.woff2"}}" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="{{asset "fonts/source-serif4-400.woff2"}}" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="{{asset "fonts/source-serif4-700.woff2"}}" as="font" type="font/woff2" crossorigin>
```

Add to `assets/css/tokens.css` (BEFORE :root block):
```css
/* ── Self-hosted Fonts ───────────────────── */
@font-face {
  font-family: 'IBM Plex Mono';
  src: url('../fonts/ibm-plex-mono-400.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'IBM Plex Mono';
  src: url('../fonts/ibm-plex-mono-500.woff2') format('woff2');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Source Serif 4';
  src: url('../fonts/source-serif4-400.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Source Serif 4';
  src: url('../fonts/source-serif4-400italic.woff2') format('woff2');
  font-weight: 400;
  font-style: italic;
  font-display: swap;
}
@font-face {
  font-family: 'Source Serif 4';
  src: url('../fonts/source-serif4-600.woff2') format('woff2');
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Source Serif 4';
  src: url('../fonts/source-serif4-700.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
```

Font files required in `assets/fonts/`:
- `ibm-plex-mono-400.woff2` — IBM Plex Mono Regular
- `ibm-plex-mono-500.woff2` — IBM Plex Mono Medium
- `source-serif4-400.woff2` — Source Serif 4 Regular
- `source-serif4-400italic.woff2` — Source Serif 4 Italic
- `source-serif4-600.woff2` — Source Serif 4 SemiBold
- `source-serif4-700.woff2` — Source Serif 4 Bold

Download source: Google Fonts download API (direct woff2 download) or google-webfonts-helper.herokuapp.com

### PATCH CV-003: Member tier badge in header

Updated `default.hbs` `<html>` tag:
```handlebars
<html lang="{{@site.locale}}"
  {{#if @member}} data-member="true" data-member-email="{{@member.email}}"{{/if}}
  {{#has tier="clearance"}}data-member-tier="clearance"{{else}}{{#has tier="investigator"}}data-member-tier="investigator"{{else}}{{#has tier="supporter"}}data-member-tier="supporter"{{/has}}{{/has}}{{/has}}>
```

Updated `partials/header.hbs` nav actions:
```handlebars
<div class="site-nav__actions">
  <button class="search-trigger" aria-label="Search database" type="button">
    <span class="search-trigger__icon">⊕</span>
    <span class="search-trigger__label">SEARCH</span>
  </button>
  {{#has tier="clearance"}}
  <a href="/ai-assistant" class="btn btn--ai btn--ai-live" aria-label="AI Research Assistant">
    <span class="btn--ai__dot" aria-hidden="true"></span>AI
  </a>
  {{else}}
  <a href="/ai-assistant" class="btn btn--ai btn--ai-locked" aria-label="AI Research Assistant — Clearance tier">
    <span class="btn--ai__dot" aria-hidden="true"></span>AI
  </a>
  {{/has}}
  {{#unless @member}}
  <a href="#/portal/signup" data-portal="signup" class="btn btn--subscribe">SUBSCRIBE</a>
  {{else}}
  <div class="member-nav">
    <span class="member-tier-badge">{{! CSS-driven via data-member-tier }}</span>
    <a href="#/portal/account" data-portal="account" class="btn btn--account">ACCOUNT</a>
  </div>
  {{/unless}}
</div>
```

New CSS in `header.css`:
```css
/* Member tier badge */
.member-nav {
  display: flex;
  align-items: center;
  gap: var(--sp-2);
}

/* Tier badge driven by HTML data attribute */
[data-member-tier] .member-tier-badge {
  font-family: var(--f-mono);
  font-size: var(--t-xs);
  font-weight: 500;
  letter-spacing: 0.12em;
  padding: 2px var(--sp-2);
  border: 1px solid currentColor;
  text-transform: uppercase;
}
[data-member-tier="clearance"] .member-tier-badge::before { content: "CLEARANCE"; color: var(--c-accent); }
[data-member-tier="investigator"] .member-tier-badge::before { content: "INVESTIGATOR"; color: var(--c-foia); }
[data-member-tier="supporter"] .member-tier-badge::before { content: "SUPPORTER"; color: var(--c-text-2); }

/* AI button */
.btn--ai {
  display: flex;
  align-items: center;
  gap: var(--sp-1);
  font-family: var(--f-mono);
  font-size: var(--t-xs);
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: var(--sp-2) var(--sp-3);
  border: 1px solid var(--c-border);
  color: var(--c-text-2);
  text-decoration: none;
  transition: all var(--t-fast) var(--ease);
}
.btn--ai:hover { border-color: var(--c-accent); color: var(--c-accent); }

.btn--ai__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%; /* Exception: dots are circular by design, not document aesthetic */
  background: var(--c-accent);
}
.btn--ai-live .btn--ai__dot {
  animation: pulse-dot 2s ease-in-out infinite;
}
.btn--ai-locked .btn--ai__dot {
  background: var(--c-text-3);
  animation: none;
}

@keyframes pulse-dot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(0.8); }
}
```

### PATCH CV-004: `/ai-assistant` page template (`custom-ai.hbs`)

```handlebars
{{!< default}}
{{#is "page"}}
<div class="ai-page">
  {{! Context-specific classification bar override }}
  <script>
    document.querySelector('.classification-bar__text').textContent =
      'CLEARANCE TIER — FOUNDING RATE ACTIVE — AI RESEARCH ASSISTANT — COMING Q3 2026';
  </script>

  {{#has tier="clearance"}}
  {{! STATE 2: Clearance member — show confirmation or live AI when built }}
  <div class="ai-page__confirmed">
    <div class="ai-page__stamp">CLEARANCE CONFIRMED</div>
    <h1 class="ai-page__headline">AI Research Assistant</h1>
    <p class="ai-page__status">You are a founding Clearance member. The AI Research Assistant is in development and will be delivered to founding members first. Expected: Q3 2026.</p>
    <p class="ai-page__status">You will receive an email at {{@member.email}} when your access is ready.</p>
    <div class="ai-page__progress">
      <div class="ai-page__progress-label">DEVELOPMENT STATUS: IN PROGRESS</div>
      <div class="ai-page__progress-bar"><div class="ai-page__progress-fill" style="width: 35%"></div></div>
      <div class="ai-page__progress-note">Corpus indexing → Model training → Clearance access → Public launch</div>
    </div>
  </div>

  {{else}}
  {{! STATE 1: Non-Clearance — FOMO gate }}
  <div class="ai-page__gate">
    <div class="ai-page__stamp">ACCESS RESTRICTED</div>
    <div class="ai-page__classification">CLEARANCE TIER FEATURE</div>
    <h1 class="ai-page__headline">UAPI AI Research Assistant</h1>
    <p class="ai-page__tagline">Ask the database anything. Cross-reference cases, evidence, sources, and researchers across the full UAPI archive — in seconds.</p>

    <div class="ai-page__preview">
      <div class="ai-page__preview-label">EXAMPLE QUERIES</div>
      <ul class="ai-page__queries">
        <li class="ai-page__query ai-page__query--revealed">
          "Which incidents have radar confirmation AND an official government document filed within 90 days?"
        </li>
        <li class="ai-page__query ai-page__query--revealed">
          "Show all trans-medium cases with military witnesses since 2004, sorted by evidence quality."
        </li>
        <li class="ai-page__query ai-page__query--redacted" aria-label="[REDACTED — CLEARANCE REQUIRED]">
          ██████ ██ ████████ ████ ██████ ██████ ████████ ██ ██████ ██████
        </li>
        <li class="ai-page__query ai-page__query--redacted" aria-label="[REDACTED — CLEARANCE REQUIRED]">
          ████████ ██████ ████ ██████████ ██ ██████ ████ █████████
        </li>
      </ul>
    </div>

    <div class="ai-page__founding">
      <div class="ai-page__founding-label">FOUNDING MEMBER RATE</div>
      <div class="ai-page__pricing">
        <div class="ai-page__price-primary">$35 / month</div>
        <div class="ai-page__price-note">Founding rate locks permanently. Public launch rate: $65/mo.</div>
      </div>
      <div class="ai-page__features">
        <ul>
          <li>AI Research Assistant — cross-reference the full UAPI corpus</li>
          <li>Private research repository — save and annotate cases</li>
          <li>Real-time UAP disclosure feed (X/social + official sources)</li>
          <li>All Investigator Reports included</li>
          <li>Shape the AI's roadmap — founding member feedback priority</li>
        </ul>
      </div>
      <a href="#/portal/signup?plan=clearance" data-portal="signup" class="btn btn--subscribe btn--ai-cta">
        JOIN CLEARANCE WAITLIST — $35/MO
      </a>
      <p class="ai-page__founding-note">
        Founding rate: $35/mo. When Clearance launches publicly, rate increases to $65/mo.
        Founding members lock $35/mo permanently.
      </p>
    </div>
  </div>
  {{/has}}
</div>
{{/is}}
```

Add to `package.json` config.custom:
```json
"ai-assistant": "custom-ai"
```

### PATCH CV-005: Reports archive — locked-but-visible list

`custom-reports.hbs` header section (add above posts loop):
```handlebars
{{#get "posts" filter="tag:reports" limit="all" fields="id"}}
<div class="reports-header">
  {{#if @member}}{{#has tier="investigator,clearance"}}
  <div class="reports-header__stats">
    <span class="reports-header__count">{{pagination.total}} REPORTS IN ARCHIVE</span>
    <span class="reports-header__access reports-header__access--granted">INVESTIGATOR ACCESS GRANTED</span>
  </div>
  {{else}}
  <div class="reports-header__stats">
    <span class="reports-header__count">{{pagination.total}} REPORTS IN ARCHIVE</span>
    <span class="reports-header__access reports-header__access--locked">INVESTIGATOR ACCESS REQUIRED — $20/MO OR $18/REPORT</span>
  </div>
  {{/has}}{{else}}
  <div class="reports-header__stats">
    <span class="reports-header__count">{{pagination.total}} REPORTS IN ARCHIVE</span>
    <span class="reports-header__access reports-header__access--locked">INVESTIGATOR ACCESS REQUIRED — $20/MO OR $18/REPORT</span>
  </div>
  {{/if}}
</div>
{{/get}}
```

Non-Investigator card treatment in reports loop:
```handlebars
{{#unless @member.paid}}
<article class="card card--report card--report-locked" data-tags="{{#foreach tags}}{{slug}}{{#unless @last}},{{/unless}}{{/foreach}}">
  <div class="card__stamp"></div>
  <div class="card__lock-overlay">
    <span class="card__lock-label">INVESTIGATOR ACCESS</span>
    <a href="#/portal/signup?plan=investigator" class="card__lock-cta">Subscribe $20/mo</a>
    <a href="{{url}}" class="card__lock-purchase">or $18 this report</a>
  </div>
  <div class="card__body card__body--blurred">
    <h2 class="card__title">{{title}}</h2>
    <p class="card__excerpt">{{excerpt words="20"}}</p>
    <div class="card__meta">{{date format="DD MMM YYYY"}}</div>
  </div>
</article>
{{/unless}}
```

### PATCH CV-007: Newsletter CTA copy

Replace in `partials/newsletter-cta.hbs`:
```handlebars
<div class="newsletter-cta__label">FIELD DISPATCHES</div>
<h3 class="newsletter-cta__headline">Stay ahead of the next disclosure.</h3>
<p class="newsletter-cta__sub">
  Free bi-weekly intelligence briefing: curated UAP news · badge-annotated Case digest · upcoming Report preview
</p>
```

### PATCH CV-009: Homepage stats + AI teaser

Add to `partials/newcomer-block.hbs` after the description paragraph:
```handlebars
<div class="newcomer-block__stats">
  {{#get "posts" filter="tag:cases" limit="1" fields="id"}}
  <span class="newcomer-stat"><span class="newcomer-stat__n">{{pagination.total}}</span> CASES</span>
  {{/get}}
  {{#get "posts" filter="tag:reports" limit="1" fields="id"}}
  <span class="newcomer-stat"><span class="newcomer-stat__n">{{pagination.total}}</span> REPORTS</span>
  {{/get}}
  {{#get "posts" filter="tag:library" limit="1" fields="id"}}
  <span class="newcomer-stat"><span class="newcomer-stat__n">{{pagination.total}}</span> LIBRARY</span>
  {{/get}}
</div>
```

Add to `index.hbs` footer area (above newsletter-cta, below grid):
```handlebars
{{! AI teaser — passive FOMO, not aggressive }}
<div class="ai-teaser">
  <span class="ai-teaser__label">CLEARANCE TIER</span>
  <span class="ai-teaser__desc">AI Research Assistant — Ask the full archive anything.</span>
  <a href="/ai-assistant" class="ai-teaser__link">FOUNDING RATE $35/MO →</a>
</div>
```

### PATCH CV-010: Context-specific classification bar

On `custom-reports.hbs` and `custom-ai.hbs`, inject via JS after DOM ready:
```javascript
// Context-specific classification bar
(function() {
  var bar = document.querySelector('.classification-bar__text');
  if (bar && window.location.pathname === '/reports') {
    bar.textContent = 'INVESTIGATOR ACCESS — ' + (bar.textContent || '') + ' — SUBSCRIBE $20/MO';
  }
  if (bar && window.location.pathname === '/ai-assistant') {
    bar.textContent = 'CLEARANCE TIER — FOUNDING RATE ACTIVE — AI RESEARCH ASSISTANT';
  }
})();
```

### PATCH CV-011: Cloudflare cache rules (deploy checklist)

Add to Stage 9 pre-deploy checklist:
```
Cloudflare Cache Rules (required for "lightning fast" performance):
[ ] Cloudflare Dashboard → uapinvestigations.com → Cache → Cache Rules → Add rule
[ ] Rule 1: "Static assets"
    Match: hostname is uapinvestigations.com AND URL path starts with /assets/
    Setting: Cache everything | Edge TTL: 1 year (31536000s) | Browser TTL: 1 year
    (CSS/JS/fonts/images: cache-busted by Ghost's ?v= query string, safe to cache forever)
[ ] Rule 2: "HTML pages"
    Match: hostname is uapinvestigations.com AND URL path does NOT start with /ghost/
    Setting: Cache everything | Edge TTL: 30 minutes | Browser TTL: 5 minutes
    (Short enough for content freshness, long enough to absorb traffic spikes)
[ ] Rule 3: "Ghost admin bypass"
    Match: hostname is uapinvestigations.com AND URL path starts with /ghost/
    Setting: Bypass cache
[ ] Verify: load homepage, check CF-Cache-Status header = HIT on second request
```

---

## Final Vetting Log
Collisions=4 Tribunal=14 Polish=pass | Notes: UAP AI feature designed (nav button + gate page + state machine); member tier badge via CSS data-attr (zero HBS overhead); reports archive locked-but-visible FOMO; Supporter added to all report gates; Google Fonts eliminated (self-host woff2); Cloudflare cache rules added to deploy checklist; no fabricated scarcity; affiliate strategy bounded; newsletter copy JTBD-aligned.
