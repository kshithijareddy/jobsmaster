import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-fulltime',
  templateUrl: './fulltime.component.html',
  styleUrls: ['./fulltime.component.css']
})
export class FulltimeComponent implements OnInit {

  jobsLoaded: boolean = false;
  jobs: any[] = [];
  constructor(private router: Router,private apiService: ApiService) { }

  apply(url: string): void {
    window.open(url, '_blank');
  }

  ngOnInit(): void {
    // If there is no user logged in, redirect to login page
    if (localStorage.getItem('isLoggedIn') !== 'true') {
      this.router.navigate(['/login']);
    }
    var body = {
      "type": "FullTime"
    }
    this.apiService.getJobs(body).subscribe({
      next: data => {
        this.jobs = data;
        this.jobsLoaded = true;
      }
    });
  }

}
