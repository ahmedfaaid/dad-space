import { Dispatch, SetStateAction, useRef } from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button
} from '@chakra-ui/react';
import { useDeleteCommentMutation } from 'dad-gql';
import { capitalize } from '../../utils/fns';

interface ConfirmDeleteDialogProps {
  item: string;
  isOpen: boolean;
  onClose: () => void;
  itemToDelete: string;
  setItemToDelete?: Dispatch<SetStateAction<string>>;
  toast: (options: any) => void;
}

export default function ConfirmDelete({
  item,
  isOpen,
  onClose,
  itemToDelete,
  setItemToDelete,
  toast
}: ConfirmDeleteDialogProps) {
  const cancelRef = useRef();
  const [_, deleteComment] = useDeleteCommentMutation();

  const deleteAndClose = async () => {
    if (item === 'comment') {
      const res = await deleteComment({
        commentId: itemToDelete
      });

      if (res.data.deleteComment) {
        toast({
          title: 'Comment deleted',
          description: `You have successfully deleted the ${capitalize(item)}`,
          status: 'success',
          duration: 9000,
          isClosable: true
        });
      } else if (!res.data.deleteComment) {
        toast({
          title: 'Error deleting comment',
          description: `There was an error deleting the ${item}`,
          status: 'error',
          duration: 9000,
          isClosable: true
        });
      }

      if (setItemToDelete) {
        setItemToDelete(null);
      }
    } else if (item === 'post') {
      console.log('Delete Post');
    }

    onClose();
  };

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize='lg' fontWeight='bold'>
            Delete {capitalize(item)}?
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure you want to delete this {item}?
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='red' onClick={() => deleteAndClose()} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
