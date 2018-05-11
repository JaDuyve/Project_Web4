import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chatroom } from '../models/chatroom.model';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Message } from '../models/Message.model';
import { User } from '../models/user.model';


@Injectable()
export class ChatService {

  constructor(private http: HttpClient) { }

  addChatroom(chatroom: Chatroom): Observable<Chatroom> {

    return this.http
      .post(`/API/chats/chatroom`, chatroom)
      .pipe(map(Chatroom.fromJSON));

  }

  getChatrooms(userId: string): Observable<Chatroom[]> {
    return this.http
      .get(`/API/chats/chatrooms/${userId}`)
      .pipe(map((list: any[]): Chatroom[] => list.map(Chatroom.fromJSON)));

  }

  Messag(chatroom: Chatroom, message: Message): Observable<Message> {
    return this.http
      .post(`/API/chats/chatroom/${chatroom._id}/message`, message)
      .pipe(map(Message.fromJSON));
  }
}
