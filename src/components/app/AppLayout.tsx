import { Outlet, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import { Box, Container, Grid, GridItem } from '@chakra-ui/react';
import Header from './Header';
import Sidebar from './Sidebar';

export default function AppLayout() {


  return (
    <Grid templateColumns="25rem auto">
      <GridItem
        minHeight="100vh"
        as="aside"
        borderRight="1px solid"
        borderColor="gray.300"
      >
        <Sidebar />
      </GridItem>
      <GridItem
        as="main"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Header />
        <Box overflow="auto">
          <Container centerContent p="4" maxW="container.md" >
            <Outlet />
          </Container>
        </Box>
        <Footer />
      </GridItem>
    </Grid>
  );
}
