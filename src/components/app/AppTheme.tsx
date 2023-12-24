import { extendTheme } from '@chakra-ui/react';

const theme = {
  styles: {
    global: () => ({
      html: {
        fontSize: '10px',
      },
      body: {
        lineHeight: 'base',
        fontSize: '1.6rem',
        backgroundColor: 'rgb(244 ,247, 254)',
      },
    }),
  },
};
const AppTheme = extendTheme(theme);

export default AppTheme;
