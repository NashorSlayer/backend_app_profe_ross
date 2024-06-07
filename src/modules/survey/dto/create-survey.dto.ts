
import { User } from "../../../entities/user.entity";


export class CreateSurveyDto {
    title: string;
    description: string;
    time_range_start: Date;
    time_range_end: Date;
    answer_time_start: Date;
    answer_time_end: Date;
    disabled: boolean;
    user: User;
}
