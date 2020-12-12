export class Times {
    _id: string;
    startHour: number;
    endHour: number;
    startMin: number;
    endMin: number;
    reservationLimit: number;
}

export class Timetables {
    _id: string;
    workId: string;
    year: number;
    month: number;
    date: number;
    times: Times[];
}
