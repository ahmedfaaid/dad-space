import NextLink from 'next/link';
import { Flex, Link } from '@chakra-ui/react';

export default function AdditionalLinks() {
  return (
    <Flex
      mt={8}
      p={2}
      align='center'
      wrap='wrap'
      w='100%'
      bg='white'
      color='#7B7B7B'
      boxShadow='md'
      borderRadius={4}
    >
      <NextLink href='/help' passHref>
        <Link w='50%' mb={4} _hover={{ color: 'star-command-blue' }}>
          Help
        </Link>
      </NextLink>
      <NextLink href='/about' passHref>
        <Link w='50%' mb={4} _hover={{ color: 'star-command-blue' }}>
          About
        </Link>
      </NextLink>
      <NextLink href='/topics' passHref>
        <Link w='50%' mb={4} _hover={{ color: 'star-command-blue' }}>
          Careers
        </Link>
      </NextLink>
      <NextLink href='/blog' passHref>
        <Link w='50%' mb={4} _hover={{ color: 'star-command-blue' }}>
          Blog
        </Link>
      </NextLink>
      <NextLink href='/press' passHref>
        <Link w='50%' mb={4} _hover={{ color: 'star-command-blue' }}>
          Advertise
        </Link>
      </NextLink>
      <NextLink href='/privacy' passHref>
        <Link w='50%' mb={4} _hover={{ color: 'star-command-blue' }}>
          Privacy Policy
        </Link>
      </NextLink>
      <NextLink href='/terms' passHref>
        <Link w='50%' _hover={{ color: 'star-command-blue' }}>
          Terms
        </Link>
      </NextLink>
    </Flex>
  );
}
