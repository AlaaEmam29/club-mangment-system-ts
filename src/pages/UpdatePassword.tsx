import { Flex } from '@chakra-ui/react';
import { UpdatePasswordForm } from '@/features/updatePassword/UpdatePasswordForm';
export default function UpdatePassword() {
  return (
    <Flex height="100vh" justify="center" align="center" as="section">
      <UpdatePasswordForm />
    </Flex>
  );
}
