import React, { useState } from 'react';
import { Box, Field, Input, Button, VStack, Text, Link } from '@chakra-ui/react';
import { useNavigate } from 'react-router';
import { loginService } from '../services/loginService';
import { AxiosError } from 'axios';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setError('');

    try {
      await loginService.login(email, password);
      navigate('/');
    } catch (err: unknown) {
      if (err instanceof AxiosError && err.response) {
        setError(err.response.data.message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  return (
    <Box maxWidth="400px" margin="auto" padding={6}>
      <form onSubmit={handleSubmit}>
        <VStack>
          <Field.Root required>
            <Field.Label>Email</Field.Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </Field.Root>

          <Field.Root required>
            <Field.Label>Password</Field.Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </Field.Root>

          {error && <Text color="red.500">{error}</Text>}

          <Button colorScheme="blue" type="submit" width="full">
            Login
          </Button>

          <Text>
            Don't have an account?{' '}
            <Link href="/signup" color="blue.500">
              Sign Up
            </Link>
          </Text>
        </VStack>
      </form>
    </Box>
  );
};

export default LoginPage;
