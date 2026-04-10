import { Phone } from 'src/phone/entities/phone.entity';
import { Address } from 'src/address/entities/address.entity';
export declare class User {
    id: string;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    phones: Phone[];
    addresses: Address[];
}
