import { Component, OnInit, Input, ViewChild,AfterViewInit, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { Message } from '../../models/Message.model';
import { MessageItemComponent } from '../message-item/message-item.component';
import { Chatroom } from '../../models/chatroom.model';
import { AuthenticationService } from '../../user/authentication.service';

@Component({
  selector: 'messages-list',
  templateUrl: './messages-list.component.html',
  styleUrls: ['./messages-list.component.css']
})
export class MessagesListComponent implements OnInit {
  @Input('messages')
  private messages: Chatroom;

  @ViewChild('chatlist', { read: ElementRef }) chatList: ElementRef;
  @ViewChildren(MessageItemComponent, { read: ElementRef }) chatItems: QueryList<MessageItemComponent>;


  constructor(private _authService: AuthenticationService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.chatItems.changes.subscribe(elements => {
      // console.log('messsage list changed: ' + this.messages.length);
      this.scrollToBottom();
    });
  }

  private scrollToBottom(): void {
    try {
      this.chatList.nativeElement.scrollTop = this.chatList.nativeElement.scrollHeight;
    }
    catch (err) {
      console.log('Could not find the "chatList" element.');
    }
  }

  getUser(){
    if (this.messages.user1.username === this._authService.user.username) {
      return this.messages.user2;
    } else {
      return this.messages.user1;
    }
  }

 
}
