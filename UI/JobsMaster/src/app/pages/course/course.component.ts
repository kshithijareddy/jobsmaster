import { Component, OnInit, SecurityContext } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  url: any;
  constructor(private route: ActivatedRoute,private sanitizer: DomSanitizer,private router: Router) {
    this.route.queryParams.subscribe(params => {
      this.url = params['link'];
      console.log(this.url);
    });
  }

  back(){
    // Go to /mycourses
    this.router.navigate(['/mycourses']);
  }

  ngOnInit(): void {
    // If there is no user logged in, redirect to login page
    if (localStorage.getItem('isLoggedIn') !== 'true') {
      this.router.navigate(['/login']);
    }
  }

}
