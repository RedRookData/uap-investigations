# EXPERT PANEL REVIEW — UAPI Site Plan
## Pre-Build Review Session — Before Theme or Feature Development Begins
## Adapted from RedRook Neural Hive + Thunderdome Protocols — SOTA 2026

---

## Panel Composition

**Ben Smith** — Founder, Semafor. Former EIC, BuzzFeed News. Built and scaled multiple digital investigative media operations. Focus: editorial credibility, content taxonomy, platform trust architecture, reader expectations for investigative platforms.

**Casey Newton** — Founder, Platformer. Former senior tech journalist, The Verge. One of the most-studied independent subscription media operators at scale. Focus: tier pricing, free-to-paid conversion, churn mechanics, what makes subscription editorial sustainable.

**Eliot Higgins** — Founder, Bellingcat. Pioneered open-source investigative methodology in contested information environments. Focus: credibility in speculative information spaces, source handling, research tooling, community trust for investigator audiences.

**Lue Elizondo / Chris Mellon Composite** — Former DoD UAP program insiders (AATIP, OSD). Represent the serious-researcher end of the UAP community. Focus: domain authenticity, whether the badge system and taxonomy serve actual researchers, content credibility within the specialist community.

**Patrick McKenzie (patio11)** — Stripe, Kalzumeus. Authority on growth, monetization, and SEO for subscription and content businesses. Focus: business viability, growth loops, pricing mechanics, what actually kills indie media at this scale.

**Dr. Kate Starbird** — University of Washington, CSCW Lab. Studies misinformation propagation, credibility signaling, and how information quality mechanisms succeed or fail in practice. Focus: misinformation risk, badge system robustness, legal exposure, community moderation burden.

---

## Phase 1: Independent Expert Analyses

Each expert reviewed the SITE-PLAN.md independently before cross-reference.

---

### Ben Smith — Editorial Architecture

**1. The methodology page is buried and it is the most important page on the site.**
The badge system is the entire credibility proposition of UAPI. But badges without published criteria are just decoration. "CORROBORATED" means nothing unless the methodology page explains exactly what corroboration requires — two independent sources that did not co-cite? Primary document plus secondary account? The methodology page is listed as a navigation item equivalent to "About." It should be the first thing new readers see, linked from every article, and written with enough specificity that a journalist could audit a badge assignment.

**2. "Cases" as the primary content label is correct but the word "Analysis" is missing.**
If Ghost is analyzing everything from tabloid rumors to DoD radar data, readers need one more signal: this platform is analytic, not reportorial. UAPI does not break news. It synthesizes, contextualizes, and evaluates. That positioning distinction matters for trust. The methodology page must make it explicit: "We do not break stories. We examine them."

**3. The free tier creates a cannibalization risk that needs addressing at the design stage.**
Free = all primary sources + full library. Paid (Investigator, $20) = reports. The question: can a reader get 80% of the value for free by reading the Cases (which are also analysis) plus the library? If Cases are free AND thorough, the reports need to be something structurally different — not just longer Cases, but a different format. Deeper primary document review, exclusive interviews, aggregated trend analysis across multiple incidents. That distinction needs to be explicit in the plan.

**4. Weekly reports is a trap for a solo or small operation.**
Weekly is correct as an aspiration and wrong as a launch commitment. The best subscription media operators — The Information, Platformer, Puck — do not commit to weekly until they have proven the production pipeline. Miss two weeks in month two and churn spikes. The plan should specify a launch cadence (bi-weekly) with an upgrade path to weekly when production is validated.

**5. "UAPI" as an agency acronym is the right call aesthetically but needs a spelled-out name that Google can find.**
"UAP Investigations" works for SEO. The dossier aesthetic works for brand. But the full name needs to appear in title tags and metadata. The plan does not address SEO at all until Phase 2. That is a mistake — domain authority and structured metadata should be baked into the theme from day one.

---

### Casey Newton — Subscription Business

**1. The Analyst tier ($7) has a near-zero value proposition as currently described.**
"Community access + discounts on individual reports" is not a reason to pay $7/month. Community access has value only if the community is already active and worth being in — which it is not at launch. Discounts on reports presupposes the reader already wants to buy reports but doesn't want to commit to $20/month — an edge case at best. This tier works only if reframed as a **support tier**: "You believe in independent UAP research. This is how you support it." Support framing ("I want to back this") converts better than feature framing ("here is what you get") for $5-10/month media tiers. Rename it "Supporter," price it at $5/month, and make it explicit that it is a patronage tier.

**2. Investigator ($20/month) for weekly reports is the right core product — but the math needs to hold.**
52 reports/year at $20/month = $240/year for subscribers. If reports are consistently worth $8-12 each (individually), the subscription is a clear value. If quality drops or cadence slips, the math inverts and churn follows immediately. The plan needs to specify: what is the minimum viable report? What is the quality floor below which UAPI will skip a week rather than publish something thin?

**3. Clearance ($50/month) at launch as "coming soon" is a conversion drag, not a preview.**
Showing a $50 tier that does not deliver its core features (AI feed, research AI, repository) at launch does two things: it tells potential Investigator subscribers that the $20 tier is a placeholder for something better, and it attracts exactly zero $50 subscribers. Options: (a) do not show Clearance until the features exist, or (b) show it as a founding-rate waitlist ("Join early: $35/month, locks in permanently when features launch"). Option (b) is better — it builds a waitlist, creates urgency, and the founding rate is a real benefit that rewards early commitment.

**4. Annual pricing is absent from the plan and it is a major retention mechanic.**
Monthly subscribers churn 3-5x more than annual. Offering annual pricing from day one (Investigator: $200/year = 2 months free; Clearance waitlist: $350/year locked in) is the single highest-leverage retention tool available. It should be in the plan before any other retention mechanism.

**5. The report-as-product and the report-as-subscription-benefit are in tension.**
Analyst tier gets "discounts on individual reports." Investigator tier gets "all reports." This means reports must be sold individually AND included in Investigator. That creates pricing complexity: a report sold for $15 individually vs included in a $20/month subscription means subscribers are getting reports at $4-5 each if they read 4/month. Individual report buyers will calculate this and convert to Investigator — which is fine, that is the point, but the plan should acknowledge this explicitly and design the individual report pricing accordingly.

---

### Eliot Higgins — Open Source Investigation / Research Platform

**1. The badge system is exactly what the open investigation community needs but it requires editorial governance documentation.**
Bellingcat took years to establish badge-equivalent credibility markers. UAPI can shortcut this only if the criteria are published, specific, and auditable. "CORROBORATED" needs a standard: what counts? Two independent primary sources? Primary document plus verified secondary? The methodology page is necessary but not sufficient — each article should display the specific evidence basis for its badge assignment, not just the badge.

**2. Leaked document handling creates liability and must be addressed before launch, not after.**
The "LEAKED DOCUMENT" source tag implies UAPI received, reviewed, and is characterizing a document as leaked. This creates: (a) potential legal exposure if the document is classified, (b) a chain-of-custody question (how did UAPI receive it?), and (c) a credibility question if the "leak" is fabricated. Bellingcat's protocol: analyze and link, never host. UAPI should adopt the same. The plan must specify that UAPI does not host leaked documents — it analyzes and links to independently hosted versions (Document Cloud, Archive.org, etc.).

**3. "WHISTLEBLOWER" as a source tag implies UAPI has verified a source's identity and whistleblower status.**
This is not what the tag means, but it is what readers will infer. Rename to "CLAIMED WHISTLEBLOWER" or, better, retire this tag entirely and replace it with "ANONYMOUS GOVERNMENT SOURCE" which is more precise and carries the same credibility signal without the legal implication of verified whistleblower status.

**4. Dispatch aggregation without editorial judgment becomes a noise machine.**
Bellingcat's early aggregation work degraded credibility when quantity outpaced editorial filtering. The plan describes "both manual and eventual automated" dispatch aggregation. The automated component should be framed as a draft queue requiring editorial review, not as a publication pipeline. Every Dispatch that publishes should have an editorial note, however brief.

**5. The research repository (Tier 3) is the most valuable long-term feature and it is underspecified.**
What does "personal research repository" mean in practice? Can members upload documents? Annotate existing UAPI content? Build their own case files? This feature, done well, becomes community infrastructure and creates lock-in that no other UAP platform offers. It should be specified early even if built late. What it cannot be: a shared Google Drive.

---

### Lue Elizondo / Chris Mellon Composite — UAP Domain Expert

**1. The badge taxonomy is missing the incident classification axis that the serious research community requires.**
The four current badge axes (classification level, case status, evidence quality, source type) are editorially correct. But researchers in this space filter primarily by incident type (aerial, submersible, ground, space), witness category (military, commercial aviation, law enforcement, civilian), and geographic region. Without these, UAPI's Cases section is less useful than existing community databases (NUFORC, MUFON) for the researchers Ghost most wants to attract. These do not need to be badges — they can be standard tags — but they need to exist.

**2. "EYES ONLY" as a classification badge will mislead non-specialist readers.**
Real EYES ONLY documents are not on public websites. Using this badge implies UAPI has access to genuinely restricted material, which it doesn't and shouldn't claim. Specialists will recognize it as an aesthetic choice; casual readers won't. The risk is two-directional: it either overclaims access (misleading) or reads as self-important branding (credibility hit with specialists). Replace with "LIMITED DISTRIBUTION" or "CONTROLLED RELEASE" — government-flavored but not claiming a real classification level.

**3. Primary sources being free is the single most important trust decision in the plan.**
The UAP research community has an allergic reaction to paywalled primary sources. They will share, cite, and promote UAPI if primary documents are freely accessible. They will ignore or actively oppose UAPI if the documents are gated. This is correctly specified in the plan and must not be changed.

**4. Weekly report cadence is achievable and appropriate for the current UAP information environment.**
Between Congressional activity, AARO releases, FOIA drops, international incidents, and whistleblower developments, there is consistently one depth-worthy story per week. The risk is not cadence — it is depth. A 500-word report is not a report. The quality floor should be 2,000 words minimum with at least one primary source component (document, statement, or structured secondary source).

**5. The cross-indexing of speculative with official content is the most important analytical feature UAPI can build.**
No existing platform does this rigorously. The ability to click from an official AARO document to speculative alternative analyses to community discussions — all with explicit credibility tags — would establish UAPI as the authoritative research hub within 12-18 months of launch. This feature needs to be a design-stage requirement, not an afterthought. The theme must support bidirectional links between Cases.

---

### Patrick McKenzie — Growth and Monetization

**1. The SEO asset embedded in this domain name is not mentioned in the plan and it should be.**
"uapinvestigations.com" is an exact-match domain for a high-intent search query in a growing topic category. Post-AARO, UAP search volume has grown significantly and competition for informational intent queries is low relative to most topics. This domain is a compounding asset: the earlier structured metadata, internal linking, and schema markup are built, the faster the organic growth compounds. This should appear in Phase 1, not Phase 2.

**2. The growth loop is not described and it needs to be.**
How does UAPI grow? Current plan: build content, add tiers, drive traffic later. That is not a growth loop — that is a publication schedule. The actual loop should be explicit: Free Case content ranks for UAP search queries → readers arrive via search → email capture (newsletter) at bottom of every free article → newsletter converts to paid via weekly report previews → paid converts upward via Clearance waitlist. Each stage of this funnel needs a conversion mechanism built into the theme from day one. Currently, none of these conversion points appear in the design spec.

**3. Annual pricing converts 3-5x better than monthly and is absent from the plan entirely.**
See Casey's note. This is a critical omission.

**4. The Dispatcher section (aggregated news) is actually a better SEO vehicle than original Cases during early growth.**
Dispatches with outbound links to primary sources get indexed quickly and signal topical authority to search engines. They also require less production time than original Cases. Moving Dispatch automation earlier (Phase 1 stretch goal, not Phase 2) would accelerate the organic growth engine. The additional benefit: it gives Ghost a way to publish consistently on weeks when a full original report is not ready.

**5. Individual report pricing needs to anchor above the Investigator monthly price.**
If Investigator is $20/month and includes all reports, individual reports must be priced at $15-20 each to make the subscription feel like clear value. If reports are individually $8, the subscription looks overpriced. Price individual reports at $18 and the $20/month subscription becomes obviously good value after the first report. This pricing architecture is not in the plan.

---

### Dr. Kate Starbird — Trust and Misinformation Risk

**1. The badge system has a circular corroboration problem that is not addressed.**
"CORROBORATED" signals that multiple sources agree. But in the UAP information environment, many secondary sources co-cite a single original claim. If UAPI marks something CORROBORATED because three outlets cover it, but all three outlets are drawing from the same primary claim, that badge is misleading. The methodology page must specify: corroboration requires independent sourcing, not independent coverage. This is a credibility-critical distinction.

**2. "ANECDOTAL" as an evidence quality badge will alienate military and aviation witnesses whose accounts carry institutional credibility.**
A Navy pilot's account is technically anecdotal but carries vastly more evidentiary weight than a civilian's backyard video. The "ANECDOTAL" label flattens this distinction and will generate legitimate criticism from within the UAP research community. Replace with "SINGLE WITNESS ACCOUNT" (more precise) or create a sub-tier: "SINGLE WITNESS — CREDENTIALED" vs "SINGLE WITNESS — UNVERIFIED." The credibility of the witness is separate from the corroboration status of the claim.

**3. The speculative-to-official cross-indexing creates a visual authority transfer risk that needs explicit design guidance.**
If a speculative article appears with "Related Official Sources" links, some readers will interpret the official sources as validating the speculative claim. This is not UAPI's intent but it is a predictable reader behavior. The design spec must include explicit visual treatment for these cross-links: they indicate topic relevance, not evidentiary support. This requires a design note and possibly a standard disclosure text.

**4. The "WHISTLEBLOWER" tag creates legal exposure regardless of intent.**
Even if UAPI intends this tag as "claimed whistleblower," the tag as currently specified implies UAPI has received, assessed, and verified a claim of insider disclosure. If a "whistleblower" source is later shown to be a fabricated source, and UAPI used this tag, UAPI's credibility suffers disproportionately. Retire this tag. Use "ANONYMOUS GOVERNMENT SOURCE" with a clarifying note. Preserve the concept but reduce the legal and credibility surface area.

**5. Community moderation is not addressed in the plan and it is a launch-blocking risk.**
UAP communities are exceptionally active and exceptionally prone to the following: coordinated flooding of speculative claims, personal attacks on witnesses, harassment of researchers with contrary views, and bad-faith engagement designed to discredit the platform. Launching a "real forum" community without a moderation plan, a code of conduct, and designated moderation capacity is not a Phase 2 question — it is a launch requirement. If the community goes badly in month one, it damages the platform permanently.

---

## Phase 2: Cross-Reference

### Consensus Findings (3+ experts agree)

**C1: Badge methodology must be public and specific before launch.**
Smith, Higgins, Starbird all flag this independently. The methodology page is necessary but not sufficient. Badge assignment criteria must be specific enough to be audited by a third party.
→ Action: Add badge criteria specification to methodology page requirements in SITE-PLAN.

**C2: "WHISTLEBLOWER" tag is a liability — retire or rename it.**
Higgins and Starbird independently reach this conclusion from different angles (legal exposure vs. credibility risk).
→ Action: Replace with "ANONYMOUS GOVERNMENT SOURCE." Document reasoning in methodology.

**C3: Weekly report cadence needs a quality floor and a contingency protocol.**
Smith, Casey, Lue all flag this from different angles (editorial, business, domain).
→ Action: Add to plan: minimum 2,000 words per report, explicit skip-week protocol when quality floor cannot be met, bi-weekly launch cadence with weekly upgrade path.

**C4: Annual pricing is absent and critical.**
Casey and patio11 independently identify this as a major omission.
→ Action: Add annual pricing to all tiers in SITE-PLAN.

**C5: Community moderation is unaddressed and is a launch risk.**
Starbird and Higgins both flag this.
→ Action: Add community moderation plan as a Phase 1 requirement, not Phase 2.

### Divergences

**D1: Weekly vs. bi-weekly launch cadence.**
Casey says bi-weekly to start. Lue says weekly is achievable and appropriate. Resolution: bi-weekly launch cadence with explicit upgrade milestone (500 paid subscribers triggers weekly). This respects both the production risk (Casey) and the domain opportunity (Lue).

**D2: Clearance tier visibility at launch.**
Casey says "coming soon" is a conversion drag. patio11 says show it with founding rate. No real conflict — both prefer the founding-rate waitlist approach over a static "coming soon" label. → Action: Clearance shows at launch as founding-rate waitlist ($35/month locked in, launches when features complete).

**D3: Dispatch automation timing.**
Higgins says editorial review is mandatory for every dispatch. patio11 says move automation earlier for SEO. No real conflict — automation generates draft queue, editorial review required before publish. → Action: Automation creates drafts. No auto-publish. This is already implied but needs to be explicit in plan.

### Unique High-Value Findings

**U1 (Lue): Incident classification tags are missing.**
The existing badge system has no incident type (aerial/submersible/ground/space), witness category, or geographic tags. These are the primary research filters for serious investigators. Adding them as standard tags (not badges) costs nothing at the theme stage and dramatically increases UAPI's utility for researchers.

**U2 (patio11): Growth loop is not designed in.**
No conversion mechanics appear in the theme design spec. Email capture, newsletter CTA, report preview hooks — none of these are in the current design. This needs to be added before theme build, not after.

**U3 (Starbird): Visual authority transfer risk from cross-indexing.**
Speculative articles cross-linked to official sources need explicit design treatment to prevent readers inferring official endorsement. Standard disclosure text required.

**U4 (Smith): "EYES ONLY" badge misleads readers.**
This was independently flagged by Lue as well (divergence: Lue says specialists see it as branding, Smith and Starbird say non-specialists will be misled). Verdict: rename. "LIMITED DISTRIBUTION" carries the same aesthetic without the false credibility claim.

---

## Phase 3: Thunderdome

### Thunderdome A — Analytical Findings

**Finding 1: Free tier (primary sources + library) cannibalizes paid tiers.**
- Falsification: If Investigator reports are structurally different from Cases (not just longer), cannibalization does not occur.
- Evidence: The plan does not currently specify the structural difference between a free Case and a paid Report.
- Alternative: Gate some library content or restrict Cases to summaries.
- Verdict: **SURVIVES with modification.** Free Cases + Library is correct strategy. But SITE-PLAN must explicitly define what a Report is that a Case is not. Recommended: Reports = structured deep-dive with primary document review, quantitative analysis, or exclusive sourcing. Cases = contextual analysis of existing public information.

**Finding 2: $7 Analyst tier value proposition is too thin.**
- Falsification: If support-framed tiers convert well in this specific audience (UAP-interested, independent-media supporters), $7 for community + discounts may work.
- Evidence: Comparable platforms (Bellingcat supporter tier, independent newsletter "founding member" tiers) show support-framed $5-10/month tiers do convert at meaningful rates.
- Alternative: Fold community access into Free tier, eliminate $7 tier, make $20 the entry paid tier.
- Verdict: **MODIFIED.** Rename to "Supporter." Price at $5/month. Frame explicitly as patronage, not feature access. Community access stays at this tier but framing shifts entirely to support language.

**Finding 3: Clearance tier "coming soon" creates conversion drag.**
- Falsification: If Clearance is positioned as exclusive/scarce ("founding rate, limited spots"), coming-soon generates urgency rather than confusion.
- Evidence: Founding-rate waitlists for upcoming subscription tiers have worked well for product-forward newsletters (Lenny's Newsletter Slack community, etc.).
- Alternative: Hide Clearance until features exist.
- Verdict: **SURVIVES with modification.** Show at launch as founding-rate waitlist. $35/month (locked permanently when features launch). Limited founding spots creates legitimate urgency.

**Finding 4: Badge system without public methodology is decoration.**
- Falsification: Badges with even brief inline criteria (tooltip or footnote) are better than nothing.
- Evidence: No specific badge criteria appear anywhere in SITE-PLAN.
- Best evidence for keeping badges: the dossier aesthetic requires metadata density; badges deliver this even before methodology is published.
- Verdict: **SURVIVES but methodology specification must be complete before any content is published.** Methodology page is a launch blocker, not a Phase 2 item.

**Finding 5: "WHISTLEBLOWER" tag creates legal and credibility exposure.**
- Falsification: If UAPI's terms of service explicitly state all source tags are editorial characterizations, not verified claims, legal exposure is reduced.
- Evidence: The tag as designed implies verification of source identity and status.
- Alternative: "ANONYMOUS GOVERNMENT SOURCE" covers the same signal.
- Verdict: **DIES. Tag retired.** Replace with "ANONYMOUS GOVERNMENT SOURCE." No exception.

---

### Thunderdome B — Strategic Options

**Option A: Launch all four tiers simultaneously.**
- Failure condition: Clearance at $50/month with no deliverable features creates subscriber confusion and undermines the platform's credibility before it has established any.
- Evidentiary support: Casey and patio11 both independently identify this as a risk.
- Failure cost: HIGH — a confused pricing page at launch is the first thing press and early users see.
- Verdict: **MODIFIED.** Launch Free + Supporter ($5) + Investigator ($20) + Clearance (founding waitlist, $35 locked rate). Never show $50/month until features exist.

**Option B: Weekly reports from launch.**
- Failure condition: Production pipeline is untested. First missed week creates subscriber expectation violation and churn.
- Failure cost: HIGH — subscription businesses are punished heavily for broken cadence promises.
- Verdict: **MODIFIED.** Bi-weekly at launch. Upgrade to weekly when (a) production pipeline is validated over 8 consecutive on-time reports and (b) Investigator subscriber base exceeds 200.

**Option C: Community as paid (Supporter tier) feature.**
- Failure condition: At launch, community has zero members. Paying to access an empty forum is not a benefit.
- Failure cost: MEDIUM — early Supporter subscribers may churn when they find the community empty.
- Verdict: **MODIFIED.** Launch community as open-to-all (including free tier) to build critical mass. Supporter tier benefits shift to: early report access (24 hours ahead of public), monthly briefing email, and forum "verified supporter" badge. Community becomes a platform-wide feature, not a gate.

**Option D: Library fully free.**
- Failure condition: If the library becomes a major traffic driver, no portion of it can be monetized.
- Failure cost: LOW — affiliate links provide some monetization; the real value of a free library is SEO and trust-building.
- Verdict: **SURVIVES.** Library remains free. Affiliate monetization is acceptable. Premium library (annotated versions, exclusive documents) could be a future Investigator benefit but is not required at launch.

---

## Phase 4: Revised Plan Decisions

### Changes Required in SITE-PLAN.md

| # | Change | Source | Priority |
|---|--------|--------|----------|
| 1 | Add badge criteria specification to methodology page (specific enough to audit) | C1 | Launch blocker |
| 2 | Retire "WHISTLEBLOWER" tag → "ANONYMOUS GOVERNMENT SOURCE" | C2, T-A5 | Launch blocker |
| 3 | Add incident type, witness category, geographic tags to Cases taxonomy | U1 | Phase 1 |
| 4 | Add growth loop and conversion mechanics to design spec (email capture, newsletter CTA, report preview hooks) | U2 | Phase 1 |
| 5 | Rename Analyst → Supporter, reprice to $5/month, reframe as patronage | T-B2 | Phase 1 |
| 6 | Restructure community access: open to all tiers, Supporter gets forum badge + early access | T-B3 | Phase 1 |
| 7 | Add annual pricing to all tiers | C4 | Phase 1 |
| 8 | Change Clearance to founding-rate waitlist ($35/mo locked) at launch | C2, T-B1 | Phase 1 |
| 9 | Add bi-weekly launch cadence with upgrade milestone (200 Investigator subscribers → weekly) | C3, T-B2 | Phase 1 |
| 10 | Add minimum report spec: 2,000 words, primary source component required | C3 | Phase 1 |
| 11 | Rename "EYES ONLY" → "LIMITED DISTRIBUTION" | U4 | Phase 1 |
| 12 | Add "SINGLE WITNESS — CREDENTIALED" sub-tier to evidence quality; remove "ANECDOTAL" | Starbird | Phase 1 |
| 13 | Add visual treatment spec for cross-index links (relevance ≠ endorsement) | U3 | Design stage |
| 14 | Add community moderation plan (code of conduct, moderator capacity) as Phase 1 requirement | C5 | Phase 1 |
| 15 | Define structural difference between free Cases and paid Reports | T-A1 | Phase 1 |
| 16 | Add individual report pricing at $18 (makes $20/mo Investigator clearly valuable) | patio11 | Phase 2 |
| 17 | Add explicit "UAPI does not host leaked documents" policy to methodology | Higgins | Launch |
| 18 | Rename "RESTRICTED" classification badge — too close to a real classification level | Elizondo | Phase 1 |
| 19 | Dispatch automation = drafts only, editorial review required before publish | D3 | Phase 2 |
| 20 | Move SEO foundations (schema markup, metadata) to Phase 1 from Phase 2 | patio11 | Phase 1 |

---

## Panel Verdicts by Section

| Section | Verdict | Notes |
|---------|---------|-------|
| Membership tiers | MODIFIED | See changes 5-8 above |
| Badge system | MODIFIED | See changes 2, 11, 12, 17, 18 |
| Content sections | MODIFIED | See changes 3, 15 |
| Design system | PASSES with additions | Add conversion mechanics (change 4), cross-index visual spec (change 13) |
| Tech stack | PASSES | No changes |
| Build phases | MODIFIED | SEO to Phase 1; moderation to Phase 1; report spec added |
| Open questions | RESOLVED | Tip form = contact form ✓; Reports = web-only ✓; Community = forum (needs mod plan); Affiliates = Amazon ✓ |

---

## Vetting Log

Collisions=4 Tribunal=1 Thunderdome-A=5 Thunderdome-B=4 Polish=pass

Notes: One tag eliminated (WHISTLEBLOWER), three tier structures modified, one cadence modified, growth loop gap identified as design-stage blocker. Panel consensus strongest on badge methodology requirement and community moderation risk. Sharpest divergence resolved: weekly vs. bi-weekly cadence → milestone-gated upgrade path.
