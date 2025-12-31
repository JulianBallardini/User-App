import '@testing-library/jest-dom';
import { vi } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';

// Mock NgRx Store properly at module level
vi.mock('@ngrx/store', () => {
  const createAction = vi.fn((type: string, config?: any) => ({ type, ...config }));
  const props = vi.fn((obj: any) => obj);

  return {
    createAction,
    props,
    Store: vi.fn(),
    provideStore: vi.fn(),
    selectSignal: vi.fn(),
  };
});

// Mock SweetAlert2
vi.mock('sweetalert2', () => ({
  fire: vi.fn().mockResolvedValue({ isConfirmed: true }),
}));

// Mock Router
vi.mock('@angular/router', () => ({
  Router: vi.fn(),
  RouterLink: vi.fn(),
}));

// Extend Vitest's expect with jest-dom matchers
expect.extend(matchers);

// Setup global test utilities
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: any) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Make Vitest globals available globally for tests
declare global {
  const vi: typeof import('vitest').vi;
  const describe: typeof import('vitest').describe;
  const it: typeof import('vitest').it;
  const test: typeof import('vitest').test;
  const expect: typeof import('vitest').expect;
  const beforeEach: typeof import('vitest').beforeEach;
  const afterEach: typeof import('vitest').afterEach;
  const beforeAll: typeof import('vitest').beforeAll;
  const afterAll: typeof import('vitest').afterAll;
}

// Mock SweetAlert2
vi.mock('sweetalert2', () => ({
  fire: vi.fn().mockResolvedValue({ isConfirmed: true }),
}));

// Mock Router
vi.mock('@angular/router', () => ({
  Router: vi.fn(),
  RouterLink: vi.fn(),
}));

// Mock NgRx Store
vi.mock('@ngrx/store', () => {
  const actual = vi.importActual('@ngrx/store');
  return {
    ...actual,
    Store: vi.fn(),
    provideStore: vi.fn(),
    selectSignal: vi.fn(),
  };
});

// Setup global test utilities
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: any) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
