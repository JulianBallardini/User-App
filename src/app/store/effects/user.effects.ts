import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../../services/user';
import { exhaustMap, map } from 'rxjs';
import { findAll, load } from '../users.actions';
@Injectable()
export class UserEffects {
  private actions$ = inject(Actions);
  private service = inject(UserService);

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(load),
      exhaustMap(() =>
        this.service.findAll().pipe(map((usuarios) => findAll({ usuarios: usuarios }))),
      ),
    ),
  );
}
