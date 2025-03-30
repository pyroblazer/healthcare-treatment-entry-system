import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const treatmentOptions = [
    'Consultation',
    'Physical Examination',
    'Blood Test',
    'X-Ray',
    'Vaccination',
  ];

  const medicationOptions = [
    'Antibiotics',
    'Pain Relievers',
    'Antidepressants',
    'Blood Pressure Medication',
    'Diabetes Medication',
  ];

  for (const name of treatmentOptions) {
    await prisma.treatmentOption.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  for (const name of medicationOptions) {
    await prisma.medicationOption.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
