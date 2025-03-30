import React from 'react';
import { Box, Heading, Button, Flex } from '@chakra-ui/react';
import TreatmentForm from '../components/TreatmentForm';
import { useNavigate } from 'react-router';
import { useRequireAuth } from '../hooks/useRequireAuth';

const CreateTreatment: React.FC = () => {
  useRequireAuth(); // redirect if not signed in

  const navigate = useNavigate();

  return (
    <Box p={4}>
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Heading>Create Treatment</Heading>
        <Button colorScheme="gray" onClick={() => navigate('/')}>
          Back to Dashboard
        </Button>
      </Flex>
      <TreatmentForm />
    </Box>
  );
};

export default CreateTreatment;
