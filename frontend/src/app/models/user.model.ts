export class User {
    private _username: string;
    private _id: string;
    private _prof: boolean;
    private _dataPF: string;
    private _contentTypePF: string;
    private _password: string;
    private _joinedGroups: string[];

    constructor(username: string, 
        prof: boolean, 
        joinedGroups: string[],
        dataPF: string = "", 
        contentTypePF: string = "", 
        password: string = "") {
        this._username = username;
        this._dataPF = dataPF;
        this._contentTypePF = contentTypePF;
        this._password = password;
        this._joinedGroups = joinedGroups;
        this._id = "";
    }


    get username(): string {
        return this._username;
    }

    get prof(): boolean {
        return this._prof;
    }

    get dataPF(): string {
        return this._dataPF;
    }

    get contentTypePF(): string {
        return this._contentTypePF;
    }

    get password(): string {
        return this._password;
    }

    get id(): string {
        return this._id;
    }

    get joinedGroups(): string[] {
        return this._joinedGroups;
    }

    getProfilePicture(): string {
        if (this.dataPF !== ""){
            return `data:${this._contentTypePF};base64,${this._dataPF}`;
        }else {
            return "assets/images/elliot.jpg";
        }
    }

    

    static fromJSON(json: any): User {
        const pq = new User(
            json.username,
            json.prof,
            json.joinedGroup,
            json.dataPF,
            json.contentTypePF,
            
        );

        pq._id = json._id;

        return pq;
    }

    toJSON() {
        return {
            username: this.username,
            prof: this._prof,
            dataPF: this._dataPF, 
            contentTypePF: this._contentTypePF,
            password: this._password,
            joinedGroups: this._joinedGroups,
            _id: this._id
        };
    }
}