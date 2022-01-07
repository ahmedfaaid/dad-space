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
  MenuItem
} from '@chakra-ui/react';
import { BellIcon } from '@chakra-ui/icons';

export default function Navbar() {
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
        <Center>
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
        </Center>
      </Flex>
    </Container>
  );
}
