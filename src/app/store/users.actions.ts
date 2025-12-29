import { createAction, props } from "@ngrx/store";
import { UserModel } from "../models/users.model";

export const load = createAction('[User-App] load');
export const findAll = createAction('[User-App] findAll', props<{usuarios: UserModel[]}>());
export const addUser = createAction('[User-App] addUser', props<{usuario: UserModel}>());
export const updateTotal = createAction('[User-App] updateTotal');
export const removeUser = createAction('[User-App] removeUser', props<{id: number}>());
export const updateUser = createAction('[User-App] updateUser', props<{usuario: UserModel}>());