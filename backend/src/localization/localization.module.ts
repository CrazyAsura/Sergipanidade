import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocalizationService } from './localization.service';
import { LocalizationController } from './localization.controller';
import { Localization } from './entities/localization.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Localization])],
  controllers: [LocalizationController],
  providers: [LocalizationService],
  exports: [LocalizationService],
})
export class LocalizationModule {}
