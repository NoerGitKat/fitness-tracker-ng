import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthData } from './auth-data.model';
import { User } from './user.model';

@Injectable()
export class AuthService {
  public authChange = new Subject<boolean>();
  private user!: User | null;

  constructor(private router: Router) {}

  register(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString(),
    };
    this.authenticate(true, ['/training']);
  }

  login(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString(),
    };
    this.authenticate(true, ['/training']);
  }

  logout() {
    this.user = null;
    this.authenticate(false, ['/']);
  }

  getUser() {
    return { ...this.user };
  }

  isAuth() {
    return this.user != null;
  }

  private authenticate(isAuth: boolean, routes: string[]) {
    this.authChange.next(isAuth);
    this.router.navigate(routes);
  }
}
