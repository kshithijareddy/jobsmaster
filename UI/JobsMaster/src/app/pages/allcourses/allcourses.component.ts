import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-allcourses',
  templateUrl: './allcourses.component.html',
  styleUrls: ['./allcourses.component.css']
})
export class AllcoursesComponent implements OnInit {

  uuid: string = "";
  courses: any[] = [];
  coursesLoaded: boolean = false;
  constructor(private apiService: ApiService, private router: Router) { }

  buyCourse(id: number): void {
    var course = this.courses[id];
    var body = {
      'uuid': this.uuid,
      'course_id': course.id
    };
    this.apiService.buyCourse(body).subscribe({
      next: data => {
        console.log(data);
        this.router.navigate(['/mycourses']);
      }
    });
  }

  goToCourse(id: number): void {
    var course = this.courses[id];
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "link": course.link
      },
      skipLocationChange: true,
    };
    this.router.navigate(['/course'],navigationExtras);
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
      this.apiService.getCourses().subscribe({
        next: data => {
          this.courses = data;
          var body = {
            'uuid': userId
          };
          this.apiService.getMyCourses(body).subscribe({
            next: data => {
              var myCourses = data;
              for (var i = 0; i < this.courses.length; i++) {
                for (var j = 0; j < myCourses.length; j++) {
                  if (this.courses[i].id == myCourses[j].id) {
                    this.courses[i].bought = true;
                  }
                }
              }
              this.coursesLoaded = true;
            }
          });
        }
      });
    }
  }
}
