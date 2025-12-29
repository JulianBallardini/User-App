import { Injectable } from '@angular/core';
import { UserModel } from '../models/users.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: UserModel[] = [
    {
      id: 0,
      name: 'Luca Julián',
      lastname: 'Ballardini',
      email: 'ballardini.lucajulian@gmail.com',
      username: 'xXJulian128Xx',
      password: 'julian123'
    },
    {
      id: 1,
      name: 'Mia',
      lastname: 'Duffort',
      email: 'mia.duffort@gmail.com',
      username: 'MiaLaMasCapa',
      password: 'mia123'
    }
  ];

  constructor(){};

  findAll(): Observable<UserModel[]>{
    return of(this.users)
  }

}
