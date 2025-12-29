import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserModel } from '../../models/users.model';
import { FormsModule, NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'user-form',
  imports: [FormsModule],
  templateUrl: './user-form.html',
})
export class UserForm {

  private store = inject(Store);
  users = this.store.selectSignal((state) => state.users.users);

  @Input() user: UserModel = new UserModel();
  @Input() openForm!: boolean;

  @Output() newUserEventEmitter: EventEmitter<UserModel> = new EventEmitter();
  @Output() setFormEventEmitter: EventEmitter<boolean> = new EventEmitter();

  editingUser(): boolean {
    return this.users().find((u: UserModel) => u.id == this.user.id)
  }

  stopEditing(form?: NgForm): void {
    this.user = new UserModel();
    form?.resetForm(this.user);
  }

  onSubmit(userForm: NgForm) {
    if (userForm.valid) {
      Swal.fire({
        title: "User created success",
        text: this.user.username + (this.editingUser()? " has been updated" :" has been added"),
        icon: "success"
      });
      this.newUserEventEmitter.emit(this.user);
    }
    this.resetForm(userForm);
  }

  resetForm(form: NgForm) {
    this.user = new UserModel();
    form.resetForm(this.user);   
  }


  setOpen(): void{
    this.setFormEventEmitter.emit();
  }
}
