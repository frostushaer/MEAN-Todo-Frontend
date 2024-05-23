import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  constructor(public authService: AuthService, private afAuth: AngularFireAuth, private router: Router) {}

  // if user is already signed in, redirect to dashboard
  ngOnInit() {
    
    this.afAuth.getRedirectResult().then(result => {
      if (result.user) {
        console.log('Successfully signed in with redirect', result);
        this.router.navigate(['/dashboard']); 
      } 
    }).catch(error => {
      console.error('Error handling redirect result', error);
    });
  }
}
