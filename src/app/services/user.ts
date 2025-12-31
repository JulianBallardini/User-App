import { Injectable } from '@angular/core';
import { User } from '../models/users.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: User[] = [
    {
      id: 0,
      name: 'Luca Julián',
      lastname: 'Ballardini',
      email: 'ballardini.lucajulian@gmail.com',
      username: 'xXJulian128Xx',
      password: 'julian123',
    },
    {
      id: 1,
      name: 'Mia',
      lastname: 'Duffort',
      email: 'mia.duffort@gmail.com',
      username: 'MiaLaMasCapa',
      password: 'mia123',
    },
  ];

  findAll(): Observable<User[]> {
    return of(this.users);
  }
}
