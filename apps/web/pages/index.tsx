import { Grid, GridItem } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { Btn } from 'ui';

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
          <Btn
            leftIcon={<AddIcon w={3} h={3} />}
            bg='star-command-blue'
            color='white'
            width='100%'
            hoverBg='navy-blue'
            text='Start a new post'
          />
          <TopTopics />
          <AdditionalLinks />
        </GridItem>
      </Grid>
    </Layout>
  );
}
