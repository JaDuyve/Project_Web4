import { Question } from "./question.model";

export class Group {
    private _id: string;
    private _users: Array<string>;
    private _questions: Question[];
    private _groupName: string;
    private _groupCategory: string;
    private _closedGroup: boolean;

    constructor(
        groupName: string,
        groupCategory: string,
        closedGroup: boolean,
        users: Array<string> = new Array(),
        questions: Question[] = new Array()
    ){
        this._groupName = groupName,
        this._users = users,
        this._groupCategory = groupCategory,
        this._closedGroup = closedGroup,
        this._questions = questions
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

    get users(): Array<string>{
        return this._users;
    }

    get questions(): Question[] {
        return this._questions;
    }

    static fromJSON(json: any): Group {
        const pq = new Group(
            json.groupName,
            json.groupCategory,
            json.closedGroup,
            json.users,
            json.questions,
        );

        pq._id = json._id;

        return pq;
    }

    toJSON() {
        return {
            _id: this._id,
            groupName: this._groupName,
            users: this._users,
            questions: this._questions,
            groupCategory: this._groupCategory,
            closedGroup: this.closedGroup,
        };
    }
}