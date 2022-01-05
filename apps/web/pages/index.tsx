import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Spacer,
  Text,
  VStack
} from '@chakra-ui/react';
import { AddIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { Btn } from 'ui';

import Layout from '../components/layout';
import SideMenu from '../components/SideMenu';
import TopTopics from '../components/TopTopics';

export default function Home() {
  return (
    <Layout>
      <Grid templateColumns='repeat(6, 1fr)' columnGap={4} mt={16}>
        <SideMenu />
        <GridItem bg='yellow' colSpan={4} />
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
        </GridItem>
      </Grid>
    </Layout>
  );
}
