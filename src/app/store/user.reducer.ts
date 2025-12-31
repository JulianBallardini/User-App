import { createReducer, on } from '@ngrx/store';
import {
  addUser,
  findAll,
  load,
  removeUser,
  selectedUserEmpty,
  selectedUserFull,
  updateTotal,
  updateUser,
} from './users.actions';
import { User } from '../models/users.model';

export interface UsersState {
  users: User[];
  total: number;
  selectedUser: User;
}

export const initialState: UsersState = {
  users: [],
  total: 0,
  selectedUser: { name: '', lastname: '', email: '', username: '', password: '' },
};

export const userReducer = createReducer(
  initialState,
  on(load, (state) => ({
    users: [...state.users],
    total: state.total,
    selectedUser: state.selectedUser,
  })),
  on(findAll, (state, { usuarios }) => {
    return {
      ...state,
      users: usuarios,
    };
  }),
  on(addUser, (state, { usuario }) => {
    return {
      ...state,
      users: [...state.users, usuario],
    };
  }),
  on(updateTotal, (state) => {
    return {
      ...state,
      total: state.users.length,
    };
  }),
  on(removeUser, (state, { id }) => {
    return {
      ...state,
      users: state.users.filter((user) => {
        return user.id != id;
      }),
    };
  }),
  on(updateUser, (state, { usuario }) => {
    return {
      ...state,
      users: state.users.map((u: User) => {
        if (u.id == usuario.id) {
          u = usuario;
        }
        return u;
      }),
    };
  }),
  on(selectedUserFull, (state, { user }) => {
    return {
      ...state,
      selectedUser: user,
    };
  }),
  on(selectedUserEmpty, (state) => {
    return {
      ...state,
      selectedUser: { name: '', lastname: '', email: '', username: '', password: '' },
    };
  }),
);
