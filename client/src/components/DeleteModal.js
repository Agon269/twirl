import React, { useContext } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import { connect } from "react-redux";
import { deleteSolution } from "../actions";
import { AuthContext } from "../Auth";

const DeleteModal = ({ deleteSolution, solutionId }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const { token } = useContext(AuthContext);

  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();
  const handleDelete = (id) => {
    setIsLoading(true);
    deleteSolution(id, token);
  };

  return (
    <>
      <Button colorScheme="red" onClick={() => setIsOpen(true)}>
        Delete Solution
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Solution
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  handleDelete(solutionId);
                }}
                ml={3}
                disabled={isLoading}
                isLoading={isLoading}
                loadingText="Deleting"
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default connect(null, { deleteSolution })(DeleteModal);
