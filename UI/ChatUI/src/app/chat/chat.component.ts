import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Message, WebsocketService } from '../websocket.service';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  user: any = {
    name: 'Anonymous', 
    avatar: 'https://images.squarespace-cdn.com/content/v1/53959f2ce4b0d0ce55449ea5/1455289999763-Z7093J1GTNACFP7L18NO/GUY+FAWKES+MASK.jpg?format=1500w',
  };
  messages: any[] = [];
  sendMessage(event: any) {
    var body: Message = {
      'text': event.message,
      'date': new Date().toISOString(),
    }
    this.websocketService.messages.next(body);
  }

  constructor(private router: Router, 
              private chatService: ChatService,
              private websocketService: WebsocketService) {
    this.websocketService.messages.subscribe(msg => {
      if (msg.text) {
        this.messages.push({
          text: msg.text,
          date: msg.date,
          reply: false,
          user: this.user,
        });
      }
    });
  }

  ngOnInit(): void {
    this.chatService.getChats().subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        this.messages.push({
          text: data[i].text,
          date: data[i].date,
          reply: false,
          user: this.user,
        });
      }
    });
  }
}