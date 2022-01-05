import Link from 'next/link';
import { Flex, GridItem, Icon, Text, Box } from '@chakra-ui/react';
import { FaHome, FaRegCompass, FaRegFileAlt, FaBookOpen } from 'react-icons/fa';

function MenuItem({ to, icon, text }) {
  return (
    <Link href={to} passHref>
      <Flex
        justify='flex-start'
        align='center'
        w='100%'
        p={4}
        ml={-4}
        cursor='pointer'
        _hover={{
          bg: '#F1F1F1',
          color: 'star-command-blue'
        }}
        color='#7B7B7B'
      >
        <Icon as={icon} mr={3} />
        <Text>{text}</Text>
      </Flex>
    </Link>
  );
}

export default function SideMenu() {
  return (
    <GridItem>
      <Box textAlign='left'>
        <MenuItem to='/' icon={FaHome} text='Home' />
        <MenuItem
          to='/explore-topics'
          icon={FaRegCompass}
          text='Explore Topics'
        />
        <MenuItem to='/my-posts' icon={FaRegFileAlt} text='My Posts' />
        <MenuItem to='/blog' icon={FaBookOpen} text='Blog' />
      </Box>
    </GridItem>
  );
}
