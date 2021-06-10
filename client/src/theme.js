// theme.js

// 1. import `extendTheme` function
import { extendTheme } from "@chakra-ui/react";
import Button from "./styles/Button";
// 2. Add your color mode config
const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

// 3. extend the theme
const theme = extendTheme({ config, components: { Button } });

export default theme;
