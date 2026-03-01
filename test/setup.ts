/**
 * Global test setup for Vitest.
 * Ensures jsdom is used, any global mocks are applied, and cleans up handles after tests.
 */
import "@testing-library/jest-dom/vitest";
import { afterAll, afterEach, beforeAll, vi } from "vitest";

// ========================
// TRACK AND CLEAN UP INTERVALS/TIMEOUTS
// ========================

const originalSetInterval = global.setInterval;
const originalSetTimeout = global.setTimeout;
const originalClearInterval = global.clearInterval;
const originalClearTimeout = global.clearTimeout;

const activeIntervals = new Set<NodeJS.Timeout>();
const activeTimeouts = new Set<NodeJS.Timeout>();

global.setInterval = ((callback, delay, ...args) => {
  const id = originalSetInterval(callback, delay, ...args);
  activeIntervals.add(id);
  return id;
}) as typeof setInterval;

global.setTimeout = ((callback, delay, ...args) => {
  const id = originalSetTimeout(callback, delay, ...args);
  activeTimeouts.add(id);
  return id;
}) as typeof setTimeout;

global.clearInterval = ((id) => {
  activeIntervals.delete(id);
  return originalClearInterval(id);
}) as typeof clearInterval;

global.clearTimeout = ((id) => {
  activeTimeouts.delete(id);
  return originalClearTimeout(id);
}) as typeof clearTimeout;

// ========================
// CLEANUP FUNCTIONS
// ========================

function cleanupTimers() {
  activeIntervals.forEach(id => {
    try {
      originalClearInterval(id);
    } catch (e) { }
  });
  activeTimeouts.forEach(id => {
    try {
      originalClearTimeout(id);
    } catch (e) { }
  });
  activeIntervals.clear();
  activeTimeouts.clear();
}

// ========================
// ENSURE JSDOM ENVIRONMENT
// ========================
beforeAll(() => {
  // Setup basic globals
  globalThis.window = globalThis.window || {};
  globalThis.document = globalThis.document || {
    body: {},
    createElement: () => ({}),
    getElementById: () => null,
    querySelector: () => null,
    querySelectorAll: () => [],
    addEventListener: () => { },
    removeEventListener: () => { },
  };
  globalThis.navigator = globalThis.navigator || { userAgent: "node" };
});

// ========================
// CLEANUP AFTER EACH TEST
// ========================
afterEach(() => {
  // Clear all mocks
  vi.clearAllMocks();

  // Clean up DOM
  if (document.body) {
    document.body.innerHTML = '';
  }

  // Clear any fetch mocks
  if (global.fetch && vi.isMockFunction(global.fetch)) {
    vi.mocked(global.fetch).mockClear();
  }

  // Reset URL
  if (global.window && global.window.location) {
    global.window.location.href = 'http://localhost/';
  }

  // Force garbage collection if available
  if (global.gc) {
    global.gc();
  }
});

// ========================
// FINAL CLEANUP
// ========================
afterAll(() => {
  // Clear all timers
  cleanupTimers();

  // Clear any remaining intervals/timeouts
  vi.clearAllTimers();

  // Restore all mocks
  vi.restoreAllMocks();

  // Force process exit after a short delay
  setTimeout(() => {
    if (process.env.CI === "true") {
      console.log("[TEST] Forcing exit in CI mode");
      process.exit(0);
    }
  }, 100);
});

// ========================
// MOCKS
// ========================

// Mock axios
vi.mock("axios", () => ({
  default: {
    get: vi.fn().mockResolvedValue({ data: {} }),
    post: vi.fn().mockResolvedValue({ data: {} }),
    put: vi.fn().mockResolvedValue({ data: {} }),
    patch: vi.fn().mockResolvedValue({ data: {} }),
    delete: vi.fn().mockResolvedValue({ data: {} }),
    create: () => ({
      get: vi.fn().mockResolvedValue({ data: {} }),
      post: vi.fn().mockResolvedValue({ data: {} }),
      put: vi.fn().mockResolvedValue({ data: {} }),
      patch: vi.fn().mockResolvedValue({ data: {} }),
      delete: vi.fn().mockResolvedValue({ data: {} }),
      interceptors: { request: { use: vi.fn() }, response: { use: vi.fn() } },
    }),
  },
}));

// Mock matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock ResizeObserver
window.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock IntersectionObserver
window.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock scrollTo
window.scrollTo = vi.fn();

// Mock requestAnimationFrame
window.requestAnimationFrame = vi.fn((cb) => setTimeout(cb, 0));
window.cancelAnimationFrame = vi.fn((id) => clearTimeout(id));

// Mock URL methods
if (typeof URL !== 'undefined') {
  URL.createObjectURL = vi.fn(() => 'blob:mock');
  URL.revokeObjectURL = vi.fn();
}

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
  length: 0,
  key: vi.fn(),
};
Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

// Mock sessionStorage
const sessionStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
  length: 0,
  key: vi.fn(),
};
Object.defineProperty(window, "sessionStorage", {
  value: sessionStorageMock,
});