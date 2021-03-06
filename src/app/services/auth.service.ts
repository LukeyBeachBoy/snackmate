/**
 * @file An authentication service that connects to
 * firestore. Can log users in with 3rd party services
 * or email/password. Provides a global access to the
 * user observable that allows components to see if a user
 * is logged in and, if so, access their data
 *
 * @author Luke Beach // lb580@kent.ac.uk
 * @author Juned Hussain // jh815@kent.ac.uk
 */

import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';

import { Observable, of, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from '../definitions/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }

  async signOut() {
    await this.afAuth.auth.signOut();
    return this.router.navigate(['/']);
  }

  private updateUserData({ uid, email, displayName, photoURL }: User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${uid}`
    );

    userRef.get().subscribe(user => {
      const followers = user.get('followers');
      if (followers) {
        const data = {
          uid,
          email,
          displayName,
          photoURL
        };
        return userRef.set(data, { merge: true });
      } else {
        const data = {
          uid,
          email,
          displayName,
          photoURL,
          following: [],
          followers: []
        };
        return userRef.set(data, { merge: true });
      }
    });
  }

  public getUser(uid: string) {
    return this.afs.doc(`/users/${uid}`).valueChanges();
  }
}
