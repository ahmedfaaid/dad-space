import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'urql';
import '@fontsource/source-sans-pro/400.css';
import '@fontsource/open-sans/700.css';
import customTheme from 'ui/theme';
import { AuthProvider } from '../context/auth';
import { createUrqlClient } from '../utils/createUrqlClient';

function MyApp({ Component, pageProps }) {
  return (
    <Provider value={createUrqlClient}>
      <AuthProvider>
        <ChakraProvider theme={customTheme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </AuthProvider>
    </Provider>
  );
}

export default MyApp;
