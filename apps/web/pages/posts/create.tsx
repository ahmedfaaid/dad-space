import { useState } from 'react';
import { Box } from '@chakra-ui/react';
import Layout from '../../components/layout';
import TopicSelect from '../../components/TopicSelect';
import CreateNewPost from '../../components/CreatePost';
import { Topic } from '../../types';

export default function CreatePost() {
  const [topic, setTopic] = useState<Topic | null>(null);

  return (
    <Layout>
      {topic ? (
        <Box w='100%'>
          <CreateNewPost topic={topic} />
        </Box>
      ) : (
        <Box>
          <TopicSelect setTopic={setTopic} />
        </Box>
      )}
    </Layout>
  );
}
