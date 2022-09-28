import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [NzNotificationService]
})
export class AppComponent {
  title = 'JobsMaster';
  isCollapsed = false;
  isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'; 

  visible = false;

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }
  contact() {
    this.open();
  }

  logout() {
    localStorage.setItem('isLoggedIn', 'false');
    this.isLoggedIn = false;
    this.notification.create('success','Logout Successful!','',{ nzDuration: 2000 });
    this.router.navigate(['/login'], { skipLocationChange: true });
  }

  constructor(private router: Router,private notification: NzNotificationService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (event.url === '/') {
          this.router.navigate(['/login'], { skipLocationChange: true });
        }
      }
    });
    // Check for any changes in localStorage and update isLoggedIn
    window.addEventListener('storage', (event) => {
      if (event.key === 'isLoggedIn') {
        this.isLoggedIn = event.newValue === 'true';
      }
    });
  }
}
