import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import { UserProvider } from '../userContext';
import type {AppProps} from 'next/app';

export default function MyApp({ Component, pageProps } : AppProps) {
  return (
    <React.StrictMode>
      <ChakraProvider>
        <UserProvider>
          <Component {...pageProps} />
        </UserProvider>
      </ChakraProvider>
    </React.StrictMode>
  );
}

