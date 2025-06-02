import React, { useEffect, useState } from 'react';
import { treatmentService } from '../services/treatmentService';
import { Treatment } from '../types/treatment';
import { Box, Heading, Text, Spinner, VStack, Alert, Input, Button } from '@chakra-ui/react';
import { toast } from 'react-toastify';

const TreatmentList: React.FC = () => {
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('');

  const fetchTreatments = async (searchTerm: string = '') => {
    try {
      const params = searchTerm ? { filter: searchTerm } : {};
      const data = await treatmentService.listTreatments(params);
      console.log("data", data);
      setTreatments(data.treatments);
    } catch (err) {
      setError('Failed to fetch treatments');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (e: { preventDefault: () => void; target: { value: React.SetStateAction<string>; }; }) => {
    e.preventDefault();

    setFilter(e.target.value)
  }

  const handleSearch = () => {
    fetchTreatments(filter);
  }

  useEffect(() => {
    fetchTreatments();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <Alert.Root status="error">
        <Alert.Indicator/>
        <Alert.Content>
            <Alert.Title>Error</Alert.Title>
            <Alert.Description>
                {error}
            </Alert.Description>
        </Alert.Content>
      </Alert.Root>
    );
  }

  return (
    <Box p={4}>
      <Heading as="h2" mb={4}>
        Treatment List
      </Heading>
      <Input 
        name="filter"
        value={filter}
        onChange={handleFilter}
      />
      <Button onClick={handleSearch}>
        Search
      </Button>
      <VStack align="stretch">
        {treatments.map((treatment) => (
          <Box key={treatment.id} p={4} borderWidth="1px" borderRadius="md">
            <Text><strong>Patient Name:</strong> {treatment.patientName}</Text>
            <Text><strong>Patient ID:</strong> {treatment.patientId}</Text>
            <Text>
              <strong>Date of Treatment:</strong>{' '}
              {new Date(treatment.dateOfTreatment).toLocaleDateString()}
            </Text>
            <Text>
              <strong>Descriptions:</strong> {treatment.treatmentDescriptions.join(', ')}
            </Text>
            <Text>
              <strong>Medications:</strong>{' '}
              {treatment.medicationsPrescribed ? treatment.medicationsPrescribed.join(', ') : 'N/A'}
            </Text>
            <Text>
              <strong>Cost:</strong> ${treatment.treatmentCost}
            </Text>
            {treatment.notes && (
              <Text>
                <strong>Notes:</strong> {treatment.notes}
              </Text>
            )}
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default TreatmentList;
