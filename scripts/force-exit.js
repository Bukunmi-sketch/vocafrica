#!/usr/bin/env node
/**
 * Force exit after tests complete
 */

const { spawn } = require("child_process");

console.log("Running tests with forced exit...");

const child = spawn(
    "node",
    ["--max-old-space-size=4096", "./node_modules/vitest/vitest.mjs", "run", "--config", "vitest.ci.config.ts"],
    {
        stdio: "inherit",
        shell: true,
        env: { ...process.env, CI: "true", VITEST: "true" },
    }
);

child.on("exit", (code) => {
    console.log(`Tests exited with code ${code}`);

    // Force exit after a short delay
    setTimeout(() => {
        console.log("Forcing process exit...");
        process.exit(code || 0);
    }, 1000);
});

// Force exit after 2 minutes
setTimeout(() => {
    console.log("Timeout reached, killing test process...");
    child.kill("SIGKILL");
    process.exit(1);
}, 120000);