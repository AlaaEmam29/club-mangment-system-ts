import UpdateUserForm from '@/features/updateUser/UpdateUserForm';
import { Box, Button, Container, Flex } from '@chakra-ui/react';
export default function UpdateUser() {
  return (
    <Flex height="100vh" justify="center" align="center" as="section">
      <Container
        maxW="70rem"
        py={{ base: '12', md: '24' }}
        px={{ base: '0', sm: '8' }}
      >
     <Box mb="2rem" 
     margin='auto'
      width='fit-content'
     >
        <Button
          colorScheme="blue"
          py="6"
          px="8"
          fontSize={{ base: '1.2rem', md: '1.4rem' }}
          onClick={() => {
            window.location.href = '/';
          }}
        >
          Go to Home Page
        </Button>
      </Box>
        <UpdateUserForm />
      </Container>
    </Flex>
  );
}
