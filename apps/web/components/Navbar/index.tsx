import { useState } from 'react';
import {
  Flex,
  Center,
  Input,
  IconButton,
  Avatar,
  Spacer,
  Container,
  Heading,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Stack
} from '@chakra-ui/react';
import { BellIcon } from '@chakra-ui/icons';

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);

  let showBtnsOrAvatar;

  if (loggedIn) {
    showBtnsOrAvatar = (
      <>
        <IconButton
          aria-label='Your Notifications'
          icon={<BellIcon w={6} h={6} />}
          mr={5}
          bg='white'
        />
        <Menu>
          <MenuButton>
            <Avatar size='xs' src='https://bit.ly/broken-link' />
          </MenuButton>
          <MenuList>
            <MenuItem>Profile</MenuItem>
            <MenuItem>Settings</MenuItem>
            <MenuItem>Logout</MenuItem>
          </MenuList>
        </Menu>
      </>
    );
  } else {
    showBtnsOrAvatar = (
      <Stack direction='row' spacing={5}>
        <Button
          variant='outline'
          borderColor='star-command-blue'
          color='star-command-blue'
          size='sm'
        >
          Login
        </Button>
        <Button
          variant='solid'
          bg='navy-blue'
          color='white'
          _hover={{ bg: 'star-command-blue' }}
          size='sm'
        >
          Sign Up
        </Button>
      </Stack>
    );
  }

  return (
    <Container maxW='100%' bg='white' py={4} boxShadow='md'>
      <Flex maxW='1400px' mx='auto'>
        <Center>
          <Heading as='h1' fontSize='18px'>
            LOGO
          </Heading>
        </Center>
        <Spacer />
        <Center>
          <Input
            variant='filled'
            placeholder='Search for a topic'
            w='300px'
            bgColor='#f1f1f1'
          />
        </Center>
        <Spacer />
        <Center>{showBtnsOrAvatar}</Center>
      </Flex>
    </Container>
  );
}
