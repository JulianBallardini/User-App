import { describe, it, expect } from 'vitest';

describe('Basic Vitest Test', () => {
  it('should pass a simple test', () => {
    expect(2 + 2).toBe(4);
  });

  it('should test basic functionality', () => {
    const user = { name: 'John', email: 'john@example.com' };
    expect(user.name).toBe('John');
    expect(user.email).toContain('example.com');
  });
});