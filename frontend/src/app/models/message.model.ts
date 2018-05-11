import * as moment from 'moment';


export class Message {
    message: string;
    created: Date;
    author: string;
    receiver: string; 
    _id: string; 

    constructor(message: string, author: string,  created: Date = new Date()){
        this.message = message;
        this.created = created;
        this.author = author;
    }

    static fromJSON(json: any): Message {
        const pq = new Message(
            json.message,
            json.author,
            json.created
        );

        pq._id = json._id;

        return pq;
    }

    formatDate(): string {
        return moment(this.created).fromNow();
    }

    toJSON() {
        return {
            _id: this._id,
            message: this.message,
            author: this.author,
            created: this.created
        };
    }
}
  
