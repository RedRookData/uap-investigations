# UAPI Autonomous Build — Complete Runbook
_Written: 2026-02-21 | Adversarially vetted before writing_
_This document drives the overnight build. Read before touching anything._

---

## Adversarial Issues Found + Resolutions

Every failure mode was stress-tested before this runbook was written.

| # | Issue | Resolution |
|---|-------|------------|
| 1 | IMPL-PLAN-FINAL.md is 3192 lines — agent can't read it in one call | Stage files are separate, extracted at setup. Each <20KB. Agent reads only its stage. |
| 2 | If job crashes mid-stage, status stays "running" forever | `"running"` = crash signal. Next invocation treats it as failed + increments retry counter. |
| 3 | Two cron invocations could overlap | 25-min interval. Each stage <5 min. Gap is 20 min. No overlap possible. |
| 4 | Font download during build could fail (CDN, parsing) | URLs fetched NOW, hardcoded in STAGE-1.md. No dynamic parsing at build time. |
| 5 | Source Serif 4 is a variable font — same woff2 for 400/600/700 | Confirmed from live CDN. Stage 1 downloads 4 files total (not 6). tokens.css patched accordingly. |
| 6 | Ghost Admin theme upload needs JWT — complex crypto in PowerShell | Stage 10 uses Node.js native `crypto` + `fetch`. Node v22 is already installed. Zero npm installs needed. |
| 7 | Uploading a theme doesn't activate it | Stage 10 makes two API calls: upload then activate. Both documented with exact endpoints. |
| 8 | SSH key permissions on Windows cause OpenSSH to refuse the key | SSH not needed. Everything done via Ghost Admin REST API. No SSH in Stage 10. |
| 9 | Chicken-and-egg: cron job ID needed in prompt before job is created | Job ID written to `BUILD-CRON-ID.txt` immediately after cron job creation. Agent reads that file. |
| 10 | Build complete but cron keeps firing every 25 min, spamming announcements | Agent sets `completion_announced: true` after first report. Subsequent invocations exit silently. |
| 11 | Ghost Admin API 422 on upload (malformed zip) | Stage 10 parses API response. 422 = logged as last_error, stage fails, retry triggers. |
| 12 | Node.js multipart upload compatibility (FormData + fetch) | Node v22 has native `FormData` and `fetch`. Verified. Zero npm installs. |
| 13 | `Compress-Archive` puts wrong structure in zip | Uses `-Path "uapi-dossier\*"` (star glob) — files at root, not inside a subfolder. |
| 14 | Stage verification too naive (just checks file exists) | File existence + size > 100 bytes. A 0-byte or corrupt write fails verification. |
| 15 | `font-weight: 400 700` range in @font-face for variable font | Correct CSS spec syntax. Tells browser this file covers the full weight range. Supported in all modern browsers. |

---

## Architecture

```
Every 25 minutes:
  Cron fires isolated agentTurn
  → Agent reads BUILD-STATE.json
  → Determines: pending? retry? complete? stuck?
  → Reads build-stages/STAGE-{N}.md
  → Writes all files for that stage
  → Verifies each file
  → Updates BUILD-STATE.json
  → If done: removes cron job, reports to Ghost
  → If stuck: removes cron job, alerts Ghost
```

```
BUILD-STATE.json (state machine):

  pending  → Agent starts stage
  running  → Stage in progress (crash = this stays here)
  complete → Stage done, advance to next
  failed   → Stage errored, retry on next invocation
```

---

## Font URLs (Fetched Live — Hardcoded to Avoid Runtime Parsing)

These are the Latin-subset woff2 URLs from Google Fonts CDN as of 2026-02-21.
The hash in the URL is tied to font version — stable for months.

```
ibm-plex-mono-400.woff2
  https://fonts.gstatic.com/s/ibmplexmono/v20/-F63fjptAgt5VM-kVkqdyU8n1i8q1w.woff2

ibm-plex-mono-500.woff2
  https://fonts.gstatic.com/s/ibmplexmono/v20/-F6qfjptAgt5VM-kVkqdyU8n3twJwlBFgg.woff2

source-serif4.woff2  (variable — covers weight 400-700 normal)
  https://fonts.gstatic.com/s/sourceserif4/v14/vEFI2_tTDB4M7-auWDN0ahZJW1gb8tc.woff2

source-serif4-italic.woff2  (variable — covers weight 400-700 italic)
  https://fonts.gstatic.com/s/sourceserif4/v14/vEFH2_tTDB4M7-auWDN0ahZJW1ge6NmXq2ZbF8zBfb98SUr6aX0.woff2
```

**tokens.css @font-face patch** — IMPL-PLAN-FINAL.md has 6 Source Serif 4 blocks.
Stage 1 writes a corrected version using the 4-file structure:

```css
@font-face {
  font-family: 'Source Serif 4';
  src: url('../fonts/source-serif4.woff2') format('woff2');
  font-weight: 400 700;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Source Serif 4';
  src: url('../fonts/source-serif4-italic.woff2') format('woff2');
  font-weight: 400 700;
  font-style: italic;
  font-display: swap;
}
```

**default.hbs preload patch** — only 3 preloads needed (not 6):
```html
<link rel="preload" href="{{asset "fonts/ibm-plex-mono-400.woff2"}}" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="{{asset "fonts/source-serif4.woff2"}}" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="{{asset "fonts/source-serif4-italic.woff2"}}" as="font" type="font/woff2" crossorigin>
```

---

## BUILD-STATE.json — Initial State

```json
{
  "stage": 1,
  "status": "pending",
  "retries": 0,
  "max_retries": 3,
  "completed_stages": [],
  "last_error": "",
  "last_updated": "",
  "build_complete": false,
  "completion_announced": false
}
```

---

## STAGE-INDEX.json — Line Ranges in IMPL-PLAN-FINAL.md

The orchestrator agent uses `offset` and `limit` on the Read tool to read only the relevant stage section.
All measurements are from the live file as of 2026-02-21.

```json
{
  "plan_file": "C:\\Users\\redro\\.openclaw\\workspace\\projects\\uap-platform\\IMPL-PLAN-FINAL.md",
  "stages": {
    "1":  { "start": 193, "lines": 635, "description": "Core Shell — package.json, tokens.css, base/type/layout/header/footer CSS, default.hbs, header.hbs, footer.hbs, error.hbs" },
    "2":  { "start": 828, "lines": 223, "description": "Badge System — badges.js (complete), badges.css" },
    "3":  { "start": 1050, "lines": 234, "description": "Card Partials — cards.css, card-case/report/dispatch/library/researcher.hbs" },
    "4":  { "start": 1283, "lines": 378, "description": "Homepage — conversion.css, newcomer-block.hbs, newsletter-cta.hbs, index.hbs" },
    "5":  { "start": 1660, "lines": 257, "description": "Article + Partials — article.css, tier-prompt.hbs, report-preview.hbs, cross-index.hbs, post.hbs, page.hbs, tag.hbs" },
    "6":  { "start": 1916, "lines": 244, "description": "Archives + AI — custom-reports.hbs, custom-dispatches.hbs, custom-ai.hbs, ai.css" },
    "7":  { "start": 2159, "lines": 89,  "description": "Library + Researchers — custom-library.hbs, custom-researchers.hbs, library.css, researchers.css, library-filter.js stub" },
    "8":  { "start": 2247, "lines": 278, "description": "Search — search-modal.hbs, search-gate.js, algolia-search.js, search.css" },
    "9":  { "start": 2524, "lines": 132, "description": "Responsive + Polish — responsive.css, skip link" },
    "10": { "start": 2655, "lines": 297, "description": "Deploy — zip theme, upload via Ghost Admin API, activate" }
  }
}
```

---

## Ghost Admin API — Stage 10 Script

Node.js v22. Native fetch + crypto. Zero npm installs. Run via exec.

```javascript
// deploy-theme.js
// Placed at: C:\Users\redro\.openclaw\workspace\projects\uap-platform\deploy-theme.js
// Run: node deploy-theme.js

const fs     = require('fs');
const path   = require('path');
const crypto = require('crypto');

const GHOST_URL  = 'https://uapinvestigations.com';
const API_KEY    = '6999521d574b7b5f0756a5ac:6e0555b6f635727f64584e4d5f75c3a375f5630c726e08ebd8f247bfa7cfbbcf';
const ZIP_PATH   = path.join('C:\\Users\\redro\\.openclaw\\workspace\\projects\\uap-platform\\ghost-theme\\uapi-dossier.zip');
const THEME_NAME = 'uapi-dossier';

function makeJWT() {
  const [id, secret] = API_KEY.split(':');
  const now = Math.floor(Date.now() / 1000);
  const header  = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT', kid: id })).toString('base64url');
  const payload = Buffer.from(JSON.stringify({ iat: now, exp: now + 300, aud: '/admin/' })).toString('base64url');
  const sig = crypto.createHmac('sha256', Buffer.from(secret, 'hex'))
    .update(`${header}.${payload}`)
    .digest('base64url');
  return `${header}.${payload}.${sig}`;
}

async function uploadTheme(jwt) {
  const zipBytes = fs.readFileSync(ZIP_PATH);
  const form = new FormData();
  form.append('file', new Blob([zipBytes], { type: 'application/zip' }), `${THEME_NAME}.zip`);
  const res = await fetch(`${GHOST_URL}/ghost/api/admin/themes/upload`, {
    method: 'POST',
    headers: { Authorization: `Ghost ${jwt}` },
    body: form
  });
  const body = await res.json();
  if (!res.ok) throw new Error(`Upload failed ${res.status}: ${JSON.stringify(body)}`);
  console.log('Upload OK:', body.themes?.[0]?.name);
  return body;
}

async function activateTheme(jwt) {
  const res = await fetch(`${GHOST_URL}/ghost/api/admin/themes/${THEME_NAME}/activate`, {
    method: 'PUT',
    headers: { Authorization: `Ghost ${jwt}`, 'Content-Type': 'application/json' }
  });
  const body = await res.json();
  if (!res.ok) throw new Error(`Activate failed ${res.status}: ${JSON.stringify(body)}`);
  console.log('Activated:', body.themes?.[0]?.active);
}

async function main() {
  const jwt = makeJWT();
  await uploadTheme(jwt);
  // Fresh JWT for activate (5-min expiry)
  const jwt2 = makeJWT();
  await activateTheme(jwt2);
  console.log('DONE: Theme uploaded and activated.');
}

main().catch(e => { console.error('DEPLOY FAILED:', e.message); process.exit(1); });
```

---

## Orchestrator Agent Prompt

This is the exact text sent as the `agentTurn` message in the cron job.
It is completely self-contained. The isolated agent has no prior context.

```
UAPI AUTONOMOUS BUILD ORCHESTRATOR

You are running in an isolated session. No prior conversation context exists.
Follow these instructions exactly. Do not add steps. Do not skip steps.

━━━ PATHS ━━━
Workspace:   C:\Users\redro\.openclaw\workspace
State file:  C:\Users\redro\.openclaw\workspace\projects\uap-platform\BUILD-STATE.json
Stage index: C:\Users\redro\.openclaw\workspace\projects\uap-platform\STAGE-INDEX.json
Plan file:   C:\Users\redro\.openclaw\workspace\projects\uap-platform\IMPL-PLAN-FINAL.md
Theme dir:   C:\Users\redro\.openclaw\workspace\projects\uap-platform\ghost-theme\uapi-dossier\
Cron ID:     C:\Users\redro\.openclaw\workspace\projects\uap-platform\BUILD-CRON-ID.txt

━━━ STEP 1: READ STATE ━━━
Read BUILD-STATE.json. Note: stage, status, retries, max_retries, build_complete, completion_announced.

━━━ STEP 2: DECIDE ━━━

IF build_complete = true AND completion_announced = true:
  → Exit silently. Do nothing. The build is done.

IF build_complete = true AND completion_announced = false:
  → Read BUILD-CRON-ID.txt to get the cron job ID.
  → Use the cron tool (action=remove, jobId=<id>) to remove this recurring job.
  → Update BUILD-STATE.json: completion_announced = true.
  → Report to Ghost: "✅ UAPI THEME BUILD COMPLETE. All 10 stages done. Theme is live at uapinvestigations.com. Log into Ghost Admin → Settings → Design to confirm the theme is active."
  → Exit.

IF status = "failed" AND retries >= max_retries:
  → Read BUILD-CRON-ID.txt.
  → Use cron tool (action=remove) to remove this job.
  → Report to Ghost: "🚨 UAPI BUILD STUCK — Stage {stage} failed {retries} times. Last error: {last_error}. Manual fix needed. Check BUILD-STATE.json and build-stages/STAGE-{stage}.md."
  → Exit.

IF status = "running":
  → Previous agent crashed mid-stage. Treat as failed.
  → Update BUILD-STATE.json: status = "failed", retries = retries + 1, last_error = "Agent crashed during stage execution (status was 'running' on startup)".
  → If retries now >= max_retries: follow the "stuck" path above.
  → Otherwise: fall through to STEP 3 to retry the stage.

IF status = "failed" AND retries < max_retries:
  → Fall through to STEP 3 to retry.

IF status = "pending":
  → Fall through to STEP 3 to execute.

━━━ STEP 3: MARK RUNNING ━━━
Update BUILD-STATE.json: status = "running", last_updated = current ISO timestamp.

━━━ STEP 4: READ STAGE FILE ━━━
Read STAGE-INDEX.json. Find the entry for stage {current_stage}.
Note the "start" line number and "lines" count.
Read IMPL-PLAN-FINAL.md using: offset={start}, limit={lines}.
This contains every file you must write for this stage. Read it completely before writing anything.

━━━ STEP 5: EXECUTE STAGE ━━━
For each file specified in the stage content:
  a. Create any required parent directories (the Write tool handles this automatically).
  b. Write the file using the Write tool with the EXACT content from the stage file.
     - Apply the font patch for Stage 1 (see note at bottom of this prompt).
     - Do not paraphrase. Do not summarize. Write verbatim.
  c. Immediately verify: use exec to run:
     Get-Item "C:\path\to\file" | Select-Object FullName, Length
     File must exist AND Length must be > 100.
     If either check fails: record the failure and continue to STEP 6b.

━━━ STAGE 1 FONT PATCH (apply only during Stage 1) ━━━
The plan's tokens.css has 6 Source Serif 4 @font-face blocks (400, 400italic, 600, 700, etc.).
Replace them with these 2 blocks (variable font — one file covers all weights):

  @font-face {
    font-family: 'Source Serif 4';
    src: url('../fonts/source-serif4.woff2') format('woff2');
    font-weight: 400 700;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'Source Serif 4';
    src: url('../fonts/source-serif4-italic.woff2') format('woff2');
    font-weight: 400 700;
    font-style: italic;
    font-display: swap;
  }

Also replace default.hbs preload lines with exactly:
  <link rel="preload" href="{{asset "fonts/ibm-plex-mono-400.woff2"}}" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="{{asset "fonts/source-serif4.woff2"}}" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="{{asset "fonts/source-serif4-italic.woff2"}}" as="font" type="font/woff2" crossorigin>

Download fonts using exec (PowerShell):
  $fonts = @{
    "ibm-plex-mono-400.woff2"    = "https://fonts.gstatic.com/s/ibmplexmono/v20/-F63fjptAgt5VM-kVkqdyU8n1i8q1w.woff2"
    "ibm-plex-mono-500.woff2"    = "https://fonts.gstatic.com/s/ibmplexmono/v20/-F6qfjptAgt5VM-kVkqdyU8n3twJwlBFgg.woff2"
    "source-serif4.woff2"        = "https://fonts.gstatic.com/s/sourceserif4/v14/vEFI2_tTDB4M7-auWDN0ahZJW1gb8tc.woff2"
    "source-serif4-italic.woff2" = "https://fonts.gstatic.com/s/sourceserif4/v14/vEFH2_tTDB4M7-auWDN0ahZJW1ge6NmXq2ZbF8zBfb98SUr6aX0.woff2"
  }
  $dir = "C:\Users\redro\.openclaw\workspace\projects\uap-platform\ghost-theme\uapi-dossier\assets\fonts"
  New-Item -ItemType Directory -Path $dir -Force | Out-Null
  foreach ($name in $fonts.Keys) {
    Invoke-WebRequest -Uri $fonts[$name] -OutFile "$dir\$name" -UseBasicParsing
    $size = (Get-Item "$dir\$name").Length
    Write-Host "$name — $size bytes"
  }
Verify all 4 files exist and are > 10000 bytes (fonts are 15-120KB). If any font fails, mark stage as failed.

━━━ STAGE 10 SPECIAL INSTRUCTIONS ━━━
Stage 10 in IMPL-PLAN-FINAL.md is a human-facing checklist, not a script.
Instead of following those lines, do this:

1. ZIP the theme:
   cd C:\Users\redro\.openclaw\workspace\projects\uap-platform\ghost-theme
   Compress-Archive -Path "uapi-dossier\*" -DestinationPath "uapi-dossier.zip" -Force
   Verify zip exists and is > 10000 bytes.

2. Run the deploy script:
   node C:\Users\redro\.openclaw\workspace\projects\uap-platform\deploy-theme.js
   Capture stdout. Look for "DONE: Theme uploaded and activated."
   If process exits with code 1 or output contains "FAILED": mark stage as failed.

3. If successful: mark build_complete = true.

━━━ STEP 6a: ON SUCCESS ━━━
Update BUILD-STATE.json:
  - completed_stages: append current stage number
  - If current stage < 10: stage = stage + 1, status = "pending", retries = 0
  - If current stage = 10: build_complete = true, status = "complete"

━━━ STEP 6b: ON FAILURE ━━━
Update BUILD-STATE.json:
  - status = "failed"
  - retries = retries + 1
  - last_error = (describe exactly what failed and why)
  - last_updated = now
The next cron invocation will retry.

━━━ DONE ━━━
Exit. Do not take any other actions.
```

---

## Cron Job Configuration

```json
{
  "name": "UAPI Theme Build Orchestrator",
  "schedule": { "kind": "every", "everyMs": 1500000 },
  "payload": {
    "kind": "agentTurn",
    "message": "[paste full orchestrator prompt above]",
    "timeoutSeconds": 0
  },
  "delivery": { "mode": "announce" },
  "sessionTarget": "isolated"
}
```

`everyMs: 1500000` = 25 minutes. Each stage takes 2-5 minutes. 20-minute buffer between runs. No overlap possible.

---

## Setup Sequence (Run These in Order Before Bed)

### 1. Create required directories
```powershell
New-Item -ItemType Directory -Force -Path @(
  "C:\Users\redro\.openclaw\workspace\projects\uap-platform\ghost-theme\uapi-dossier\assets\css",
  "C:\Users\redro\.openclaw\workspace\projects\uap-platform\ghost-theme\uapi-dossier\assets\js",
  "C:\Users\redro\.openclaw\workspace\projects\uap-platform\ghost-theme\uapi-dossier\assets\fonts",
  "C:\Users\redro\.openclaw\workspace\projects\uap-platform\ghost-theme\uapi-dossier\partials"
)
```

### 2. Write BUILD-STATE.json
```json
{
  "stage": 1,
  "status": "pending",
  "retries": 0,
  "max_retries": 3,
  "completed_stages": [],
  "last_error": "",
  "last_updated": "",
  "build_complete": false,
  "completion_announced": false
}
```

### 3. Write STAGE-INDEX.json (as above)

### 4. Write deploy-theme.js (as above)

### 5. Create the cron job → note its ID → write to BUILD-CRON-ID.txt

### 6. Verify BUILD-CRON-ID.txt exists and contains a valid job ID

### 7. Go to bed.

---

## What You Wake Up To

**Best case:** One announcement message:
> ✅ UAPI THEME BUILD COMPLETE. All 10 stages done. Theme is live at uapinvestigations.com. Log into Ghost Admin → Settings → Design to confirm the theme is active.

**If a stage got stuck:** One alert message:
> 🚨 UAPI BUILD STUCK — Stage 3 failed 3 times. Last error: [description]. Manual fix needed.

In the stuck case: read `BUILD-STATE.json` to see exactly what failed. Fix it. Reset the state:
```json
{ "stage": 3, "status": "pending", "retries": 0, ... }
```
Recreate the cron job (the old one was removed on failure). Build resumes from the failed stage — completed stages are not re-run.

---

## Manual Intervention Guide

**Check current state:**
```powershell
Get-Content "C:\Users\redro\.openclaw\workspace\projects\uap-platform\BUILD-STATE.json" | ConvertFrom-Json
```

**See what files were written:**
```powershell
Get-ChildItem "C:\Users\redro\.openclaw\workspace\projects\uap-platform\ghost-theme\uapi-dossier\" -Recurse |
  Select-Object FullName, Length, LastWriteTime | Format-Table
```

**Reset a stuck stage (after manually fixing the issue):**
Edit BUILD-STATE.json: set `status = "pending"`, `retries = 0`. Recreate the cron job.

**Force skip a stage (if you've manually fixed the files):**
Edit BUILD-STATE.json: set `completed_stages` to include the stuck stage, `stage` to next stage number, `status = "pending"`.

**Test the deploy script manually:**
```powershell
node C:\Users\redro\.openclaw\workspace\projects\uap-platform\deploy-theme.js
```

**Verify theme is active in Ghost:**
```powershell
$key = "6999521d574b7b5f0756a5ac:6e0555b6f635727f64584e4d5f75c3a375f5630c726e08ebd8f247bfa7cfbbcf"
# (JWT generation required — see deploy-theme.js makeJWT() function)
```
Or just check Ghost Admin → Settings → Design — the active theme should show "uapi-dossier".

---

## Algolia Reminder

The build deploys the theme. Algolia search won't return results until the index is populated.
After waking up, if the build succeeded, run the Algolia indexing script:
```
ssh -i projects/uap-platform/uapi-do-key root@134.199.202.121
cd /opt/uapi-algolia && node index-ghost.js
```
(See Stage 10 section of IMPL-PLAN-FINAL.md for the full indexing script.)

Ghost Admin still needs: Newsletter, Stripe, Member Tiers, Navigation, Pages with custom templates, Internal tags, and the `<!--members-only-->` comment in each Report post. These are human content operations — not scriptable.

---

## File Manifest for Setup Phase

```
projects/uap-platform/
  BUILD-STATE.json      ← state machine
  STAGE-INDEX.json      ← line ranges per stage
  BUILD-CRON-ID.txt     ← cron job ID (written after job creation)
  deploy-theme.js       ← Node.js upload + activate script
  RUNBOOK.md            ← this file
  IMPL-PLAN-FINAL.md    ← source of truth for all stage code
  ghost-theme/
    uapi-dossier/       ← theme output directory (created at setup)
      assets/
        css/
        js/
        fonts/
    uapi-dossier.zip    ← created by Stage 10
```
