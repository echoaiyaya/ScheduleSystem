export class Comments {
    _id: string;
    customerId: string;
    content: string;
    rating: number;
    date: Date;
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
    category: string;
    avaliable: boolean;
    comments: [Comments];
}
