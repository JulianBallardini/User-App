import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { User, CreateUserRequest, UpdateUserRequest } from '../../models/users.model';
import { FormsModule, NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
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
    console.log('OnInit - selectedUser:', selectedUser);
    console.log('OnInit - current user:', this.user);

    if (selectedUser && selectedUser.id !== undefined && selectedUser.id !== -1) {
      this.user = { ...selectedUser };
      console.log('User set for editing:', this.user);
    } else {
      // Reset form for new user creation
      this.user = { name: '', lastname: '', email: '', username: '', password: '' };
      console.log('Form reset for new user');
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
    console.log('addUser called with:', usuario);
    console.log('Current users:', this.users());
    console.log('Current total:', this.total());

    if (!usuario.id || usuario.id === -1) {
      const currentUsers = this.users();
      let newId = 1; // Default ID for first user

      if (currentUsers.length > 0) {
        // Find the highest existing ID and add 1
        newId = Math.max(...currentUsers.map((u: User) => u.id || 0)) + 1;
      }

      usuario.id = newId;
      console.log('Adding new user with ID:', usuario.id);

      this.store.dispatch(addUser({ usuario }));
      this.store.dispatch(updateTotal());
    } else {
      console.log('Updating existing user:', usuario);
      this.store.dispatch(updateUser({ usuario }));
    }
  }
}
