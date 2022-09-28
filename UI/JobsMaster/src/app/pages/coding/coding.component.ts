import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-coding',
  templateUrl: './coding.component.html',
  styleUrls: ['./coding.component.css']
})
export class CodingComponent implements OnInit {

  questionsLoaded = false;
  easyQuestions: any[] = [];
  mediumQuestions: any[] = [];
  hardQuestions: any[] = [];

  goToLC(url: string) {
    window.open(url, '_blank');
  }
  constructor(private router: Router,private apiservice: ApiService) { }

  ngOnInit(): void {
    // If there is no user logged in, redirect to login page
    if (localStorage.getItem('isLoggedIn') !== 'true') {
      this.router.navigate(['/login']);
    }
    this.apiservice.getQuestions().subscribe(
      data => {
        this.easyQuestions = data.easy;
        this.mediumQuestions = data.medium;
        this.hardQuestions = data.hard;
        this.questionsLoaded = true;
      }
    );
  }

}
