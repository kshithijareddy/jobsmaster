import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-mock',
  templateUrl: './mock.component.html',
  styleUrls: ['./mock.component.css']
})
export class MockComponent implements OnInit { 
  uuid: string = "";
  mentors: any[] = [];
  mentorsLoaded: boolean = false;
  mentorSelected: any;
  listOfSelectedValue: any[] = [];
  constructor(private apiService: ApiService, private router: Router,private notification: NzNotificationService) { }
  isVisible = false;

  schedule(mentorName: string) {
    this.isVisible = true;
    this.mentors.forEach(mentor => {
      if (mentor.name === mentorName) {
        this.mentorSelected = mentor;
      }
    }, this);
  }

  handleOk(): void {
    this.isVisible = false;
    this.notification.create(
      'success',
      'Request Sent to Mentor',
      'Your request has been sent to the mentor. Mentor will get back to you shortly!'
    );
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  ngOnInit(): void {
    // If there is no user logged in, redirect to login page
    if (localStorage.getItem('isLoggedIn') !== 'true') {
      this.router.navigate(['/login']);
    }
    var userDetails = localStorage.getItem('user');
    if (userDetails) {
      var user = JSON.parse(userDetails);
      var userId = user.user.uid;
      this.uuid = userId;
    }
    this.apiService.getMentors().subscribe(data => {
      this.mentors = data;
      this.mentorsLoaded = true;
    });
  }

}
