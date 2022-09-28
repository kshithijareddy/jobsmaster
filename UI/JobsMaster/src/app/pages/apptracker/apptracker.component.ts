import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface ItemData {
  id: string;
  company: string;
  title: string;
  status: string;
  location: string;
  link: string;
}

@Component({
  selector: 'app-apptracker',
  templateUrl: './apptracker.component.html',
  styleUrls: ['./apptracker.component.css'],
  providers: [NzNotificationService]
})
export class ApptrackerComponent implements OnInit {

  validateForm!: FormGroup;
  uuid: string = "";
  constructor(private router: Router, 
              private apiService: ApiService,
              private notification: NzNotificationService,
              private fb: FormBuilder
  ) { }

  isVisible = false;
  listOfData: ItemData[] = [];
  editCache: { [key: string]: { edit: boolean; data: ItemData } } = {};

  saveChanges(): void {
    this.notification.create(
      'success',
      'Success',
      'Your changes have been saved successfully!'
    );
    var body = {
      'uuid': this.uuid,
      'companies': this.listOfData
    };
    this.apiService.postApplications(body).subscribe({
      next: data =>{
        console.log(data);
      }
    });
    this.validateForm.reset();
  }

  addRow(): void {
    this.isVisible = true;
  }

  startEdit(id: string): void {
    this.editCache[id].edit = true;
  }

  goTo(url: string): void {
    window.open(url, '_blank');
  }

  saveEdit(id: string): void {
    const index = this.listOfData.findIndex(item => item.id === id);
    Object.assign(this.listOfData[index], this.editCache[id].data);
    this.editCache[id].edit = false;
    this.saveChanges();
  }

  updateEditCache(): void {
    this.listOfData.forEach(item => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item }
      };
    });
  }

  handleOk(): void {
    // this.isVisible = false;
    if (this.validateForm.valid) {
      console.log(this.validateForm.value);
      // Create a new item from the form value and add it to the list
      const i = {
        id: (this.listOfData.length + 1).toString(),
        company: this.validateForm.value.company,
        title: this.validateForm.value.title,
        status: this.validateForm.value.status,
        location: this.validateForm.value.location,
        link: this.validateForm.value.link
      };
      this.listOfData = [...this.listOfData, i];
      this.updateEditCache();
      this.isVisible = false;
      this.saveChanges();
    } else { 
      this.notification.create(
        'error',
        'Company Name is required',
        'Please enter a company name!'
      );
    }
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  submitForm(): void {
    console.log('submitForm');
    
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
      this.apiService.getApplications(body).subscribe({
        next: data =>{
          this.listOfData = data;
          console.log(this.listOfData);
          this.updateEditCache();
        }
      }); 
    }
    this.validateForm = this.fb.group({
      company: [null, [Validators.required]],
      title: [null],
      status: [null],
      location: [null],
      link: [null]
    });
  }
} 