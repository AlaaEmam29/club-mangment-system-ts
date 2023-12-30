import { Flex } from '@chakra-ui/react';
import { Logo } from '../ui/Logo';

import { PulseLoader } from 'react-spinners';

export default function MainLoader() {
  return (
    <Flex
      height="100vh"
      justify="center"
      align="center"
      as="section"
      direction="column"
      position="fixed"
      top="0"
      gap="8"
      left="0"
      width="100%"
      zIndex="10000"
    >
      <Logo h="32" color="blue.500" />
      <PulseLoader color="#3182ce" size={20} />
    </Flex>
  );
}
