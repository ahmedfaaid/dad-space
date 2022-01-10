import { useState } from 'react';
import Link from 'next/link';
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
import { useMeQuery } from 'dad-gql';
import { BellIcon } from '@chakra-ui/icons';

export default function Navbar() {
  const [{ data }] = useMeQuery();

  let showBtnsOrAvatar;

  if (data) {
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
        <Link href='/login' passHref>
          <Button
            as='a'
            variant='outline'
            borderColor='star-command-blue'
            color='star-command-blue'
            size='sm'
          >
            Login
          </Button>
        </Link>
        <Link href='/signup' passHref>
          <Button
            as='a'
            variant='solid'
            bg='navy-blue'
            color='white'
            _hover={{ bg: 'star-command-blue' }}
            size='sm'
          >
            Sign Up
          </Button>
        </Link>
      </Stack>
    );
  }

  return (
    <Container maxW='100%' bg='white' py={4} boxShadow='md'>
      <Flex maxW='1400px' mx='auto'>
        <Center>
          <Link href='/' passHref>
            <Heading as='h1' fontSize='18px' cursor='pointer'>
              LOGO
            </Heading>
          </Link>
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
