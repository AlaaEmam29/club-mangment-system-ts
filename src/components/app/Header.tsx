import { Box, Container } from '@chakra-ui/react';
import Navbar from './Navbar';
import { useUser } from '@/features/user/useUser';

export default function Header() {
  const { isLoading } = useUser();
  if (isLoading) return <div>Loading...</div>;

  return (
    <Box
      borderBottom="1px solid "
      borderBottomColor="gray.300"
      boxShadow={'md'}
      p="6"
      as="header"
    >
      <Container maxW="98%" centerContent>
        <Navbar />
      </Container>
    </Box>
  );
}
