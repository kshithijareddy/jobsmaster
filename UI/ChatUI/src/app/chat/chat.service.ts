import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/internal/operators/tap';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) { }
  base_url: string = "https://jobsmaster.uc.r.appspot.com/chat/";

  getChats(): Observable<any> {
    let url = this.base_url +'getchats';
    const headers = { 
      'Content-Type': 'application/json',
      'X-API-Key': 'abcdef123456'
    };
    return this.http.get<any[]>(url,{ headers }).pipe(
      tap(response => {}));
  }
}
