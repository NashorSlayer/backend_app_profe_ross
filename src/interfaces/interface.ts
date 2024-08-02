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

export interface Itimes_areas {
    id?: string;
    time_start: number;
    time_end: number;
    area: IArea;
    answer: IAnswer;
}