export class Customers {
    _id: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    password: string;
}

export class CustomerLogin {
    phone: string;
    password: string;
}

export class checkLogin {
    message: string;
    code: string;
}
