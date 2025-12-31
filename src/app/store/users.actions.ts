import { createAction, props } from '@ngrx/store';
import { User } from '../models/users.model';

export const load = createAction('[User-App] load');
export const findAll = createAction('[User-App] findAll', props<{ usuarios: User[] }>());
export const addUser = createAction('[User-App] addUser', props<{ usuario: User }>());
export const updateTotal = createAction('[User-App] updateTotal');
export const removeUser = createAction('[Users] removeUser', props<{ id: number }>());
export const updateUser = createAction('[User-App] updateUser', props<{ usuario: User }>());
export const selectedUserFull = createAction('[Users] selectedUserFull', props<{ user: User }>());
export const selectedUserEmpty = createAction('[User-Form] selectedUserEmpty');
