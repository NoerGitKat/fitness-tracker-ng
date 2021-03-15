import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { TrainingService } from '../training/training.service';
import { AuthData } from './auth-data.model';
import { User } from './user.model';

@Injectable()
export class AuthService {
  public authChange = new Subject<boolean>();
  private isAuthenticated = false;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private trainingService: TrainingService
  ) {}

  initAuthListener() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.authenticate(true, ['/training']);
      } else {
        this.logout();
      }
    });
  }

  async register(authData: AuthData) {
    try {
      const newUser = await this.afAuth.createUserWithEmailAndPassword(
        authData.email,
        authData.password
      );
      this.authenticate(true, ['/training']);
    } catch (err) {
      console.error(err);
    }
  }

  async login(authData: AuthData) {
    try {
      const loggedInUser = await this.afAuth.signInWithEmailAndPassword(
        authData.email,
        authData.password
      );
      this.authenticate(true, ['/training']);
    } catch (err) {
      console.error(err);
    }
  }

  logout() {
    this.trainingService.cancelSubscriptions();
    this.afAuth.signOut();
    this.isAuthenticated = false;
    this.authenticate(false, ['/']);
  }

  checkAuth() {
    return this.isAuthenticated;
  }

  private authenticate(isAuth: boolean, routes: string[]) {
    this.isAuthenticated = true;
    this.authChange.next(isAuth);
    this.router.navigate(routes);
  }
}
