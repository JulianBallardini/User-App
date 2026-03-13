import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../../services/user';
import { exhaustMap, map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  findAll,
  load,
  loadPage,
  setPageInfo,
  addUser,
  addUserSuccess,
  updateUser,
  updateUserSuccess,
  removeUser,
  addUserError,
  updateUserError,
  removeUserError,
} from '../users.actions';
@Injectable()
export class UserEffects {
  private actions$ = inject(Actions);
  private service = inject(UserService);

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(load),
      exhaustMap(() =>
        this.service
          .findAllPageable(0)
          .pipe(
            switchMap((page) => [
              setPageInfo({ totalPages: page.totalPages, totalElements: page.totalElements }),
              findAll({ usuarios: page.content }),
            ]),
          ),
      ),
    ),
  );

  loadPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPage),
      exhaustMap(({ page }) =>
        this.service.findAllPageable(page).pipe(
          switchMap((pageData) => [
            setPageInfo({
              totalPages: pageData.totalPages,
              totalElements: pageData.totalElements,
            }),
            findAll({ usuarios: pageData.content }),
          ]),
        ),
      ),
    ),
  );

  addUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addUser),
      exhaustMap(({ usuario }) =>
        this.service.create(usuario).pipe(
          map((createdUser) => addUserSuccess({ usuario: createdUser })),
          catchError((error) => of(addUserError({ error }))),
        ),
      ),
    ),
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateUser),
      exhaustMap(({ usuario }) =>
        this.service.update(usuario).pipe(
          map((updatedUser) => updateUserSuccess({ usuario: updatedUser })),
          catchError((error) => of(updateUserError({ error }))),
        ),
      ),
    ),
  );

  removeUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeUser),
      exhaustMap(({ id }) =>
        this.service.delete(id).pipe(
          map(() => removeUserError({ error: null })),
          catchError((error) => of(removeUserError({ error }))),
        ),
      ),
    ),
  );
}
