// theme.js

// 1. import `extendTheme` function
import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
// 2. Add your color mode config

const styles = {
  global: (props) => ({
    body: {
      bg: mode("#eff0f1", "#0e0e10")(props),
    },
  }),
};
// 3. extend the theme
const theme = extendTheme({ styles });

export default theme;
