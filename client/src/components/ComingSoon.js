import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

const ComingSoon = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button leftIcon={<StarIcon />} colorScheme="purple" onClick={onOpen}>
        Donate
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent p={6}>
          <ModalCloseButton />
          <ModalBody p={"10"}>
            This feature is under construction 😓😓😓
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default ComingSoon;
