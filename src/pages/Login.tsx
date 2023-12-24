import { LoginForm } from '@/features/login/LoginForm';
import { Flex } from '@chakra-ui/react';

export default function Login() {
  return (
    <Flex height="100vh" justify="center" align="center" as="section">
      <LoginForm />
    </Flex>
  );
}
