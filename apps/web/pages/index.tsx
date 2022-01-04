import { Grid, GridItem } from '@chakra-ui/react';

import Layout from '../components/layout';

export default function Web() {
  return (
    <Layout>
      <Grid templateColumns='repeat(7, 1fr)'>
        <GridItem bg='tomato' />
        <GridItem bg='yellow' colSpan={5} />
        <GridItem bg='aqua' />
      </Grid>
    </Layout>
  );
}
