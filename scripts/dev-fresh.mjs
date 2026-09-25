/**
 * dev-fresh.mjs — run via "npm run dev:fresh"
 * Kills whatever process holds port 4321 (astro dev) or 4322 (astro preview),
 * clears Vite/Astro caches, then lets npm start "astro dev" cleanly.
 * Windows-native (netstat + taskkill), no deps. Replaces the old run.bat and
 * kill-zombie-process.ps1.
 */
import { spawnSync } from 'node:child_process';
import { rmSync, existsSync } from 'node:fs';

// ── 1. Kill ports 4321 (dev) and 4322 (preview) ──────────────────────────────
const net = spawnSync('netstat', ['-ano'], { encoding: 'utf8', shell: true });
for (const port of ['4321', '4322']) {
  const pids = [
    ...new Set(
      (net.stdout ?? '')
        .split('\n')
        .filter(l => l.includes(`:${port} `) && l.includes('LISTENING'))
        .map(l => l.trim().split(/\s+/).at(-1))
        .filter(p => p && /^\d+$/.test(p) && p !== '0')
    ),
  ];

  if (pids.length === 0) {
    console.log(`Port ${port} is free.`);
  } else {
    for (const pid of pids) {
      const r = spawnSync('taskkill', ['/F', '/PID', pid], { shell: true });
      if (r.status === 0) console.log(`Killed PID ${pid} (was holding port ${port}).`);
    }
  }
}

// ── 2. Clear Vite / Astro caches ─────────────────────────────────────────────
for (const dir of ['node_modules/.vite', 'node_modules/.astro']) {
  if (existsSync(dir)) {
    rmSync(dir, { recursive: true, force: true });
    console.log(`Cleared ${dir}`);
  }
}
