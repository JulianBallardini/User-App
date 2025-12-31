import { describe, it, expect, vi, beforeEach } from 'vitest';
import { UserEffects } from './user.effects';

// Unmock @ngrx/store and @ngrx/effects for these tests
beforeEach(() => {
  vi.unmock('@ngrx/store');
  vi.unmock('@ngrx/effects');
});

describe('UserEffects', () => {
  it('should import UserEffects class', () => {
    expect(UserEffects).toBeDefined();
  });
});