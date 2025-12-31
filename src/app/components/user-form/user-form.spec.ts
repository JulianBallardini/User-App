import { describe, it, expect, vi } from 'vitest';
import { runInInjectionContext } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { UserForm } from './user-form';

describe('UserForm Component', () => {
  let mockStore: any;
  let mockRouter: any;
  let component: UserForm;

  beforeEach(() => {
    mockStore = {
      selectSignal: vi.fn(() => vi.fn(() => [])),
      dispatch: vi.fn()
    };

    mockRouter = {
      navigate: vi.fn()
    };

    // Create component within injection context
    component = runInInjectionContext(
      { 
        get: (token: any) => token === Store ? mockStore : token === Router ? mockRouter : null 
      }, 
      () => new UserForm()
    );
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty user', () => {
    expect(component.user.name).toBe('');
    expect(component.user.email).toBe('');
    expect(component.user.username).toBe('');
  });
});