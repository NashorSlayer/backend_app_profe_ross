import { BadRequestException, NotFoundException } from "@nestjs/common";

export const AreasExceptions = {
    NOT_FOUND: new NotFoundException('Area not found'),
    ALREADY_EXISTS: new BadRequestException('Area already exists'),
}

export const AnswersExceptions = {
    NOT_FOUND: new NotFoundException('Answer not found'),
    ALREADY_EXISTS: new BadRequestException('Answer already exists'),
}

export const TimesAreasExceptions = {
    NOT_FOUND: new NotFoundException('TimesArea not found'),
    NOT_UPDATED: new BadRequestException('TimesArea not updated'),
    NOT_DELETED: new BadRequestException('TimesArea not deleted'),
    NOT_CREATED: new BadRequestException('TimesArea not created'),
}

export const FormsExceptions = {
    NOT_FOUND: new NotFoundException('Form not found'),
    ALREADY_EXISTS: new BadRequestException('Form already exists'),
    DATE_START_MUST_BE_GREATER: new BadRequestException('Date must be greater than current date'),
    DATE_END_MUST_BE_GREATER: new BadRequestException('Date end must be greater than date start'),
    DATE_END_MUST_BE_GREATER_THAN_DATE_START: new BadRequestException('Date start must be greater than current date'),
}

export const UserExceptions = {
    NOT_FOUND: new NotFoundException('User not found'),
    ALREADY_EXISTS: new BadRequestException('User already exists'),
}