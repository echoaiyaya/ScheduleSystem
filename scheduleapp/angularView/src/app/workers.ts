import { Categories } from './timetables';
import { Customers } from './customers';

export class Comments {
    _id: string;
    targetType: number;
    customerId: Customers;
    content: string;
    rating: number;
    date: Date;
}

export class inputComments {
    _id: string;
    targetType: number;
    customerId: string;
    content: string;
    rating: number;
    date: Date;
}

export class inputWorkder {
    _id: string;
    firstName: string;
    lastName: string;
    password: string;
    description: string;
    phone: string;
    email: string;
    category: string;
}

export class Workers {
    _id: string;
    firstName: string;
    lastName: string;
    password: string;
    gourpId: string;
    description: string;
    phone: string;
    email: string;
    category: Categories;
    avaliable: boolean;
    comments: [Comments];
}
