import {Comment} from './comment.model'

export class Question {
    private _id: string;
    private _description: string;
    private _created: Date;
    private _author: string;
    private _likes: Set<string>;
    private _dislikes: Set<string>;
    private _comments: Comment[];

    constructor(
        description: string,
        author: string,
        likes: Set<string> = new Set(),
        dislikes: Set<string> = new Set(),
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

    get likes(): Set<string> {
        return this._likes;
    }

    get dislikes(): Set<string> {
        return this._dislikes;
    }

    get comments(): Comment[]{
        return this._comments;
    }

    addLike(username: string){
        this._likes.add(username);
    }

    addDislike(username: string){
        this._dislikes.add(username);
    }

    addComment(comment: Comment){
        this._comments.push(comment);
    }

    showAantalLikes(): number {
        return this._likes.size;
    }

    showAantalDislikes(): number {
        return this._dislikes.size;
    }

    static fromJSON(json: any): Question {
        const pq = new Question(
            json.description,
            json.author,
            new Set(json.likes),
            new Set(json.dislikes),
            json.created,
            json.comments.map(Comment.fromJSON)
        );

        pq._id = json._id;

        return pq;
    }

    toJSON() {
        return {
            _id: this._id,
            description: this._description,
            author: this._author,
            likes: Array.from(this._likes),
            dislikes: Array.from(this._dislikes),
            created: this._created,
            comments: this._comments.map(i => i.toJSON)
        };
    }
}