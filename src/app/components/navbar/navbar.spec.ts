import { describe, it, expect } from 'vitest';
import { Navbar } from './navbar';

describe('Navbar Component', () => {
  it('should create navbar component', () => {
    const navbar = new Navbar();
    expect(navbar).toBeTruthy();
  });
});