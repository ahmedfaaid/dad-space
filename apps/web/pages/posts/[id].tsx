import { useRouter } from 'next/router';
import Layout from '../../components/layout';

export default function Post() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <Layout>
      <h1>{id}</h1>
    </Layout>
  );
}
