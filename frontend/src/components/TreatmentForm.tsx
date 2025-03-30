import React, { useState } from 'react';
import {
  Box,
  Field,
  Input,
  Button,
  VStack,
  Text,
  Portal,
  createListCollection,
} from '@chakra-ui/react';
import { Select } from '@chakra-ui/react';
import { treatmentService } from '../services/treatmentService';
import { TreatmentFormData } from '../types/treatment';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

// Define the option item interface.
interface OptionItem {
  value: string;
  label: string;
}

// Define your options as arrays of OptionItem.
const TREATMENT_OPTIONS: OptionItem[] = [
  { value: 'Consultation', label: 'Consultation' },
  { value: 'Physical Examination', label: 'Physical Examination' },
  { value: 'Blood Test', label: 'Blood Test' },
  { value: 'X-Ray', label: 'X-Ray' },
  { value: 'Vaccination', label: 'Vaccination' },
];

const MEDICATION_OPTIONS: OptionItem[] = [
  { value: 'Antibiotics', label: 'Antibiotics' },
  { value: 'Pain Relievers', label: 'Pain Relievers' },
  { value: 'Antidepressants', label: 'Antidepressants' },
  { value: 'Blood Pressure Medication', label: 'Blood Pressure Medication' },
  { value: 'Diabetes Medication', label: 'Diabetes Medication' },
];

const TreatmentForm: React.FC = () => {
  const [formData, setFormData] = useState<TreatmentFormData>({
    patientName: '',
    patientId: '',
    dateOfTreatment: '',
    treatmentDescriptions: [],
    medicationsPrescribed: [],
    treatmentCost: '',
    notes: '',
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof TreatmentFormData, string>>
  >({});

  const treatmentOptionsCollection = createListCollection<OptionItem>({
    items: TREATMENT_OPTIONS,
  });
  const medicationOptionsCollection = createListCollection<OptionItem>({
    items: MEDICATION_OPTIONS,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof TreatmentFormData, string>> = {};

    if (!formData.patientName.trim()) {
      newErrors.patientName = 'Patient Name is required';
    }
    if (!formData.patientId.trim()) {
      newErrors.patientId = 'Patient ID is required';
    }
    if (!formData.dateOfTreatment) {
      newErrors.dateOfTreatment = 'Date of Treatment is required';
    }
    if (formData.treatmentDescriptions.length === 0) {
      newErrors.treatmentDescriptions = 'At least one treatment must be selected';
    }
    if (formData.treatmentCost === '' || Number(formData.treatmentCost) < 0) {
      newErrors.treatmentCost = 'Valid treatment cost is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrors({});

    if (validateForm()) {
      try {
        console.log("formData", formData);
        const treatment = await treatmentService.createTreatment(formData);
        toast.success(`Treatment for ${treatment.patientName} created successfully`, {
          autoClose: 3000,
        });

        setFormData({
          patientName: '',
          patientId: '',
          dateOfTreatment: '',
          treatmentDescriptions: [],
          medicationsPrescribed: [],
          treatmentCost: '',
          notes: '',
        });
      } catch (error: unknown) {
        if (error instanceof AxiosError && error.response) {
          const data = error.response.data;
          if (Array.isArray(data.message)) {
            toast.error(`Validation error: ${data.message.join(', ')}`, { autoClose: 3000 });
          } else if (typeof data.message === 'string') {
            toast.error(`Error: ${data.message}`, { autoClose: 3000 });
          }
        } else if (error instanceof Error) {
          toast.error(`An error occurred: ${error.message}`, { autoClose: 3000 });
        } else {
          toast.error('Failed to submit treatment', { autoClose: 3000 });
        }
        console.error('Error submitting treatment:', error);
      }
    }
  };

  return (
    <Box maxWidth="500px" margin="auto" padding={6}>
      <form onSubmit={handleSubmit}>
        <VStack>
          <Field.Root required>
            <Field.Label>Patient Name</Field.Label>
            <Input
              name="patientName"
              value={formData.patientName}
              onChange={handleChange}
              placeholder="Enter patient name"
            />
            {errors.patientName && <Text color="red.500">{errors.patientName}</Text>}
          </Field.Root>

          <Field.Root required>
            <Field.Label>Patient ID</Field.Label>
            <Input
              name="patientId"
              value={formData.patientId}
              onChange={handleChange}
              placeholder="Enter patient ID"
            />
            {errors.patientId && <Text color="red.500">{errors.patientId}</Text>}
          </Field.Root>

          <Field.Root required>
            <Field.Label>Date of Treatment</Field.Label>
            <Input
              type="date"
              name="dateOfTreatment"
              value={formData.dateOfTreatment.toString()}
              onChange={handleChange}
            />
            {errors.dateOfTreatment && (
              <Text color="red.500">{errors.dateOfTreatment}</Text>
            )}
          </Field.Root>

          <Field.Root required>
            <Select.Root
              multiple
              collection={treatmentOptionsCollection}
              value={formData.treatmentDescriptions}
              onValueChange={(details) => {
                // details is of type ValueChangeDetails<unknown>
                // Cast to the type that includes our OptionItem array:
                const selectedItems = (details as { items: OptionItem[] }).items;
                const values = selectedItems.map((item) => item.value);
                setFormData((prev) => ({
                  ...prev,
                  treatmentDescriptions: values,
                }));
              }}
            >
              <Select.Label>Treatment Descriptions</Select.Label>
              <Select.Control>
                <Select.Trigger>
                  <Select.ValueText placeholder="Select treatments" />
                </Select.Trigger>
                <Select.IndicatorGroup>
                  <Select.Indicator />
                  <Select.ClearTrigger />
                </Select.IndicatorGroup>
              </Select.Control>
              <Portal>
                <Select.Positioner>
                  <Select.Content>
                    {TREATMENT_OPTIONS.map((item) => (
                      <Select.Item key={item.value} item={item}>
                        <Select.ItemText>{item.label}</Select.ItemText>
                        <Select.ItemIndicator />
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Positioner>
              </Portal>
            </Select.Root>
            {errors.treatmentDescriptions && (
              <Text color="red.500">{errors.treatmentDescriptions}</Text>
            )}
          </Field.Root>

          <Field.Root>
            <Select.Root
              multiple
              collection={medicationOptionsCollection}
              value={formData.medicationsPrescribed}
              onValueChange={(details) => {
                const selectedItems = (details as { items: OptionItem[] }).items;
                const values = selectedItems.map((item) => item.value);
                setFormData((prev) => ({
                  ...prev,
                  medicationsPrescribed: values,
                }));
              }}
            >
              <Select.Label>Medications Prescribed</Select.Label>
              <Select.Control>
                <Select.Trigger>
                  <Select.ValueText placeholder="Select medications" />
                </Select.Trigger>
                <Select.IndicatorGroup>
                  <Select.Indicator />
                  <Select.ClearTrigger />
                </Select.IndicatorGroup>
              </Select.Control>
              <Portal>
                <Select.Positioner>
                  <Select.Content>
                    {MEDICATION_OPTIONS.map((item) => (
                      <Select.Item key={item.value} item={item}>
                        <Select.ItemText>{item.label}</Select.ItemText>
                        <Select.ItemIndicator />
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Positioner>
              </Portal>
            </Select.Root>
          </Field.Root>

          <Field.Root required>
            <Field.Label>Cost of Treatment</Field.Label>
            <Input
              type="number"
              name="treatmentCost"
              value={formData.treatmentCost}
              onChange={handleChange}
              step="0.01"
              min="0"
              placeholder="Enter treatment cost"
            />
            {errors.treatmentCost && <Text color="red.500">{errors.treatmentCost}</Text>}
          </Field.Root>

          <Field.Root>
            <Field.Label>Additional Notes</Field.Label>
            <Input
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Optional notes"
            />
          </Field.Root>

          <Button colorScheme="blue" type="submit" width="full">
            Submit Treatment
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default TreatmentForm;
