import { Message } from "./Message.model";
import { User } from "./user.model";

export class Chatroom {
    lastMessage: Date;
    user1: User;
    user2: User; 
    _id: string; 
    private _messages: Message[];
    lastMess: string;
    user1Id: string;
    user2Id: string;

    constructor(user1: User = null, user2: User = null,  messages: Message[] = new Array, lastMessage: Date = new Date(), lastMess: string = ""){
        this.lastMessage = lastMessage;
        this.user1 = user1;
        this.user2 = user2;
        this.lastMess = lastMess;
        this._messages = messages;
    }

    get messages(): Message[] {
        if (!this._messages){
            this._messages = new Array();
        }

        return this._messages;
    }

    static fromJSON(json: any): Chatroom {
        const pq = new Chatroom(
            User.fromJSON(json.user1),
            User.fromJSON(json.user2),
            json.Messages.map(Message.fromJSON),
            json.lastMessage,
            json.lastMess
        );

        pq._id = json._id;

        return pq;
    }

    toJSON() {
        return {
            _id: this._id,
            Messages: this.messages,
            user1Id: this.user1Id,
            user2Id: this.user2Id,
            lastMessage: this.lastMessage,
            lastMess: this.lastMess
        };
    }
}
  