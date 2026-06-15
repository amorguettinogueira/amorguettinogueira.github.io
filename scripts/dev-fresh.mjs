/**
 * dev-fresh.mjs — run via "npm run dev:fresh"
 * Kills whatever process holds port 4321, clears Vite/Astro caches, then lets
 * npm start "astro dev" cleanly.  Windows-native (netstat + taskkill), no deps.
 */
import { spawnSync } from 'node:child_process';
import { rmSync, existsSync } from 'node:fs';

// ── 1. Kill port 4321 ────────────────────────────────────────────────────────
const net = spawnSync('netstat', ['-ano'], { encoding: 'utf8', shell: true });
const pids = [
  ...new Set(
    net.stdout
      .split('\n')
      .filter(l => l.includes(':4321') && l.includes('LISTENING'))
      .map(l => l.trim().split(/\s+/).at(-1))
      .filter(p => p && /^\d+$/.test(p) && p !== '0')
  ),
];

if (pids.length === 0) {
  console.log('Port 4321 is free.');
} else {
  for (const pid of pids) {
    const r = spawnSync('taskkill', ['/F', '/PID', pid], { shell: true });
    if (r.status === 0) console.log(`Killed PID ${pid} (was holding port 4321).`);
  }
}

// ── 2. Clear Vite / Astro caches ─────────────────────────────────────────────
for (const dir of ['node_modules/.vite', 'node_modules/.astro']) {
  if (existsSync(dir)) {
    rmSync(dir, { recursive: true, force: true });
    console.log(`Cleared ${dir}`);
  }
}
