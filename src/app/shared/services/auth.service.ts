import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {auth, User} from 'firebase'
import { Observable, of } from 'rxjs';
import { AppUser } from 'shared/models/app-user';
import { switchMap } from 'rxjs/operators'
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  user$: Observable<User>

  constructor(
    private afAuth: AngularFireAuth,
    private userService: UserService
  ) { 
    // get user state directly from firebase
    // we NOT store user info on local
    this.user$ = this.afAuth.authState
  }

  /**
   * Firebase login with Google account
   * Redirect to another page
   */
  login() {
    this.afAuth.signInWithRedirect(
      new auth.GoogleAuthProvider()
    )
  }

  logout(): Promise<void> {
    return this.afAuth.signOut()
  }

  /**
   * When we get user info with the line below
   * this.user$ = this.afAuth.authState
   * This user info is from Firebase authentication,
   * NOT form Firebase database, have model of firebase.User.
   * 
   * This method get the user info stored in Firebase database
   * that have model of AppUser
   */
  get appUser$(): Observable<AppUser> {
    return this.user$.pipe(
      // NOTICE: switchMap have problem when working with async pipe on template
      switchMap(user => { 
        if (user) {
          return this.userService.get(user.uid)
        }
        return of(null) 
      }),
    )
  }
}
