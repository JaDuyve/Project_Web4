export class User {
    private _username: string;
    private _id: string;
    private prof: boolean;

    constructor(username: string, prof: boolean) {
        this._username = username;
    }

    get username(): string {
        return this._username;
    }

    static fromJSON(json: any): User {
        const pq = new User(
            json.username,
            json.prof
        );

        pq._id = json._id;

        return pq;
    }

    toJSON() {
        return {
            _id: this._id,
            username: this.username,
            prof: this.prof
        };
    }
}