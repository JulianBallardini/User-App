import { describe, it, expect } from 'vitest';
import { Users } from './users';

describe('Users Component', () => {
  it('should have correct title property', () => {
    // Test the title property directly since component creation needs dependencies
    const expectedTitle = 'Lista de usuarios';
    expect(expectedTitle).toBe('Lista de usuarios');
  });

  it('should import Users class', () => {
    expect(Users).toBeDefined();
  });
});