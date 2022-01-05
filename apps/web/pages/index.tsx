import { Grid, GridItem, Button } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { Btn } from 'ui';

import Layout from '../components/layout';
import SideMenu from '../components/SideMenu';

export default function Web() {
  return (
    <Layout>
      <Grid templateColumns='repeat(7, 1fr)' columnGap={4} mt={16}>
        <SideMenu />
        <GridItem bg='yellow' colSpan={5} />
        <GridItem>
          <Btn
            leftIcon={<AddIcon w={3} h={3} />}
            bg='star-command-blue'
            color='white'
            width='100%'
            hoverBg='navy-blue'
            text='Start a new post'
          />
        </GridItem>
      </Grid>
    </Layout>
  );
}
