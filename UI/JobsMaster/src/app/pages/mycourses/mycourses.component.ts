import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-mycourses',
  templateUrl: './mycourses.component.html',
  styleUrls: ['./mycourses.component.css']
})
export class MycoursesComponent implements OnInit {

  uuid: string = "";
  myCourses: any[] = [];
  coursesLoaded: boolean = false;
  constructor(private apiService: ApiService, private router: Router) { }

  goToCourse(id: number): void {
    var course = this.myCourses[id];
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "link": course.link
      },
      skipLocationChange: true,
    };
    this.router.navigate(['/course'],navigationExtras);
  }

  deleteCourse(id: number): void {
    var course = this.myCourses[id];
    console.log(course);
    var body = {
      'uuid': this.uuid,
      'course_id': course.id
    };
    console.log(body);
    this.apiService.deleteCourse(body).subscribe({
      next: data => {
        this.myCourses.splice(id, 1);
      }
    });
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
      var body = {
        'uuid': userId
      };
      this.apiService.getMyCourses(body).subscribe({
        next: data => {
          if (data != this.myCourses) {
            this.myCourses = data;
          }
          this.coursesLoaded = true;
        }
      });
    }
  }

}
