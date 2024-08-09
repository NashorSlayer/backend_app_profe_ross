import { IAnswer } from "./answer.interface";
import { IArea } from "./area.interface";
import { IForm } from "./form.interface";

export interface ITimes_areas {
    id?: string;
    time_start: number;
    time_end: number;
    area: IArea;
    answer: IAnswer;
}

export interface IGetTimesAreas {
    time_start: Date;
    time_end: Date;
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
