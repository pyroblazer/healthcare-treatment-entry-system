import { Module } from '@nestjs/common';
import { MedicationOptionService } from './medication-option.service';
import { MedicationOptionController } from './medication-option.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [MedicationOptionController],
  providers: [MedicationOptionService, PrismaService],
})
export class MedicationOptionModule {}
