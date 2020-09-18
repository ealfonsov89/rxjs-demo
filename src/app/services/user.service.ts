import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private readonly http: HttpClient) { }
  getUsers(): Observable<Array<User>> {
    return this.http.get<{data: Array<User>}>('http://localhost:3000/user-list')
    .pipe(map(page => page.data));
  }
}
