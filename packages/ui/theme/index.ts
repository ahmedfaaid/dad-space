import { extendTheme } from '@chakra-ui/react';

const customTheme = extendTheme({
  colors: {
    'navy-blue': '#03045E',
    'star-command-blue': '#0077B6',
    'cerulean-crayola': '#00B4D8',
    'sky-blue-crayola': '#90E0EF',
    'powder-blue': '#CAF0F8'
  },
  fonts: {
    heading: 'Open Sans',
    body: 'Source Sans Pro'
  },
  styles: {
    global: {
      html: {
        overflowY: 'scroll'
      },
      'html, body': {
        backgroundColor: '#f4f4f4',
        fontFamily: 'body'
      },
      'h1, h2, h3, h4, h5, h6': {
        fontFamily: 'heading'
      }
    }
  }
});

export default customTheme;
