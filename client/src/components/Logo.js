import React from "react";
import { Box, Image } from "@chakra-ui/react";

export default function Logo(props) {
  return (
    <Box {...props} ml={3}>
      <Image
        src={
          "https://fontmeme.com/permalink/210612/5aacbb7bd1974894b8222278e331d24e.png"
        }
      />
    </Box>
  );
}
