import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LogActivityModule } from './log-activity/log-activity.module';
import { BusinessModule } from './business/business.module';
import { LocalizationModule } from './localization/localization.module';
import { MenuModule } from './menu/menu.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PhoneModule } from './phone/phone.module';
import { AddressModule } from './address/address.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Only for development!
    }),
    CacheModule.register({
      isGlobal: true,
      ttl: 600, // 10 minutes default
    }),
    LogActivityModule,
    BusinessModule,
    LocalizationModule,
    MenuModule,
    AuthModule,
    UserModule,
    PhoneModule,
    AddressModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
