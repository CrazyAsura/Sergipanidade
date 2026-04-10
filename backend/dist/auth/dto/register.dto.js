"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class CreatePhoneDto {
    ddi;
    ddd;
    number;
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: '+55' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreatePhoneDto.prototype, "ddi", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '79' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePhoneDto.prototype, "ddd", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '999999999' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePhoneDto.prototype, "number", void 0);
class CreateAddressDto {
    zipCode;
    street;
    number;
    complement;
    neighborhood;
    city;
    state;
    country;
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: '49000-000' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateAddressDto.prototype, "zipCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Rua Exemplo' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateAddressDto.prototype, "street", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '123' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateAddressDto.prototype, "number", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Apto 101', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateAddressDto.prototype, "complement", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Centro' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateAddressDto.prototype, "neighborhood", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Aracaju' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateAddressDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'SE' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateAddressDto.prototype, "state", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Brasil' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateAddressDto.prototype, "country", void 0);
class RegisterDto {
    name;
    cpf;
    email;
    password;
    phones;
    addresses;
}
exports.RegisterDto = RegisterDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'João Silva' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RegisterDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '000.000.000-00', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], RegisterDto.prototype, "cpf", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'joao@example.com' }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], RegisterDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'password123' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(6),
    __metadata("design:type", String)
], RegisterDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [CreatePhoneDto], required: false }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CreatePhoneDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], RegisterDto.prototype, "phones", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [CreateAddressDto], required: false }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CreateAddressDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], RegisterDto.prototype, "addresses", void 0);
//# sourceMappingURL=register.dto.js.map