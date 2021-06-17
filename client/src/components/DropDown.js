import React from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItemOption,
  MenuOptionGroup,
  Button,
} from "@chakra-ui/react";
const DropDown = () => {
  return (
    <Menu closeOnSelect={false}>
      <MenuButton as={Button} colorScheme="blue">
        MenuItem
      </MenuButton>
      <MenuList minWidth="240px">
        <MenuOptionGroup title="Country" type="checkbox">
          <MenuItemOption value="JavaScript">JavaScript</MenuItemOption>
          <MenuItemOption value="Java">Java</MenuItemOption>
          <MenuItemOption value="Python">Python</MenuItemOption>
          <MenuItemOption value="C++">C++</MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
};

export default DropDown;
