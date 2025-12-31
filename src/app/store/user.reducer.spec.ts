import { describe, it, expect, beforeEach } from 'vitest';
import { userReducer, UsersState, initialState } from './user.reducer';
import { User } from '../models/users.model';
import { addUser, findAll, updateUser, removeUser } from './users.actions';

describe('UserReducer', () => {
  it('should return initial state', () => {
    const result = userReducer(initialState, { type: 'UNKNOWN' } as any);
    expect(result).toEqual(initialState);
  });

  it('should handle findAll action', () => {
    const users: User[] = [
      { id: 1, name: 'John', lastname: 'Doe', email: 'john@example.com', username: 'johndoe', password: 'password' }
    ];
    
    const result = userReducer(initialState, findAll({ usuarios: users }));
    
    expect(result.users).toEqual(users);
  });

  it('should handle addUser action', () => {
    const user: User = { id: 1, name: 'John', lastname: 'Doe', email: 'john@example.com', username: 'johndoe', password: 'password' };
    
    const result = userReducer(initialState, addUser({ usuario: user }));
    
    expect(result.users).toHaveLength(1);
    expect(result.users[0]).toEqual(user);
  });

  it('should handle updateUser action', () => {
    const existingUser: User = { id: 1, name: 'John', lastname: 'Doe', email: 'john@example.com', username: 'johndoe', password: 'password' };
    const updatedUser: User = { id: 1, name: 'John Updated', lastname: 'Doe', email: 'john.updated@example.com', username: 'johndoe', password: 'password' };
    
    const stateWithUser = userReducer(initialState, addUser({ usuario: existingUser }));
    const result = userReducer(stateWithUser, updateUser({ usuario: updatedUser }));
    
    expect(result.users[0].name).toBe('John Updated');
    expect(result.users[0].email).toBe('john.updated@example.com');
  });

  it('should handle removeUser action', () => {
    const user: User = { id: 1, name: 'John', lastname: 'Doe', email: 'john@example.com', username: 'johndoe', password: 'password' };
    
    const stateWithUser = userReducer(initialState, addUser({ usuario: user }));
    const result = userReducer(stateWithUser, removeUser({ id: 1 }));
    
    expect(result.users).toHaveLength(0);
  });
});