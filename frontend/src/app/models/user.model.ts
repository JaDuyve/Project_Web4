export class User {
    private _username: string;
    private _id: string;

    constructor(username: string) {
        this._username = username;
    }

    get username(): string {
        return this._username;
    }

    static fromJSON(json: any): User {
        const pq = new User(
            json.username
        );

        pq._id = json._id;

        return pq;
    }

    toJSON() {
        return {
            _id: this._id,
            username: this.username,

        };
    }
}