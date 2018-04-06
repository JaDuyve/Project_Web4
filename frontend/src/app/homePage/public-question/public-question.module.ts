import {Comment} from "../../comment/comment.module";

export class PublicQuestion {
    private _id: string;
    private _title: string;
    private _description: string;
    private _created: Date;
    private _author: string;
    private _likes: number;
    private _dislikes: number;
    private _comments: Comment[];

    constructor(
        title: string,
        description: string,
        created: Date = new Date,
        author: string,
        likes: number = 0,
        dislikes: number = 0,
        comments: Comment[] = new Array()) {
        
        this._title = title;
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

    get title(): string{
        return this._title;
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

    static fromJSON(json: any): PublicQuestion {
        const pq = new PublicQuestion(
            json.title,
            json.description,
            json.created,
            json.author,
            json.likes,
            json.dislikes,
            json.comments
        );

        pq._id = json._id;

        return pq;
    }
}