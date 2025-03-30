import { Module } from '@nestjs/common';
import { TreatmentOptionService } from './treatment-option.service';
import { TreatmentOptionController } from './treatment-option.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [TreatmentOptionController],
  providers: [TreatmentOptionService, PrismaService],
})
export class TreatmentOptionModule {}
