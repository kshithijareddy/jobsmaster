import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth : AngularFireAuth, private router: Router, private notification: NzNotificationService) { }

  // Login
  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password)
    .then(user => {
      localStorage.setItem('user', JSON.stringify(user));
      console.log(JSON.stringify(user));
      localStorage.setItem('isLoggedIn', 'true');
      this.router.navigate(['/dailyplanner'], {
        skipLocationChange: true
      });
    })
    .catch(err => {
      console.log(err);
      this.notification.create('error','Login Failed!','',{ nzDuration: 2000 });
      this.router.navigate(['/login'], {
        skipLocationChange: true
      });
    })
  }

  // Register
  register(email: string, password: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password)
    .then(user => {
      alert('User Created Successfully');
      this.router.navigate(['/login'], {
        skipLocationChange: true
      });
    })
    .catch(err => {
      console.log(err);
      this.router.navigate(['/register'], {
        skipLocationChange: true
      });
    })
  }

  // Logout
  logout() {
    this.fireauth.signOut()
    .then(() => {
      localStorage.removeItem('user');
      localStorage.removeItem('isLoggedIn');
      this.router.navigate(['/login'], {
        skipLocationChange: true
      });
    })
    .catch(err => {
      console.log(err);
    })
  }

}
