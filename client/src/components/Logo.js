import React from "react";
import { Box, Image } from "@chakra-ui/react";

export default function Logo(props) {
  return (
    <Box {...props} ml={3}>
      <Image
        src={
          "https://fontmeme.com/permalink/210622/444e2d24ffeace5b4e7270a711a82848.png"
        }
      />
    </Box>
  );
}
