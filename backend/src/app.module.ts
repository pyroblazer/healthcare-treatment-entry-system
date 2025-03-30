import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TreatmentModule } from './treatment/treatment.module';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { TreatmentOptionModule } from './treatment-option/treatment-option.module';
import { MedicationOptionModule } from './medication-option/medication-option.module';

@Module({
  imports: [
    TreatmentModule,
    AuthModule,
    TreatmentOptionModule,
    MedicationOptionModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
