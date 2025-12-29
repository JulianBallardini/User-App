import { createReducer, on } from "@ngrx/store";
import { addUser, findAll, load, removeUser, updateTotal, updateUser } from "./users.actions";
import { UserModel } from "../models/users.model";

export interface UsersState {
    users: UserModel[],
    total: number
}

export const initialState: UsersState = {users: [], total: 0};

export const userReducer = createReducer(
    initialState,
    on(load, (state) => ({users: [...state.users], total: state.total})),
    on(findAll , (state, {usuarios}) => {
        return {
            ... state,
            users: usuarios
        }
    }),
    on(addUser, (state, {usuario}) => {
        return {
            ... state,
            users: [...state.users, usuario]
        }
    }),
    on(updateTotal, (state) => {
        return {
            ... state,
            total: state.users.length
        }
    }),
    on(removeUser, (state, {id}) => {
        return {
            ... state,
            users: state.users.filter((user) => {
                return user.id != id;
            })
        }
    }),
    on(updateUser, (state, {usuario}) => {
        return {
            ... state,
            users: state.users.map((u) => {
                if(u.id == usuario.id){
                    u = usuario;
                }
                return u;
            })
        }
    })
)