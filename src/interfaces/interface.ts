export interface IUser {
    id?: string;
    email: string;
    username: string;
    password?: string;
}

export interface IForm {
    id?: string;
    title: string;
    description: string;
    date_start: Date;
    date_end: Date;
    user: IUser;
}

export interface IArea {
    id?: string;
    name: string;
    form: IForm;
}

export interface IAnswer {
    id?: string;
    mail: string;
    form: IForm;
}

export interface ITimes_areas {
    id?: string;
    time_start: number;
    time_end: number;
    area: IArea;
    answer: IAnswer;
}

//-------------------------------------------------

export interface IGetTimesAreas {
    time_start: number;
    time_end: number;
    area: {
        name: IArea["name"];
    }
    answer: {
        mail: IAnswer["mail"];
        form: {
            title: IForm["title"];
        }
    }
}

export interface IGetAreas {
    name: IArea["name"];
    form: {
        title: IForm["title"];
        description: IForm["description"];
        date_start: IForm["date_start"];
        date_end: IForm["date_end"];
        user: {
            email: IUser["email"];
            username: IUser["username"];
        }
    }
}