import { IForm } from "./form.interface";

export interface IAnswer {
    id?: string;
    mail: string;
    form: IForm;
}