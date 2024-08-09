import { IUser } from "./user.interface";

export interface IForm {
    id?: string;
    title: string;
    description: string;
    date_start: Date;
    date_end: Date;
    type: string;
    range: number;
    user: IUser;
}

export interface IGetTitlesForm {
    id?: IForm["id"];
    title: IForm["title"];
}