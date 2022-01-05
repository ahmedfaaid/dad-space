import { Grid, GridItem, Button } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

import Layout from '../components/layout';
import SideMenu from '../components/SideMenu';

export default function Web() {
  return (
    <Layout>
      <Grid templateColumns='repeat(7, 1fr)' columnGap={4} mt={16}>
        <SideMenu />
        <GridItem bg='yellow' colSpan={5} />
        <GridItem>
          <Button
            leftIcon={<AddIcon w={3} h={3} />}
            bg='star-command-blue'
            colorScheme='white'
            w='100%'
            _hover={{ bg: 'navy-blue' }}
          >
            Start a new post
          </Button>
        </GridItem>
      </Grid>
    </Layout>
  );
}
