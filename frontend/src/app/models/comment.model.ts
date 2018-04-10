export class Comment {
    private _id: string;
    private _message: string;
    private _created: Date;
    private _author: string;
    private _likes: number;
    private _dislikes: number;
    private _comments: Comment[];
    private _questionId: string;

    constructor(
        message: string,
        author: string,
        questionId?: string,
        created: Date = new Date,
        likes: number = 0,
        dislikes: number = 0,
        comments: Comment[] = new Array(),
    ) {

        this._message = message;
        this._author = author;
        this._questionId = questionId;
        this._created = created;
        this._likes = likes;
        this._dislikes = dislikes;
        this._comments = comments;
    }



    get message(): string {
        return this._message;
    }


    get created(): Date {
        return this._created;
    }

    get author(): string {
        return this._author;
    }

    get likes(): number {
        return this._likes;
    }

    get dislikes(): number {
        return this._dislikes;
    }

    get comments(): Comment[] {
        return this._comments;
    }

    get questionId(): string {
        return this._questionId;
    }

    get id(): string {
        return this._id;
    }

    addLike() {
        this._likes++;
    }

    addDislike() {
        this._dislikes++;
    }

    addComment(comment: Comment) {
        this._comments.push(comment);
    }

    static fromJSON(json: any): Comment {
        const comment = new Comment(
            json.message,
            json.author,
            json.questionId,
            json.created,
            json.likes,
            json.dislikes,
            json.comments,
        );

        comment._id = json._id;
        return comment;
    }

    toJSON() {
        return {
            _id: this._id,
            message: this._message,
            created: this._created,
            author: this._author,
            likes: this._likes,
            dislikes: this._dislikes,
            comments: this._comments.map(i => i.toJSON()),
            questionId: this._questionId
        }
    }
}