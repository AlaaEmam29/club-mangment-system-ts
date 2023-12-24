import { Flex } from '@chakra-ui/react';
import { ForgetPasswordForm } from '@/features/forgetPassword/ForgetPasswordForm';

export default function ForgetPassword() {
  return (
    <Flex height="100vh" justify="center" align="center" as="section">
      <ForgetPasswordForm />
    </Flex>
  );
}
