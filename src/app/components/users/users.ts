import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from '../../models/users.model';
import Swal from 'sweetalert2';
import { Router, RouterLink } from '@angular/router';
import { removeUser, selectedUserFull, updateTotal } from '../../store/users.actions';

@Component({
  selector: 'users',
  imports: [RouterLink],
  templateUrl: './users.html',
})
export class Users {
  title: string = 'Lista de usuarios';

  // eslint-disable-next-line no-unused-vars
  constructor(private router: Router) {}

  private store = inject(Store);
  users = this.store.selectSignal((state) => state.users.users);

  onRemoveUser(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.store.dispatch(removeUser({ id }));
        this.store.dispatch(updateTotal());
        Swal.fire({
          title: 'Deleted!',
          text: 'User has been deleted.',
          icon: 'success',
        });
      }
    });
  }

  onSelectedUser(user: User) {
    this.store.dispatch(selectedUserFull({ user }));
    this.router.navigate(['/users/edit', user.id]);
  }
}
