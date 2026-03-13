import { createAction, props } from '@ngrx/store';
import { User } from '../models/users.model';

export const load = createAction('[User-App] load');
export const loadPage = createAction('[User-App] loadPage', props<{ page: number }>());
export const reloadPage = createAction('[User-App] reloadPage', props<{ page: number }>());
export const findAll = createAction('[User-App] findAll', props<{ usuarios: User[] }>());
export const setPageInfo = createAction(
  '[User-App] setPageInfo',
  props<{ totalPages: number; totalElements: number }>(),
);
export const addUser = createAction('[User-App] addUser', props<{ usuario: User }>());
export const addUserSuccess = createAction('[User-App] addUserSuccess', props<{ usuario: User }>());
export const updateTotal = createAction('[User-App] updateTotal');
export const removeUser = createAction('[Users] removeUser', props<{ id: number }>());
export const updateUser = createAction('[User-App] updateUser', props<{ usuario: User }>());
export const updateUserSuccess = createAction(
  '[User-App] updateUserSuccess',
  props<{ usuario: User }>(),
);
export const selectedUserFull = createAction('[Users] selectedUserFull', props<{ user: User }>());
export const selectedUserEmpty = createAction('[User-Form] selectedUserEmpty');
export const addUserError = createAction('[Users] addUserError', props<{ error: any }>());
export const updateUserError = createAction('[Users] updateUserError', props<{ error: any }>());
export const removeUserError = createAction('[Users] removeUserError', props<{ error: any }>());
