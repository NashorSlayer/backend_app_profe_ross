
import { User } from "./user.entity";

export class Survey {
    id: number;
    title: string;
    description: string;
    time_range_start: Date;
    time_range_end: Date;
    answer_time_start: Date;
    answer_time_end: Date;
    user: User;
}