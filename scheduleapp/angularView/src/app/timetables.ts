import { Workers } from './workers';

export class Times {
    _id: string;
    startHour: number;
    endHour: number;
    startMin: number;
    endMin: number;
    reservationLimit: number;
}

export class inputTimetables {
    _id: string;
    workerId: string;
    year: number;
    month: number;
    date: number;
    times: Times[];
}

export class Timetables {
    _id: string;
    workerId: Workers;
    year: number;
    month: number;
    date: number;
    times: Times[];
}

export class Categories {
    _id: string;
    avaible: boolean;
    title: string;
}
