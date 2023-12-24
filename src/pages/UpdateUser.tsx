import UpdateUserForm from '@/features/updateUser/UpdateUserForm';
import { Container, Flex } from '@chakra-ui/react';
export default function UpdateUser() {
  return (
    <Flex height="100vh" justify="center" align="center" as="section">
      <Container
        maxW="70rem"
        py={{ base: '12', md: '24' }}
        px={{ base: '0', sm: '8' }}
      >
        <UpdateUserForm />
      </Container>
    </Flex>
  );
}
