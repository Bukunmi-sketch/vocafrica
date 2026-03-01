/**
 * Test utilities for flushing async updates and avoiding act() warnings.
 */
import { act } from "@testing-library/react";

/**
 * Flushes pending async state updates (e.g. from useEffect, fetch) so assertions
 * run after React has applied them. Use after render() when the component
 * triggers async updates. Uses microtasks for minimal delay.
 */
export async function flushAsyncUpdates(): Promise<void> {
  await act(async () => {
    await Promise.resolve();
  });
}
