import React from "react";
import DarkMode from "./DarkMode";
import MyButton from "./MyButton";

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
  MenuDivider,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import history from "../history";

const HeaderItems = ({ isOpen, currentUser, onAuthChange }) => {
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
        <Link
          as={RouterLink}
          to="/"
          _hover={{
            textDecoration: "none",
            cursor: "pointer",
          }}
          _focus={{
            outlineColor: "transparent",
          }}
        >
          Home
        </Link>
        <Link
          as={RouterLink}
          to="/problems"
          _hover={{
            textDecoration: "none",
            cursor: "pointer",
          }}
          _focus={{
            outlineColor: "transparent",
          }}
        >
          Problems
        </Link>
        <Stack direction={["column", "row", "row", "row"]}>
          {buttons(currentUser, onAuthChange)}
        </Stack>

        <DarkMode />
      </Stack>
    </Box>
  );
};

const buttons = (currentUser, onAuthChange) => {
  if (currentUser === null) {
    return (
      <>
        <span
          onClick={() => {
            routeTo("/signin");
          }}
        >
          <MyButton
            label={"Sign in"}
            size={"sm"}
            variant={"outline"}
            light={"gray.400"}
            dark={"gray.900"}
          />
        </span>
        <span
          onClick={() => {
            routeTo("/signup");
          }}
        >
          <MyButton
            label={"Sign up"}
            size={"sm"}
            variant={"outline"}
            light={"blue.700"}
            dark={"blue.500"}
          />
        </span>
      </>
    );
  } else {
    return (
      <Menu>
        <MenuButton>
          <Avatar name={currentUser.userName} src={currentUser.avatar} />
        </MenuButton>
        <Portal>
          <MenuList>
            <MenuItem
              onClick={() => {
                routeTo(`/user/${currentUser.id}`);
              }}
            >
              My Account
            </MenuItem>

            <MenuItem
              onClick={() => {
                routeTo("/createproblem");
              }}
            >
              Create problem
            </MenuItem>
            <MenuDivider />
            <MenuItem onClick={() => onAuthChange()}>Signout</MenuItem>
          </MenuList>
        </Portal>
      </Menu>
    );
  }
};
const routeTo = (to) => history.push(to);
export default HeaderItems;
