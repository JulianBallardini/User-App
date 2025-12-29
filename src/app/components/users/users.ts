import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserModel } from '../../models/users.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'users',
  imports: [],
  templateUrl: './users.html',
})
export class Users {
  private store = inject(Store);
  users = this.store.selectSignal((state) => state.users.users);

  @Output() removeUserEventEmitter: EventEmitter<number> = new EventEmitter();

  @Output() selectedUserEventEmitter: EventEmitter<UserModel> = new EventEmitter();


  onRemoveUser(id: number) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.removeUserEventEmitter.emit(id);
        Swal.fire({
          title: "Deleted!",
          text: "User has been deleted.",
          icon: "success"
        });
      }
    });

    
  }

  onSelectedUser(user: UserModel) {
    this.selectedUserEventEmitter.emit(user);
  }
}
