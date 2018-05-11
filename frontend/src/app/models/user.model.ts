
export class User {
    private _username: string;
    private _id: string;
    private _prof: boolean;
    private _dataPF: string;
    private _contentTypePF: string;
    private _password: string;
    private _joinedGroups: string[];
    private _chatrooms: string[];

    constructor(username: string, 
        prof: boolean, 
        dataPF: string = "", 
        contentTypePF: string = "", 
        password: string = "") {
        this._username = username;
        this._dataPF = dataPF;
        this._contentTypePF = contentTypePF;
        this._password = password;
        this._joinedGroups = new Array();
        this._chatrooms = new Array();
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
        if (this._joinedGroups === undefined)
        {
            this._joinedGroups  = new Array();
        }
        return this._joinedGroups;
    }

    set joinedGroups(groups: string[]) {
        this._joinedGroups = groups;
    }

    get chatrooms(): string[] {
        
        return this._chatrooms;
    }

    set chatrooms(groups: string[]) {
        this._chatrooms = groups;
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
            json.dataPF,
            json.contentTypePF,
            
        );

        pq._chatrooms = json.chatrooms;
        pq._joinedGroups = json.joinedGroups
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
            chatrooms: this._chatrooms,
            _id: this._id
        };
    }
}