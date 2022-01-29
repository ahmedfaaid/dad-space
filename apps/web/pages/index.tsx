import { useContext } from 'react';
import NextLink from 'next/link';
import { Grid, GridItem, Button } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

import Layout from '../components/layout';
import SideMenu from '../components/SideMenu';
import TopTopics from '../components/TopTopics';
import AdditionalLinks from '../components/AdditionalLinks';
import FeaturedPosts from '../components/FeaturedPosts';

export default function Home() {
  return (
    <Layout>
      <Grid templateColumns='repeat(6, 1fr)' columnGap={4} mt={16}>
        <SideMenu />
        <GridItem colSpan={4}>
          <FeaturedPosts />
        </GridItem>
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
    </Layout>
  );
}
