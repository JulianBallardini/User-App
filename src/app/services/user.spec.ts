import { describe, it, expect, beforeEach } from 'vitest';
import { of } from 'rxjs';
import { UserService } from './user';
import { User } from '../models/users.model';

const mockUsers: User[] = [
  { id: 1, name: 'Luca Julián', lastname: 'Test', email: 'luca@test.com', username: 'luca', password: '123' },
  { id: 2, name: 'Mia', lastname: 'Test', email: 'mia@test.com', username: 'mia', password: '123' },
];

const createMockHttpClient = () => ({
  get: () => of(mockUsers),
  post: () => of({}),
  put: () => of({}),
  delete: () => of({}),
});

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    service = new UserService(createMockHttpClient() as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return users array', () => {
    return service.findAll().subscribe(users => {
      expect(users).toHaveLength(2);
      expect(users[0].name).toBe('Luca Julián');
      expect(users[1].name).toBe('Mia');
    });
  });

  it('should have proper user structure', () => {
    return service.findAll().subscribe(users => {
      const user = users[0];
      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('name');
      expect(user).toHaveProperty('lastname');
      expect(user).toHaveProperty('email');
      expect(user).toHaveProperty('username');
      expect(user).toHaveProperty('password');
    });
  });

  it('should have valid email format', () => {
    return service.findAll().subscribe(users => {
      users.forEach(user => {
        expect(user.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
      });
    });
  });
});