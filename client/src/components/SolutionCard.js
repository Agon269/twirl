import { Avatar, Box, Text, Image, Stack } from "@chakra-ui/react";
import "../styles/card.css";
import React from "react";

const SolutionCard = ({ sol }) => {
  return (
    <div className="solution">
      <Box borderWidth="1px" flex="1">
        <Image
          src="https://images.unsplash.com/photo-1611162616475-46b635cb6868?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80"
          alt="dogo"
          height={"48"}
          width={"max"}
          className="stream__thumbnail"
        />
        <Stack direction={"row"} p={"4"}>
          <Avatar src="https://picsum.photos/id/237/200/300" name="dogo" />
          <Stack>
            <Text mb={-2}>{sol.title}</Text>
            <Text>{sol.description}</Text>
          </Stack>
        </Stack>
      </Box>
    </div>
  );
};

export default SolutionCard;
