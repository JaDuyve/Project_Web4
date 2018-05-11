export class Message {
    message: string;
    created: Date;
    author: string;
    receiver: string; 
    _id: string; 

    constructor(message: string, author: string, receiver: string,  created: Date = new Date()){
        this.message = message;
        this.created = created;
        this.author = author;
        this.receiver = receiver;
    }

    static fromJSON(json: any): Message {
        const pq = new Message(
            json.message,
            json.author,
            json.receiver,
            json.created
        );

        pq._id = json._id;

        return pq;
    }

    toJSON() {
        return {
            _id: this._id,
            message: this.message,
            author: this.author,
            receiver: this.receiver,
            created: this.created
        };
    }
}
  
