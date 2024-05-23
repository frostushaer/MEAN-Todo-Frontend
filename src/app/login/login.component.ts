// src/app/login/login.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authService: AuthService) { }

  async signInWithGoogle() {
    try {
      await this.authService.googleSignIn();
      console.log("User signed in successfully");
    } catch (error) {
      console.error("Error during sign-in", error);
    }
  }

  async signOut() {
    try {
      await this.authService.signOut();
      console.log("User signed out successfully");
    } catch (error) {
      console.error("Error during sign-out", error);
    }
  }
}
