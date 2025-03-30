import React from 'react';
import { Box, Heading, Button, Flex } from '@chakra-ui/react';
import TreatmentList from '../components/TreatmentList';
import { useNavigate } from 'react-router';
import { useRequireAuth } from '../hooks/useRequireAuth';

const Dashboard: React.FC = () => {
  useRequireAuth(); // redirect if not signed in

  const navigate = useNavigate();

  return (
    <Box p={4}>
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Heading>Dashboard</Heading>
        <Button colorScheme="blue" onClick={() => navigate('/create-treatment')}>
          Create Treatment
        </Button>
      </Flex>
      <TreatmentList />
    </Box>
  );
};

export default Dashboard;
