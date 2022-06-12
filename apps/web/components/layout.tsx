import Head from 'next/head';
import NextLink from 'next/link';
import { Button, Container, Grid, GridItem } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

import Navbar from './Navbar';
import AdditionalLinks from './AdditionalLinks';
import SideMenu from './SideMenu';
import TopTopics from './TopTopics';

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
        <main>
          <Grid templateColumns='repeat(6, 1fr)' columnGap={4} mt={16}>
            <SideMenu />
            <GridItem colSpan={4}>{children}</GridItem>
            <GridItem>
              <NextLink href='/posts/create'>
                <Button
                  as='a'
                  leftIcon={<AddIcon w={3} h={3} />}
                  bg='star-command-blue'
                  color='white'
                  width='100%'
                  _hover={{ bg: 'navy-blue' }}
                >
                  Start a new post
                </Button>
              </NextLink>
              <TopTopics />
              <AdditionalLinks />
            </GridItem>
          </Grid>
        </main>
      </Container>
    </>
  );
}
