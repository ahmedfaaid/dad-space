import { useRouter } from 'next/router';
import { Grid, GridItem, Heading, Skeleton } from '@chakra-ui/react';
import Layout from '../../components/layout';
import SideMenu from '../../components/SideMenu';
import TopTopics from '../../components/TopTopics';
import AdditionalLinks from '../../components/AdditionalLinks';

export default function SingleTopic() {
  const router = useRouter();
  const { slug } = router.query;
  return (
    <Layout>
      <Grid templateColumns='repeat(6, 1fr)' columnGap={4} mt={16}>
        <SideMenu />
        <GridItem colSpan={4}>
          <Heading>{slug}</Heading>
        </GridItem>
        <GridItem>
          <TopTopics />
          <AdditionalLinks />
        </GridItem>
      </Grid>
    </Layout>
  );
}
