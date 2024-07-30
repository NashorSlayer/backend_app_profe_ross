export interface IUser {
    id?: string;
    email: string;
    username: string;
    password?: string;
}

export interface IArea {
    id?: string;
    name: string;
}

export interface IForm {
    id?: string;
    title: string;
    description: string;
    date_start: Date;
    date_end: Date;
    user: IUser;
    disabled: boolean;
}

export interface IAnswer {
    id?: string;
    User: IUser;
    area: IArea;
    time: number;
}

export interface IAreasForm {
    id?: string;
    form: IForm;
    area: IArea;
}