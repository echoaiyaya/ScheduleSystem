import {Customers} from './customers';
import {Workers} from './workers';
import {Timetables} from './timetables';

export class Appointment {
    _id: string;
    customerId: Customers;
    workerId: Workers;
    timeId: string;
    timetableId: Timetables;
    sequenceId: number;
}

export class inputAppointment {
    _id: string;
    customerId: string;
    workerId: string;
    timeId: string;
    timetableId: string;
    sequenceId: number;
}
