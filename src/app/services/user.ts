import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Page, User } from '../models/users.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private url: string = 'http://localhost:8080/api/users';

  findAllPageable(page: number): Observable<Page<User>> {
    return this.http.get<Page<User>>(`${this.url}/page/${page}`);
  }

  findById(id: number): Observable<User> {
    return this.http.get<User>(`${this.url}/${id}`);
  }

  create(user: User): Observable<User> {
    const userWithoutId = { ...user };
    delete userWithoutId.id;
    return this.http.post<User>(this.url, userWithoutId);
  }

  update(user: User): Observable<User> {
    return this.http.put<User>(`${this.url}/${user.id}`, user);
  }

  delete(id: number): Observable<User> {
    return this.http.delete<User>(`${this.url}/${id}`);
  }
}
