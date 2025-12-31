import { Routes } from '@angular/router';
import { Users } from './components/users/users';
import { UserForm } from './components/user-form/user-form';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/users',
  },
  {
    path: 'users',
    component: Users,
  },
  {
    path: 'users/create',
    component: UserForm,
  },
  {
    path: 'users/edit/:id',
    component: UserForm,
  },
];
