// deploy-theme.js — UAPI Ghost Theme Upload + Activation
// Node.js v22 native only. Zero npm installs required.
// Usage: node deploy-theme.js

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

async function uploadTheme() {
  const jwt = makeJWT();
  if (!fs.existsSync(ZIP_PATH)) throw new Error(`Zip not found: ${ZIP_PATH}`);
  const stat = fs.statSync(ZIP_PATH);
  if (stat.size < 10000) throw new Error(`Zip too small (${stat.size} bytes) — likely corrupt`);

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
  console.log('✓ Upload OK:', body.themes?.[0]?.name);
}

async function activateTheme() {
  const jwt = makeJWT(); // fresh JWT — previous may be expired
  const res = await fetch(`${GHOST_URL}/ghost/api/admin/themes/${THEME_NAME}/activate`, {
    method: 'PUT',
    headers: { Authorization: `Ghost ${jwt}`, 'Content-Type': 'application/json' }
  });
  const body = await res.json();
  if (!res.ok) throw new Error(`Activate failed ${res.status}: ${JSON.stringify(body)}`);
  console.log('✓ Activated:', body.themes?.[0]?.active ? 'YES' : 'CHECK ADMIN');
}

async function main() {
  console.log('Deploying UAPI theme to', GHOST_URL);
  await uploadTheme();
  await activateTheme();
  console.log('DONE: Theme uploaded and activated.');
}

main().catch(e => {
  console.error('DEPLOY FAILED:', e.message);
  process.exit(1);
});
