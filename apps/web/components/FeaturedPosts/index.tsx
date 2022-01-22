import { Box } from '@chakra-ui/react';

import FeaturedPost from '../FeaturedPost';

export default function FeaturedPosts() {
  const posts = [
    {
      id: 1,
      headline: 'Lorem Ipsum',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam turpis velit, tempor a quam at, volutpat rutrum lorem. Sed risus tellus, malesuada vel ornare quis, sodales vitae arcu. Nullam a lacinia turpis, sed fermentum ante. Aenean non sem hendrerit, consequat odio id, venenatis justo. Fusce dictum sodales sapien, non dapibus turpis fringilla sit amet. Nullam elit mauris, tincidunt non urna ut, mollis bibendum eros. Quisque mattis interdum justo, at gravida felis cursus non. Morbi nec massa suscipit, facilisis massa in, finibus urna. In dictum enim metus, nec sagittis ligula laoreet tempor.',
      postedBy: 'Ahmed Alhassan',
      createdAt: '2 days ago',
      ups: '12.1k',
      comments: 65,
      topic: 'Love'
    },
    {
      id: 2,
      headline: 'Lorem Ipsum',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam turpis velit, tempor a quam at, volutpat rutrum lorem. Sed risus tellus, malesuada vel ornare quis, sodales vitae arcu. Nullam a lacinia turpis, sed fermentum ante. Aenean non sem hendrerit, consequat odio id, venenatis justo. Fusce dictum sodales sapien, non dapibus turpis fringilla sit amet. Nullam elit mauris, tincidunt non urna ut, mollis bibendum eros. Quisque mattis interdum justo, at gravida felis cursus non. Morbi nec massa suscipit, facilisis massa in, finibus urna. In dictum enim metus, nec sagittis ligula laoreet tempor.',
      postedBy: 'Ahmed Alhassan',
      createdAt: '2 days ago',
      ups: '12.1k',
      comments: 65,
      topic: 'Discipline'
    },
    {
      id: 3,
      headline: 'Lorem Ipsum',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam turpis velit, tempor a quam at, volutpat rutrum lorem. Sed risus tellus, malesuada vel ornare quis, sodales vitae arcu. Nullam a lacinia turpis, sed fermentum ante. Aenean non sem hendrerit, consequat odio id, venenatis justo. Fusce dictum sodales sapien, non dapibus turpis fringilla sit amet. Nullam elit mauris, tincidunt non urna ut, mollis bibendum eros. Quisque mattis interdum justo, at gravida felis cursus non. Morbi nec massa suscipit, facilisis massa in, finibus urna. In dictum enim metus, nec sagittis ligula laoreet tempor.',
      postedBy: 'Ahmed Alhassan',
      createdAt: '2 days ago',
      ups: '12.1k',
      comments: 65,
      topic: 'Love'
    }
  ];

  return (
    <Box>
      {posts.map(post => (
        <FeaturedPost key={post.id} {...post} />
      ))}
    </Box>
  );
}
