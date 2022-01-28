import { useContext, createContext } from 'react';
import { useDisclosure } from '@chakra-ui/hooks';
import { ModalState } from '../types';

export const ModalContext = createContext<ModalState>({
  onOpen: () => {},
  onClose: () => {},
  isOpen: false
});

function useModalDisclosure() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return {
    onOpen,
    onClose,
    isOpen
  };
}

export function ModalProvider({ children }) {
  const modal = useModalDisclosure();

  return (
    <ModalContext.Provider value={modal}>{children}</ModalContext.Provider>
  );
}
