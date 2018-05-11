import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../user/authentication.service';
import { User } from '../../models/user.model';
import { Chatroom } from '../../models/chatroom.model';
import { ChatService } from '../chat.service';
declare var $: any;

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  private _users: User[];
  private _chatrooms: Chatroom[];

  constructor(private _authService: AuthenticationService, 
    private _chatService: ChatService) { }

  ngOnInit() {
    this._authService.users.subscribe(item =>
      this._users = item);

      this._chatrooms = this._authService.user.chatrooms;
  }

  get users() {
    return this._users;
  }

  showUsers(): boolean {

    $(`.small.modal`).modal('show');

    return false;
  }

  chooseUser(id :string): boolean {
    let chatroom = new Chatroom();
    chatroom.user1Id = this._authService.user.id;
    chatroom.user2Id = id;

    this._chatService.addChatroom(chatroom).subscribe(
      item => this._chatrooms.push(item)
    );

    return false;
  }
}
