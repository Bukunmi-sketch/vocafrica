#!/usr/bin/env node
/**
 * CI test runner for Vitest 2.x
 * - Forces exit if Vitest hangs
 */

import { spawn } from "child_process";

const NO_OUTPUT_FORCE_EXIT_MS = 60_000; // 60s no output → force exit
const CHECK_INTERVAL_MS = 5_000;

let lastOutputTime = Date.now();
let childExited = false;

// Spawn Vitest in CI mode
const child = spawn(
  "npx",
  [
    "vitest",
    "run",
    "--reporter",
    "dot",
  ],
  {
    env: {
      ...process.env,
      NODE_OPTIONS: "--max-old-space-size=8192",
      CI: "true",
      VITEST: "1",
    },
    stdio: ["inherit", "pipe", "pipe"],
    shell: true,
  }
);

const onOutput = (data, isStderr) => {
  if (isStderr) process.stderr.write(data);
  else process.stdout.write(data);
  lastOutputTime = Date.now();
};

child.stdout?.on("data", (d) => onOutput(d, false));
child.stderr?.on("data", (d) => onOutput(d, true));

child.on("close", (code) => {
  childExited = true;
  process.exit(code ?? 0);
});

// Monitor for hanging Vitest
const interval = setInterval(() => {
  if (childExited) {
    clearInterval(interval);
    return;
  }

  const idleTime = Date.now() - lastOutputTime;
  if (idleTime > NO_OUTPUT_FORCE_EXIT_MS) {
    console.warn(
      "\n[CI] Vitest appears to have hung (no output for 60s) — forcing exit"
    );
    try {
      child.kill("SIGTERM");
    } catch (_) { }
    setTimeout(() => {
      try {
        child.kill("SIGKILL");
      } catch (_) { }
      process.exit(1);
    }, 3000);
  }
}, CHECK_INTERVAL_MS);
