import React from 'react';
import { Box, Heading, Button, Flex } from '@chakra-ui/react';
import TreatmentList from '../components/TreatmentList';
import { useNavigate } from 'react-router';
import { loginService } from '../services/loginService';
import { useRequireAuth } from '../hooks/useRequireAuth';

const Dashboard: React.FC = () => {
  useRequireAuth(); // redirect if not signed in

  const navigate = useNavigate();

  const handleLogout = (): void => {
    loginService.logout();
    navigate('/login');
  };

  return (
    <Box p={4}>
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Heading>Dashboard</Heading>
        <Flex>
          <Button colorScheme="blue" onClick={() => navigate('/create-treatment')} mr={2}>
            Create Treatment
          </Button>
          <Button colorScheme="red" onClick={handleLogout}>
            Logout
          </Button>
        </Flex>
      </Flex>
      <TreatmentList />
    </Box>
  );
};

export default Dashboard;
