import { User } from '../../user/entities/user.entity';
export declare class Address {
    id: string;
    zipCode: string;
    street: string;
    number: string;
    complement: string;
    neighborhood: string;
    city: string;
    state: string;
    country: string;
    user: User;
}
