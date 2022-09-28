import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-internships',
  templateUrl: './internships.component.html',
  styleUrls: ['./internships.component.css']
})
export class InternshipsComponent implements OnInit {

  jobsLoaded: boolean = false;
  internships: any[] = [];
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
      "type": "Internships"
    }
    this.apiService.getJobs(body).subscribe({
      next: data => {
        this.internships = data;
        this.jobsLoaded = true;
      }
    });
  }

}
