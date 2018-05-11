import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chatroom } from '../models/chatroom.model';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';


@Injectable()
export class ChatService {

  constructor(private http: HttpClient) { }

  addChatroom(chatroom: Chatroom): Observable<Chatroom> {
      
    return this.http
      .post(`/API/chats/chatroom/`, chatroom) 
      .pipe(map(Chatroom.fromJSON));
    
  }
}
