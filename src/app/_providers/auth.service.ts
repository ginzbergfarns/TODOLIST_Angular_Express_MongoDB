import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  storage = sessionStorage;
  constructor(private http: HttpClient) {}

  logIn(user) {
    return this.http.post('/api/auth/login', user).pipe(map((userData) => {
      console.log(user.remember);
      if (user.remember) {
        this.storage = localStorage;
      } else {
        this.storage = sessionStorage;
      }
      this.saveUserToStorage(userData);
    }));
  }

  signIn(user) {
    return this.http.post('/api/auth/add-user', user).pipe(map((userData) => {
      this.saveUserToStorage(userData);
    }));
  }

  saveUserToStorage(data) {
    this.storage.setItem('userId', data._id);
    this.storage.setItem('userName', data.name);
  }

  getUserId() {
    return this.storage.getItem('userId');
  }

  getUserName() {
    return this.storage.getItem('userName');
  }
}
