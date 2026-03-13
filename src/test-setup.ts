import 'zone.js';
import '@testing-library/jest-dom';
import * as matchers from '@testing-library/jest-dom/matchers';
import { expect, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { BrowserTestingModule, platformBrowserTesting } from '@angular/platform-browser/testing';

TestBed.initTestEnvironment(BrowserTestingModule, platformBrowserTesting());

// Import Angular compiler to handle JIT compilation issues
import '@angular/compiler';

// Mock SweetAlert2
vi.mock('sweetalert2', () => ({
  fire: vi.fn().mockResolvedValue({ isConfirmed: true }),
  default: {
    fire: vi.fn().mockResolvedValue({ isConfirmed: true }),
  },
}));

// Mock Angular Router for component tests
vi.mock('@angular/router', () => ({
  RouterModule: vi.fn(),
  Router: vi.fn(),
  RouterLink: vi.fn(),
  RouterOutlet: vi.fn(),
  ActivatedRoute: vi.fn(),
  provideRouter: vi.fn(),
}));

// Mock NgRx Store only for components
vi.mock('@ngrx/store', () => ({
  Store: vi.fn(),
  provideStore: vi.fn(),
  select: vi.fn(),
  createSelector: vi.fn(),
  selectSignal: vi.fn(),
  createAction: vi.fn((type: string, config?: any) => ({ type, ...config })),
  createReducer: vi.fn(),
  on: vi.fn(),
  props: vi.fn((obj: any) => obj),
}));

// Mock NgRx Effects
vi.mock('@ngrx/effects', () => ({
  Actions: vi.fn(),
  createEffects: vi.fn(),
  ofType: vi.fn(),
}));

// Mock Bootstrap
vi.mock('bootstrap', () => ({}));

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

// Vitest globals are already available due to globals: true in vitest.config
