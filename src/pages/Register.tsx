import { RegisterForm } from '@/features/register/RegisterForm';
import { Flex } from '@chakra-ui/react';

export default function Register() {
  return (
    <Flex height="100vh" justify="center" align="center" as="section">
      <RegisterForm />
    </Flex>
  );
}
