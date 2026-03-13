import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2';
import { User } from '../../models/users.model';
import { addUser, selectedUserEmpty, updateTotal, updateUser } from '../../store/users.actions';
import { UserService } from '../../services/user';

@Component({
  selector: 'user-form',
  imports: [FormsModule],
  templateUrl: './user-form.html',
})
export class UserForm implements OnInit {
  private service = inject(UserService);
  private store = inject(Store);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  users = this.store.selectSignal((state) => state.users.users);
  total = this.store.selectSignal((state) => state.users.total);
  selectedUser = this.store.selectSignal((state) => state.users.selectedUser);
  error = this.store.selectSignal((state) => state.users.error);

  user: User = { name: '', lastname: '', email: '', username: '', password: '' };

  ngOnInit() {
    this.initializeUserForEditing();
  }

  initializeUserForEditing(): void {
    const selectedUser = this.selectedUser();

    this.route.paramMap.subscribe((params) => {
      const id: number = +(params.get('id') || -1);

      if (this.service.findById(id) != null) {
        this.user = { ...selectedUser };
      } else {
        // Reset form for new user creation
        this.user = { name: '', lastname: '', email: '', username: '', password: '' };
      }
    });
  }

  editingUser(): boolean {
    return (
      this.selectedUser() && this.selectedUser().id !== undefined && this.selectedUser().id !== null
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

      // Check for errors after a short delay to allow effects to complete
      setTimeout(() => {
        const currentError = this.error();
        if (currentError) {
          let errorMessage = 'An error occurred while saving the user';

          // Extract error message from backend JSON response
          if (currentError.error) {
            if (typeof currentError.error === 'string') {
              errorMessage = currentError.error;
            } else if (currentError.error.message) {
              errorMessage = currentError.error.message;
            } else {
              errorMessage = JSON.stringify(currentError.error);
            }
          } else if (currentError.message) {
            errorMessage = currentError.message;
          }

          Swal.fire({
            title: 'Error',
            text: errorMessage,
            icon: 'error',
          });
        } else {
          Swal.fire({
            title: 'Success',
            text:
              this.user.username + (this.editingUser() ? ' has been updated' : ' has been added'),
            icon: 'success',
          }).then(() => {
            this.router.navigate(['/users']);
          });
        }
      }, 500);
    }
  }

  resetForm(form: NgForm): void {
    this.user = { name: '', lastname: '', email: '', username: '', password: '' };
    form?.resetForm(this.user);
  }

  addUser(usuario: User): void {
    if (usuario.id == null || usuario.id === -1) {
      const currentUsers = this.users();
      let newId = 0; // Default ID for first user

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
