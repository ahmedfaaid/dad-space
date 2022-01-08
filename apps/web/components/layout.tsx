import Head from 'next/head';
import { Container } from '@chakra-ui/react';

import Navbar from './Navbar';

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Dad Space</title>
      </Head>
      <div>
        <Navbar />
      </div>
      <Container maxW='1400px' px={0}>
        <main>{children}</main>
      </Container>
    </>
  );
}
