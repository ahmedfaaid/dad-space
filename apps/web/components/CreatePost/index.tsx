import { useContext } from 'react';
import {
  Box,
  Input,
  Spinner,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  useDisclosure
} from '@chakra-ui/react';
import { useTopicsQuery } from 'dad-gql';
import { ModalContext } from '../../context/modal';

export default function CreatePost() {
  const [{ data, fetching }] = useTopicsQuery();
  // const { isOpen, onClose } = useDisclosure();
  const { isOpen, onClose } = useContext(ModalContext);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Select a topic to post to</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input placeholder='Topic' />
          <Box>
            {fetching ? (
              <Spinner />
            ) : (
              data.topics.map(topic => <Text key={topic.id}>{topic.name}</Text>)
            )}
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
