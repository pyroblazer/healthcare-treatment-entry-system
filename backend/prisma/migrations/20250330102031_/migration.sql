-- CreateTable
CREATE TABLE "Treatment" (
    "id" TEXT NOT NULL,
    "patientName" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "dateOfTreatment" TIMESTAMP(3) NOT NULL,
    "treatmentDescriptions" TEXT[],
    "medicationsPrescribed" TEXT[],
    "treatmentCost" DECIMAL(65,30) NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Treatment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TreatmentOption" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TreatmentOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MedicationOption" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MedicationOption_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "TreatmentOption_name_key" ON "TreatmentOption"("name");

-- CreateIndex
CREATE UNIQUE INDEX "MedicationOption_name_key" ON "MedicationOption"("name");
