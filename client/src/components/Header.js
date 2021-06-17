import React, { useContext } from "react";
import { Box, Flex, useColorModeValue, Button } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon as Close } from "@chakra-ui/icons";

import { AuthContext } from "../Auth";
import Logo from "./Logo";
import HeaderItems from "./HeaderItems";

const Header = (props) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const { currentUser, onAuthChange, logOut } = useContext(AuthContext);

  const toggle = () => setIsOpen(!isOpen);
  const signOut = () => {
    logOut();
    onAuthChange();
  };
  return (
    <NavBarContainer {...props}>
      <Logo w="100px" />
      <MenuToggle toggle={toggle} isOpen={isOpen} />
      <HeaderItems
        isOpen={isOpen}
        currentUser={currentUser}
        onAuthChange={signOut}
      />
    </NavBarContainer>
  );
};

const CloseIcon = () => (
  <Button>
    <Close color={useColorModeValue("black", "white")} />
  </Button>
);

const MenuIcon = () => (
  <Button>
    <HamburgerIcon color={useColorModeValue("black", "white")} />
  </Button>
);
const MenuToggle = ({ toggle, isOpen }) => {
  return (
    <Box display={{ base: "block", md: "none" }} onClick={toggle}>
      {isOpen ? <CloseIcon /> : <MenuIcon />}
    </Box>
  );
};

const NavBarContainer = ({ children, ...props }) => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      mb={8}
      p={1}
      bg={useColorModeValue("gray.100", "gray.900")}
      {...props}
    >
      {children}
    </Flex>
  );
};

export default Header;
