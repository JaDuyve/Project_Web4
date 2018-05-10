import { Question } from "./question.model";
import { User } from "./user.model";

export class Group {
    private _id: string;
    private _users: User[];
    private _admin: User;
    private _questions: Question[];
    private _groupName: string;
    private _groupCategory: string;
    private _closedGroup: boolean;

    constructor(
        groupName: string,
        // groupCategory: string,
        closedGroup: boolean,
        admin: User,
        users: User[] = new Array(),
        questions: Question[] = new Array()
    ){
        this._groupName = groupName;
        this._users = users;
        this._admin = admin;
        // this._groupCategory = groupCategory,
        this._closedGroup = closedGroup;
        this._questions = questions;
    }

    get id(): string {
        return this._id;
    }

    get groupName(): string {
        return this._groupName;
    }

    get closedGroup(): boolean {
        return this._closedGroup;
    }

    get users(): User[]{
        return this._users;
    }

    get questions(): Question[] {
        return this._questions;
    }

    get admin(): User {
        return this._admin;
    }

    static fromJSON(json: any): Group {
        const pq = new Group(
            json.groupName,
            // json.groupCategory,
            json.closedGroup,
            User.fromJSON(json.admin),
            json.users.map(User.fromJSON)
            
        );

        pq._id = json._id;

        return pq;
    }

    toJSON() {
        return {
            _id: this._id,
            groupName: this._groupName,
            adminId: this._admin.id,
            users: this._users.map(i => i.toJSON()),

            // questions: this._questions,
            // groupCategory: this._groupCategory,
            closedGroup: this.closedGroup,
        };
    }
}