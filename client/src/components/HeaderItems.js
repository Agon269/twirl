import React from "react";
import DarkMode from "./DarkMode";
import MyButton from "./MyButton";
import Signout from "./Signout";
import {
  Link,
  Box,
  Stack,
  Avatar,
  MenuButton,
  Menu,
  MenuList,
  MenuItem,
  Portal,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const MenuItems = ({ children, isLast, to = "/", ...rest }) => {
  return (
    <Link
      as={RouterLink}
      _hover={{
        textDecoration: "none",
        cursor: "pointer",
      }}
      _focus={{
        outlineColor: "transparent",
      }}
      to={to}
      fontWeight={"bold"}
      fontSize={"sm"}
    >
      <span {...rest}>{children}</span>
    </Link>
  );
};
const HeaderItems = ({ isOpen, currentUser }) => {
  return (
    <Box
      display={{ base: isOpen ? "block" : "none", md: "block" }}
      flexBasis={{ base: "100%", md: "auto" }}
    >
      <Stack
        spacing={8}
        align="center"
        justify={["center", "space-between", "flex-end", "flex-end"]}
        direction={["column", "row", "row", "row"]}
        pt={[4, 4, 0, 0]}
      >
        <MenuItems to="/">Home</MenuItems>
        <MenuItems to="/solutions">Solutions</MenuItems>
        <Stack direction={["column", "row", "row", "row"]}>
          {buttons(currentUser)}
        </Stack>
        <MenuItems to="#">
          <DarkMode />
        </MenuItems>
      </Stack>
    </Box>
  );
};

const buttons = (currentUser) => {
  if (currentUser === null) {
    return (
      <>
        <MenuItems to="/signin">
          <MyButton
            label={"Sign in"}
            size={"sm"}
            variant={"outline"}
            light={"gray.400"}
            dark={"gray.900"}
          />
        </MenuItems>
        <MenuItems to="/signup">
          <MyButton
            label={"Sign up"}
            size={"sm"}
            variant={"outline"}
            light={"blue.700"}
            dark={"blue.500"}
          />
        </MenuItems>
      </>
    );
  } else {
    return (
      <>
        <MenuItems to={"#"}>
          <Menu>
            <MenuButton>
              <Avatar name={currentUser.userName} src={currentUser.avatar} />
            </MenuButton>
            <Portal>
              <MenuList>
                <MenuItem>
                  <Signout />
                </MenuItem>
                <MenuItem>
                  <MenuItems to={`/user/${currentUser.id}`}>
                    My solutions
                  </MenuItems>
                </MenuItem>
              </MenuList>
            </Portal>
          </Menu>
        </MenuItems>
      </>
    );
  }
};

export default HeaderItems;
