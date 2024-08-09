import { IForm } from "./form.interface";
import { IUser } from "./user.interface";

export interface IArea {
    id?: string;
    name: string;
    form: IForm;
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