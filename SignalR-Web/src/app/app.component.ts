import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { EnvService } from './services/env.service';
import { MessageObject } from './model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SignalR-Web';

  status = 'disconnected.';
  userName: string;
  toUser: string;
  message: string;

  messages = new Array<MessageObject>();

  constructor(private envService: EnvService, private http: HttpClient) {}

  startChat() {
    const connection = new HubConnectionBuilder()
      .withUrl(`${this.envService.signalrUrl}?oid=${this.userName}`)
      .configureLogging(LogLevel.Information)
      .build();

    connection.start().then(() => (this.status = 'connected.'));

    connection.on('ReceiveMessage', (data: MessageObject) => {
      this.messages.push(data);
    });
  }

  sendMessage() {
    this.http
      .post(`${this.envService.signalrUrl}/SendMessage`, {
        text: this.message,
        userId: this.toUser
      })
      .subscribe();
  }
}
