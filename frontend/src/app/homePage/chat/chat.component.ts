import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../user/authentication.service';
import { User } from '../../models/user.model';
import { Chatroom } from '../../models/chatroom.model';
import { Message } from '../../models/message.model';
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
  private _currentChatroom: Chatroom;
  private _message: Message;

  constructor(private _authService: AuthenticationService,
    private _chatService: ChatService) { }

  ngOnInit() {
    this._authService.users.subscribe(item =>
      this._users = item.filter(val => val.username !== this._authService.user$.value));

    this._chatService.getChatrooms(this._authService.user$.value)
      .subscribe(item => {
        this._chatrooms = item.reverse();
        if (this._chatrooms.length > 0) {
          this._currentChatroom = this._chatrooms[1];
          // this._users = this._users.filter(val => {
          //   return this._chatrooms.filter(val2 => {
          //     if (val2.user1.username === val.username || val2.user2.username === val.username) {
          //       return false;
          //     } else {
          //       return true;
          //     }
          //   }).length === 0;
          // });
        }
      });

    this._currentChatroom = null;
  }

  get users() {

    if (!this._users || !this._chatrooms){
      return this._users;

    }else {
      return this._users
      .filter(val => {
        return this._chatrooms.filter(val2 => {
          if (val2.user1.username === val.username || val2.user2.username === val.username) {
            return true;
          } else {
            return false;
          }
        }).length === this._chatrooms.length;
      });
    }
  }

  get chatrooms() {
    return this._chatrooms;
  }

  get currentChatroom() {
    return this._currentChatroom;
  }

  get message() {
    return this._message;
  }

  getUser(chatroom: Chatroom) {
    if (chatroom.user1.username === this._authService.user.username) {
      return chatroom.user2;
    } else {
      return chatroom.user1;
    }
  }

  showUsers(): boolean {

    $(`.small.modal.chat`).modal('show');

    return false;
  }

  switchCurrentChatroom(chatroom: Chatroom) {
    this._currentChatroom = chatroom;
  }

  chooseUser(id: string): boolean {
    let chatroom = new Chatroom();
    chatroom.user1Id = this._authService.user.id;
    chatroom.user2Id = id;

    this._chatService.addChatroom(chatroom).subscribe(
      item => this._chatrooms.push(item)
    );

    $('.small.modal.chat').modal('hide');

    return false;

  
  }

  sendMessage(message: Message) {
    console.log(this._currentChatroom);

    // this._currentChatroom.messages.push(message);
    console.log(message);
    this._chatService.Messag(this._currentChatroom, message)
      .subscribe(res => {
        this._currentChatroom.messages.push(res)

      });
  }
}
