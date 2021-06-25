import { Image, LinkBox, Box } from "@chakra-ui/react";
import "../styles/card.css";
import React from "react";

import { Link as RouterLink } from "react-router-dom";

const ProblemSolutions = ({ sol }) => {
  return (
    <Box>
      <LinkBox
        className="solution"
        as={RouterLink}
        to={`/solution/${sol.id}`}
        mb={"3"}
      >
        <Image
          src={sol.thumbnail}
          alt={`solution thumbnail`}
          className="solution__thumbnail"
          height={"48"}
          width={"max"}
        />
      </LinkBox>
    </Box>
  );
};

export default ProblemSolutions;
