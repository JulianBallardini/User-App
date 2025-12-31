import { describe, it, expect } from 'vitest';
import { load, findAll, addUser, updateTotal, removeUser, updateUser, selectedUserFull, selectedUserEmpty } from './users.actions';
import { User } from '../models/users.model';

describe('Users Actions', () => {
  describe('load', () => {
    it('should create a load action', () => {
      const action = load();
      expect(action.type).toBe('[User-App] load');
    });
  });

  describe('findAll', () => {
    it('should create a findAll action with users', () => {
      const users: User[] = [
        { id: 1, name: 'John', lastname: 'Doe', email: 'john@example.com', username: 'johndoe', password: 'password' }
      ];
      
      const action = findAll({ usuarios: users });
      
      expect(action.type).toBe('[User-App] findAll');
      expect(action.usuarios).toEqual(users);
    });
  });

  describe('addUser', () => {
    it('should create an addUser action with user', () => {
      const user: User = { id: 1, name: 'Jane', lastname: 'Smith', email: 'jane@example.com', username: 'janesmith', password: 'password' };
      
      const action = addUser({ usuario: user });
      
      expect(action.type).toBe('[User-App] addUser');
      expect(action.usuario).toEqual(user);
    });
  });

  describe('updateTotal', () => {
    it('should create an updateTotal action', () => {
      const action = updateTotal();
      expect(action.type).toBe('[User-App] updateTotal');
    });
  });

  describe('removeUser', () => {
    it('should create a removeUser action with id', () => {
      const action = removeUser({ id: 1 });
      expect(action.type).toBe('[Users] removeUser');
      expect(action.id).toBe(1);
    });
  });

  describe('updateUser', () => {
    it('should create an updateUser action with user', () => {
      const user: User = { id: 1, name: 'John Updated', lastname: 'Doe', email: 'john.updated@example.com', username: 'johndoe', password: 'password' };
      
      const action = updateUser({ usuario: user });
      
      expect(action.type).toBe('[User-App] updateUser');
      expect(action.usuario).toEqual(user);
    });
  });

  describe('selectedUserFull', () => {
    it('should create a selectedUserFull action with user', () => {
      const user: User = { id: 1, name: 'Selected User', lastname: 'Test', email: 'selected@example.com', username: 'selected', password: 'password' };
      
      const action = selectedUserFull({ user });
      
      expect(action.type).toBe('[Users] selectedUserFull');
      expect(action.user).toEqual(user);
    });
  });

  describe('selectedUserEmpty', () => {
    it('should create a selectedUserEmpty action', () => {
      const action = selectedUserEmpty();
      expect(action.type).toBe('[User-Form] selectedUserEmpty');
    });
  });
});