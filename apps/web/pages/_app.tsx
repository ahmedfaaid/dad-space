import { ChakraProvider } from '@chakra-ui/react';
import { createClient, Provider } from 'urql';
import '@fontsource/source-sans-pro/400.css';
import '@fontsource/open-sans/700.css';
import customTheme from 'ui/theme';
import { AuthProvider } from '../context/auth';

const client = createClient({
  url: 'http://localhost:5500/v1',
  fetchOptions: {
    credentials: 'include'
  }
});

function MyApp({ Component, pageProps }) {
  return (
    <Provider value={client}>
      <AuthProvider>
        <ChakraProvider theme={customTheme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </AuthProvider>
    </Provider>
  );
}

export default MyApp;
