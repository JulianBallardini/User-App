import { describe, it, expect, beforeEach } from 'vitest';
import { UserForm } from './user-form';

describe('UserForm Component', () => {
  let component: UserForm;

  beforeEach(() => {
    component = new UserForm();
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