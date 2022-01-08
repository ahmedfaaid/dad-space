import { ChakraProvider } from '@chakra-ui/react';
import { createClient, Provider } from 'urql';
import '@fontsource/source-sans-pro/400.css';
import '@fontsource/open-sans/700.css';
import customTheme from 'ui/theme';

const client = createClient({
  url: 'http://localhost:5500/v1'
});

function MyApp({ Component, pageProps }) {
  return (
    <Provider value={client}>
      <ChakraProvider theme={customTheme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
