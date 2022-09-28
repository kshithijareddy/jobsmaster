import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/internal/operators/tap';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  base_url: string = "https://jobsmaster.uc.r.appspot.com/api/";

  getApplications(data: any): Observable<any> {
    let url = this.base_url +'getapplications';
    const headers = { 
      'Content-Type': 'application/json',
      'X-API-Key': 'abcdef123456'
    };
    return this.http.post<any[]>(url, data ,{ headers }).pipe(
      tap(response => {}));
  }
  postApplications(data: any): Observable<any> {
    let url = this.base_url +'postapplication';
    const headers = { 
      'Content-Type': 'application/json',
      'X-API-Key': 'abcdef123456'
    };
    return this.http.post<any[]>(url, data ,{ headers }).pipe(
      tap(response => {}));
  }
  getCourses(): Observable<any> {
    let url = this.base_url +'getcourses';
    const headers = { 
      'Content-Type': 'application/json',
      'X-API-Key': 'abcdef123456'
    };
    return this.http.get<any[]>(url,{ headers }).pipe(
      tap(response => {}));
  }
  getMyCourses(data: any): Observable<any> {
    let url = this.base_url +'getusercourses';
    const headers = { 
      'Content-Type': 'application/json',
      'X-API-Key': 'abcdef123456'
    };
    return this.http.post<any[]>(url, data ,{ headers }).pipe(
      tap(response => {}));
  }
  buyCourse(data: any): Observable<any> {
    let url = this.base_url +'buycourse';
    const headers = { 
      'Content-Type': 'application/json',
      'X-API-Key': 'abcdef123456'
    };
    return this.http.post<any[]>(url, data ,{ headers }).pipe(
      tap(response => {}));
  }
  deleteCourse(data: any): Observable<any> {
    let url = this.base_url +'deleteusercourse';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'X-API-Key': 'abcdef123456'
      }),
      body: data
    };
    return this.http.delete<any[]>(url, httpOptions).pipe(
      tap(response => {}));
  }

  getJobs(data: any): Observable<any> {
    let url = this.base_url +'getjobs';
    const headers = { 
      'Content-Type': 'application/json',
      'X-API-Key': 'abcdef123456'
    };
    return this.http.post<any[]>(url, data ,{ headers }).pipe(
      tap(response => {}));
  }
  getPlanner(data: any): Observable<any> {
    let url = this.base_url +'getplanner';
    const headers = { 
      'Content-Type': 'application/json',
      'X-API-Key': 'abcdef123456'
    };
    return this.http.post<any[]>(url, data ,{ headers }).pipe(
      tap(response => {}));
  }
  postPlanner(data: any): Observable<any> {
    let url = this.base_url +'postplanner';
    const headers = { 
      'Content-Type': 'application/json',
      'X-API-Key': 'abcdef123456'
    };
    return this.http.post<any[]>(url, data ,{ headers }).pipe(
      tap(response => {}));
  }
  getQuestions(): Observable<any> {
    let url = this.base_url +'getquestions';
    const headers = { 
      'Content-Type': 'application/json',
      'X-API-Key': 'abcdef123456'
    };
    return this.http.get<any[]>(url,{ headers }).pipe(
      tap(response => {}));
  }
  getMentors(): Observable<any> {
    let url = this.base_url +'getmentors';
    const headers = { 
      'Content-Type': 'application/json',
      'X-API-Key': 'abcdef123456'
    };
    return this.http.get<any[]>(url,{ headers }).pipe(
      tap(response => {}));
  }
}
