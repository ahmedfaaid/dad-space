import { Grid, GridItem } from '@chakra-ui/react';

import Layout from '../components/layout';
import SideMenu from '../components/SideMenu';

export default function Web() {
  return (
    <Layout>
      <Grid templateColumns='repeat(7, 1fr)' columnGap={4} mt={16}>
        <SideMenu />
        <GridItem bg='yellow' colSpan={5} />
        <GridItem bg='aqua' />
      </Grid>
    </Layout>
  );
}
