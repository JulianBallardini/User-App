import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from '../../models/users.model';
import Swal from 'sweetalert2';
import { Router, RouterLink } from '@angular/router';
import { removeUser, selectedUserFull, loadPage } from '../../store/users.actions';

@Component({
  selector: 'users',
  imports: [RouterLink],
  templateUrl: './users.html',
})
export class Users {
  title: string = 'Lista de usuarios';

  private router = inject(Router);
  private store = inject(Store);
  users = this.store.selectSignal((state) => state.users.users);
  currentPage = this.store.selectSignal((state) => state.users.currentPage);
  totalPages = this.store.selectSignal((state) => state.users.totalPages);
  total = this.store.selectSignal((state) => state.users.total);

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
        setTimeout(() => this.reloadCurrentPage(), 100);
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

  loadPage(page: number) {
    this.store.dispatch(loadPage({ page }));
  }

  reloadCurrentPage() {
    this.store.dispatch(loadPage({ page: this.currentPage() }));
  }

  nextPage() {
    if (this.currentPage() < this.totalPages() - 1) {
      this.loadPage(this.currentPage() + 1);
    }
  }

  prevPage() {
    if (this.currentPage() > 0) {
      this.loadPage(this.currentPage() - 1);
    }
  }
}
