import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CalendarOptions } from '@fullcalendar/angular';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-dailyplanner',
  templateUrl: './dailyplanner.component.html',
  styleUrls: ['./dailyplanner.component.css']
})
export class DailyplannerComponent implements OnInit {

  isVisible = false;
  validateForm!: FormGroup;
  selectedDate: any = null;
  selectedTask: string = "";
  uuid: string = "";

  Events: any[] = [
    // { title: 'Finish Chat Component', date: '2022-05-28' },
    // { title: 'Shitty: ColdPlay Concert', date: '2022-05-29' },
    // { title: 'Mani: Work Hard!', date: '2022-05-29' },
    // { title: 'Final Project Submission', date: '2022-06-02' },
  ];

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    editable: true,
    selectable: false,
    unselectAuto: false,
    droppable: true,
    dateClick: this.handleDateClick.bind(this),
    eventClick: this.handleEventClick.bind(this),
    events: this.Events
  };

  handleDateClick(arg: any) {
    this.selectedDate = arg.dateStr;
    this.isVisible = true;
  }

  isDeleteVisible: boolean = false;
  handleEventClick(arg: any) {
    this.selectedDate = arg.event.startStr;
    this.selectedTask = arg.event.title;
    this.isDeleteVisible = true;
  }

  handleDeleteOk(): void {
    this.isDeleteVisible = false;
    this.Events = this.Events.filter(event => event.date !== this.selectedDate);
    this.selectedDate = null;
    var newEvents = this.Events.slice();
    this.calendarOptions.events = newEvents;
  }
  handleDeleteCancel(): void {
    this.isDeleteVisible = false;
  }

  handleOk(): void {
    this.isVisible = false;
    if (this.validateForm.valid) {
      this.Events.push({
        title: this.validateForm.value.task,
        date: this.selectedDate
      });
      this.validateForm.reset();
      var newEvents = this.Events.slice();
      this.calendarOptions.events = newEvents;
      var body = {
        'uuid': this.uuid,
        'tasks': this.Events
      };
      this.apiService.postPlanner(body).subscribe({
        next: data => {
          console.log(data);
        }
      });
    }
  }

  handleCancel(): void {
    this.isVisible = false;
    this.validateForm.reset();
  }

  constructor(private router: Router,private fb: FormBuilder,private apiService: ApiService) { }

  ngOnInit(): void {
    // If there is no user logged in, redirect to login page
    if (localStorage.getItem('isLoggedIn') !== 'true') {
      this.router.navigate(['/login']);
    }
    this.validateForm = this.fb.group({
      task: [null, [Validators.required]]
    });
    var userDetails = localStorage.getItem('user');
    if (userDetails) {
      var user = JSON.parse(userDetails);
      var userId = user.user.uid;
      this.uuid = userId;
      var body = {
        'uuid': userId
      };
      this.apiService.getPlanner(body).subscribe({
        next: data =>{
          this.Events = data;
          this.calendarOptions.events = this.Events;
        }
      }); 
    }

  }

}
