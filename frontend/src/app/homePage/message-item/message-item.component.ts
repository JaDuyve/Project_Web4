import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../../models/Message.model';
import { Chatroom } from '../../models/chatroom.model';
import { AuthenticationService } from '../../user/authentication.service';

@Component({
  selector: 'message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit {

  @Input('message')
  public message: Message;


  @Input('chatroom')
  public chatroom: Chatroom;

  constructor(private _authService: AuthenticationService) { }

  getUser() {
    if (this.chatroom.user1.username === this.message.author){
      return this.chatroom.user1;
    }else {
      return this.chatroom.user2;
    }
  }

  ngOnInit() {
  }

}
