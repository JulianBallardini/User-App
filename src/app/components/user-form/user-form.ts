import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2';
import { User } from '../../models/users.model';
import { addUser, selectedUserEmpty, updateTotal, updateUser } from '../../store/users.actions';

@Component({
  selector: 'user-form',
  imports: [FormsModule],
  templateUrl: './user-form.html',
})
export class UserForm implements OnInit {
  private store = inject(Store);
  private router = inject(Router);
  users = this.store.selectSignal((state) => state.users.users);
  total = this.store.selectSignal((state) => state.users.total);
  selectedUser = this.store.selectSignal((state) => state.users.selectedUser);

  user: User = { name: '', lastname: '', email: '', username: '', password: '' };

  ngOnInit() {
    this.initializeUserForEditing();
  }

  initializeUserForEditing(): void {
    const selectedUser = this.selectedUser();

    if (selectedUser && selectedUser.id !== undefined && selectedUser.id !== -1) {
      this.user = { ...selectedUser };
    } else {
      // Reset form for new user creation
      this.user = { name: '', lastname: '', email: '', username: '', password: '' };
    }
  }

  editingUser(): boolean {
    return (
      this.selectedUser() && this.selectedUser().id !== undefined && this.selectedUser().id !== -1
    );
  }

  stopEditing(form?: NgForm): void {
    this.store.dispatch(selectedUserEmpty());
    this.user = { ...this.selectedUser() };
    form?.resetForm(this.user);
    this.router.navigate(['/users']);
  }

  navigateToUsers(): void {
    this.router.navigate(['/users']);
  }

  onSubmit(userForm: NgForm) {
    if (userForm.valid) {
      this.addUser(this.user);

      Swal.fire({
        title: 'User created success',
        text: this.user.username + (this.editingUser() ? ' has been updated' : ' has been added'),
        icon: 'success',
      }).then(() => {
        // Navigate after user closes the alert
        this.router.navigate(['/users']);
      });
    }
  }

  resetForm(form: NgForm): void {
    this.user = { name: '', lastname: '', email: '', username: '', password: '' };
    form?.resetForm(this.user);
  }

  addUser(usuario: User): void {
    if (!usuario.id || usuario.id === -1) {
      const currentUsers = this.users();
      let newId = 1; // Default ID for first user

      if (currentUsers.length > 0) {
        // Find the highest existing ID and add 1
        newId = Math.max(...currentUsers.map((u: User) => u.id || 0)) + 1;
      }

      usuario.id = newId;

      this.store.dispatch(addUser({ usuario }));
      this.store.dispatch(updateTotal());
    } else {
      this.store.dispatch(updateUser({ usuario }));
    }
  }
}
