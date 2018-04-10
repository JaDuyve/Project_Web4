import {Comment} from './comment.model'

export class Question {
    private _id: string;
    private _description: string;
    private _created: Date;
    private _author: string;
    private _likes: number;
    private _dislikes: number;
    private _comments: Comment[];

    constructor(
        description: string,
        author: string,
        likes: number = 0,
        dislikes: number = 0,
        created: Date = new Date(),
        comments: Comment[] = new Array()) {
        
        this._description = description;
        this._created = created;
        this._author = author;
        this._likes = likes;
        this._dislikes = dislikes;
        this._comments = comments;

    }

    get id(): string {
        return this._id;
    }

    get description(): string {
        return this._description;
    }

    get created(): Date {
        return this._created;
    }

    get author() : string{
        return this._author;
    }

    get likes(): number {
        return this._likes;
    }

    get dislikes(): number {
        return this._dislikes;
    }

    get comments(): Comment[]{
        return this._comments;
    }

    addLike(){
        this._likes++;
    }

    addDislike(){
        this._dislikes++;
    }

    addComment(comment: Comment){
        this._comments.push(comment);
    }

    static fromJSON(json: any): Question {
        const pq = new Question(
            json.description,
            json.author,
            json.likes,
            json.dislikes,
            json.created,
            json.comments
        );

        pq._id = json._id;

        return pq;
    }

    toJSON() {
        return {
            _id: this._id,
            description: this._description,
            author: this._author,
            likes: this._likes,
            dislikes: this._dislikes,
            created: this._created,
            comments: this._comments.map(i => i.toJSON)
        };
    }
}