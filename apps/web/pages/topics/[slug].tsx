import { useRouter } from 'next/router';
import { Heading } from '@chakra-ui/react';
import Layout from '../../components/layout';

export default function SingleTopic() {
  const router = useRouter();
  const { slug } = router.query;
  return (
    <Layout>
      <Heading>{slug}</Heading>
    </Layout>
  );
}
