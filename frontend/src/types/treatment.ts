export interface Treatment {
  id: string;
  patientName: string;
  patientId: string;
  dateOfTreatment: string | Date;
  treatmentDescriptions: string[];
  medicationsPrescribed?: string[];
  treatmentCost: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export type TreatmentFormData = Omit<Treatment, 'id' | 'createdAt' | 'updatedAt'>;
