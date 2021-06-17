import React from "react";
import { IconButton, useColorMode } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

export default function DarkMode() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <div>
      <IconButton
        icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        size={"md"}
        alignSelf="flex-end"
        onClick={toggleColorMode}
        mr={"4"}
        _focus={{ outline: "none" }}
      />
    </div>
  );
}
