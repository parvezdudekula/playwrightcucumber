import { expect } from '@playwright/test';

export function assertEqual(actual: any, expected: any, message?: string) {
  expect(actual, message).toBe(expected);
}

export function assertTrue(condition: boolean, message?: string) {
  expect(condition, message).toBeTruthy();
}
