declare class CreatePhoneDto {
    ddi?: string;
    ddd: string;
    number: string;
}
declare class CreateAddressDto {
    zipCode: string;
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    country?: string;
}
export declare class CreateUserDto {
    name: string;
    cpf?: string;
    email: string;
    password: string;
    phones?: CreatePhoneDto[];
    addresses?: CreateAddressDto[];
}
export {};
