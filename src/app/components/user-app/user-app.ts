import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadPage } from '../../store/users.actions';
import { User } from '../../models/users.model';
import { RouterOutlet } from '@angular/router';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'user-app',
  imports: [RouterOutlet, Navbar],
  templateUrl: './user-app.html',
})
export class UserApp implements OnInit {
  userSelected: User = { name: '', lastname: '', email: '', username: '', password: '' };

  private store = inject(Store);
  users = this.store.selectSignal((state) => state.users.users);
  total = this.store.selectSignal((state) => state.users.total);

  ngOnInit(): void {
    this.store.dispatch(loadPage({ page: 0 }));
  }
}
