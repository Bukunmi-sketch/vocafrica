/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";
import mkcert from "vite-plugin-mkcert";

const isCI = process.env.CI === "true" || process.env.VITEST === "true";

export default defineConfig({
  plugins: [
    react(),
    // Skip mkcert during tests to avoid hanging CI
    ...(isCI ? [] : [mkcert()]),
  ],

  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./test/setup.ts"],

    // Force isolated workers to prevent hanging
    isolate: true,

    // Use threads pool with single thread for better cleanup
    pool: "threads",
    poolOptions: {
      threads: {
        singleThread: isCI, // Single thread in CI for better cleanup
      }
    },

    // Increase timeouts in CI
    testTimeout: isCI ? 30000 : 5000,
    hookTimeout: isCI ? 30000 : 5000,

    // Force exit after tests complete
    teardownTimeout: isCI ? 10000 : 2000,

    // Clear mocks between tests to prevent memory leaks
    clearMocks: true,

    // Disable watch mode in CI
    watch: !isCI,

    include: [
      "test/utils/**/*.test.{ts,tsx}",
      "test/common/**/*.test.{ts,tsx}",
      "test/hooks/**/*.test.{ts,tsx}",
      "test/config/**/*.test.{ts,tsx}",
      "test/routes/**/*.test.{ts,tsx}",
      "test/pages/**/*.test.{ts,tsx}",
    ],

    // Minimal reporter in CI
    reporters: isCI ? ["dot"] : ["default"],

    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "src/main.tsx",
        "src/widget.tsx",
        "src/**/*.d.ts",
        "src/**/index.ts",
        "src/assets/**",
        "src/css/**",
        "src/react-app-env.d.ts",
        "src/vite-env.d.ts",
        "**/node_modules/**",
      ],
      enabled: !!process.env.COVERAGE,
    },

    // Log heap usage to debug memory issues
    logHeapUsage: isCI,

    // Force test files to run in sequence in CI
    fileParallelism: !isCI,
  },

  server: {
    cors: true,
    host: "0.0.0.0",
    port: 8080,
    origin: "https://dev.app.alehra.com",
  },

  preview: {
    host: "0.0.0.0",
    port: 8080,
    cors: true,
  },

  css: {
    postcss: { plugins: [tailwindcss()] },
    preprocessorOptions: { scss: {} },
  },

  build: {
    sourcemap: false,
    minify: "esbuild",
    rollupOptions: { logLevel: "debug" },
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@test": path.resolve(__dirname, "./test"),
    },
  },
});