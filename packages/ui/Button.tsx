import * as React from 'react';
import { Button } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

interface BtnProps {
  as?: any;
  leftIcon?: any;
  bg: string;
  color: string;
  hoverBg: string;
  text: string;
  width?: string | number;
}

export const Btn = ({
  as,
  leftIcon,
  bg,
  color,
  hoverBg,
  text,
  width
}: BtnProps) => {
  return (
    <Button
      as={as}
      leftIcon={leftIcon && leftIcon}
      bg={bg}
      color={color}
      w={width ? width : '100%'}
      _hover={{ bg: hoverBg }}
    >
      {text}
    </Button>
  );
};
