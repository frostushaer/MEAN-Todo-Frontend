// src/app/auth.service.ts
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private apiUrl = 'http://localhost:3000/api/users/';
  

  user$: Observable<firebase.User | null>;

  constructor(private afAuth: AngularFireAuth,private http: HttpClient, private router: Router) {
    this.user$ = this.afAuth.authState;
  }

  async googleSignIn() {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      const result = await this.afAuth.signInWithPopup(provider); 
      this.updateUserData(result.user);
      const token = result.user ? await result.user.getIdToken() : null;
      localStorage.setItem('accessToken', token ?? '');
      this.router.navigate(['/dashboard']);
    } catch (error) {
      console.error("Error during Google sign-in", error);
      throw error;
    }
  }

  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  decodeToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error("Error decoding token", error);
      return null;
    }
  }

  getDecodedAccessToken(): any {
    const token = this.getAccessToken();
    return token ? this.decodeToken(token) : null;
  }

  async signOut() {
    await this.afAuth.signOut();
    localStorage.removeItem('accessToken');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): Observable<boolean> {
    return this.user$.pipe(map(user => !!user));
  }

  private updateUserData(user: firebase.User | null) {
    if (!user) return;
    
    const userData = {
      uid: user.uid,
      email: user.email,
      name: user.displayName
    };

    this.http.post(this.apiUrl, userData).subscribe(
      response => console.log('User data saved:', response),
      error => console.error('Error saving user data:', error)
    );
  }

}

