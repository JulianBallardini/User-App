import { createReducer, on } from '@ngrx/store';
import { User } from '../models/users.model';
import {
  addUser,
  addUserSuccess,
  findAll,
  load,
  loadPage,
  removeUser,
  selectedUserEmpty,
  selectedUserFull,
  setPageInfo,
  updateTotal,
  updateUser,
  updateUserSuccess,
  addUserError,
  updateUserError,
  removeUserError,
} from './users.actions';

export interface UsersState {
  users: User[];
  total: number;
  selectedUser: User;
  error: any;
  currentPage: number;
  totalPages: number;
}

export const initialState: UsersState = {
  users: [],
  total: 0,
  selectedUser: { name: '', lastname: '', email: '', username: '', password: '' },
  error: null,
  currentPage: 0,
  totalPages: 0,
};

export const userReducer = createReducer(
  initialState,
  on(load, (state) => ({
    ...state,
    error: null,
  })),
  on(loadPage, (state, { page }) => ({
    ...state,
    currentPage: page,
    error: null,
  })),
  on(findAll, (state, { usuarios }) => {
    return {
      ...state,
      users: usuarios,
      error: null,
    };
  }),
  on(addUser, (state) => ({
    ...state,
    error: null,
  })),
  on(addUserSuccess, (state, { usuario }) => {
    return {
      ...state,
      users: [...state.users, usuario],
      error: null,
    };
  }),
  on(updateTotal, (state) => {
    return {
      ...state,
      total: state.users.length,
      error: null,
    };
  }),
  on(removeUser, (state, { id }) => {
    return {
      ...state,
      users: state.users.filter((user) => {
        return user.id != id;
      }),
      error: null,
    };
  }),
  on(updateUser, (state) => ({
    ...state,
    error: null,
  })),
  on(updateUserSuccess, (state, { usuario }) => {
    return {
      ...state,
      users: state.users.map((u: User) => {
        if (u.id == usuario.id) {
          u = usuario;
        }
        return u;
      }),
      error: null,
    };
  }),
  on(selectedUserFull, (state, { user }) => {
    return {
      ...state,
      selectedUser: user,
      error: null,
    };
  }),
  on(selectedUserEmpty, (state) => {
    return {
      ...state,
      selectedUser: { name: '', lastname: '', email: '', username: '', password: '' },
      error: null,
    };
  }),
  on(addUserError, (state, { error }) => ({
    ...state,
    error,
  })),
  on(updateUserError, (state, { error }) => ({
    ...state,
    error,
  })),
  on(removeUserError, (state, { error }) => ({
    ...state,
    error,
  })),
  on(setPageInfo, (state, { totalPages, totalElements }) => ({
    ...state,
    totalPages,
    total: totalElements,
  })),
);
