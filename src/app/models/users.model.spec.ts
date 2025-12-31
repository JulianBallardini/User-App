import { describe, it, expect } from 'vitest';
import { User, CreateUserRequest, UpdateUserRequest } from './users.model';

describe('User Model', () => {
  describe('User interface', () => {
    it('should create a valid user', () => {
      const user: User = {
        id: 1,
        name: 'John',
        lastname: 'Doe',
        email: 'john@example.com',
        username: 'johndoe',
        password: 'password123'
      };

      expect(user.name).toBe('John');
      expect(user.email).toBe('john@example.com');
      expect(user.id).toBe(1);
    });

    it('should allow user without id', () => {
      const user: User = {
        name: 'Jane',
        lastname: 'Smith',
        email: 'jane@example.com',
        username: 'janesmith',
        password: 'password456'
      };

      expect(user.id).toBeUndefined();
      expect(user.name).toBe('Jane');
    });
  });

  describe('CreateUserRequest interface', () => {
    it('should create a valid create user request', () => {
      const createRequest: CreateUserRequest = {
        name: 'Alice',
        lastname: 'Johnson',
        email: 'alice@example.com',
        username: 'alicej',
        password: 'securepass123'
      };

      expect(createRequest.name).toBe('Alice');
      expect(createRequest.email).toBe('alice@example.com');
    });
  });

  describe('UpdateUserRequest interface', () => {
    it('should create a valid update user request with all fields', () => {
      const updateRequest: UpdateUserRequest = {
        id: 1,
        name: 'Bob Updated',
        lastname: 'Smith Updated',
        email: 'bob.updated@example.com',
        username: 'bobupdated'
      };

      expect(updateRequest.id).toBe(1);
      expect(updateRequest.name).toBe('Bob Updated');
    });

    it('should create a valid update user request with partial fields', () => {
      const updateRequest: UpdateUserRequest = {
        id: 1,
        name: 'Bob Updated Only'
      };

      expect(updateRequest.id).toBe(1);
      expect(updateRequest.name).toBe('Bob Updated Only');
      expect(updateRequest.lastname).toBeUndefined();
    });
  });
});