"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const cache_manager_1 = require("@nestjs/cache-manager");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const log_activity_module_1 = require("./log-activity/log-activity.module");
const business_module_1 = require("./business/business.module");
const localization_module_1 = require("./localization/localization.module");
const menu_module_1 = require("./menu/menu.module");
const auth_module_1 = require("./auth/auth.module");
const user_module_1 = require("./user/user.module");
const phone_module_1 = require("./phone/phone.module");
const address_module_1 = require("./address/address.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'sqlite',
                database: 'database.sqlite',
                entities: [__dirname + '/**/*.entity{.ts,.js}'],
                synchronize: true,
            }),
            cache_manager_1.CacheModule.register({
                isGlobal: true,
                ttl: 600,
            }),
            log_activity_module_1.LogActivityModule,
            business_module_1.BusinessModule,
            localization_module_1.LocalizationModule,
            menu_module_1.MenuModule,
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            phone_module_1.PhoneModule,
            address_module_1.AddressModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map