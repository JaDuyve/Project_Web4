import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Message } from '../../models/Message.model';
import { ChatService } from '../chat.service';
import { Chatroom } from '../../models/chatroom.model';
import { FormGroup, Validators, FormBuilder, AbstractControl, ValidatorFn, FormControl } from '@angular/forms';
import { AuthenticationService } from '../../user/authentication.service';

@Component({
  selector: 'message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.css']
})
export class MessageFormComponent implements OnInit {

  @Input('message')
  private message: Message;

  @Input('messages')
  private chatroom: Chatroom;

  public newMessage: FormGroup;
  @Output() public newMessageEmit = new EventEmitter<Message>();

  constructor(private chatService: ChatService,
    private fb: FormBuilder,
    private _authService: AuthenticationService

  ) { }

  ngOnInit() {
    this.resetForm();

  }

  public sendMessage(): void {

    if (this.newMessage.value.message !== "") {
      let message = new Message(this.newMessage.value.message, this._authService.user.username);
      this.newMessageEmit.emit(message);
      console.log("qsmdljf");
      this.resetForm();
    }

  }

  private resetForm() {
    this.newMessage = this.fb.group({
      message: ['', [Validators.required]]
    })
  }

}
