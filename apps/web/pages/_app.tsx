import { ChakraProvider } from '@chakra-ui/react';
import '@fontsource/source-sans-pro/400.css';
import '@fontsource/open-sans/700.css';
import customTheme from 'ui/theme';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={customTheme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
