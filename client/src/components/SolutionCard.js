import { Avatar, Text, Image, Stack, LinkBox, Box } from "@chakra-ui/react";
import "../styles/card.css";
import React from "react";
import history from "../history";
import { Link as RouterLink } from "react-router-dom";

const SolutionCard = ({ sol }) => {
  const routeToSol = (to) => {
    history.push(to);
  };
  return (
    <Box>
      <LinkBox
        className="solution"
        as={RouterLink}
        to={`/solution/${sol.id}`}
        mb={"3"}
      >
        <Image
          src="https://images.unsplash.com/photo-1611162616475-46b635cb6868?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80"
          alt="dogo"
          className="solution__thumbnail"
          height={"48"}
          width={"max"}
        />
      </LinkBox>
      <Stack direction={"row"}>
        <Avatar
          src={sol.user.avatar}
          name="dogo"
          _hover={{ cursor: "pointer" }}
          onClick={() => {
            routeToSol(`/user/${sol.user.id}`);
          }}
        />
        <Stack>
          <Text
            onClick={() => {
              routeToSol(`/solution/${sol.id}`);
            }}
            _hover={{ cursor: "pointer" }}
            mb={"-2"}
          >
            {sol.title}
          </Text>
          <Text
            ml={"4"}
            color={"gray.400"}
            _hover={{ cursor: "pointer" }}
            onClick={() => {
              routeToSol(`/user/${sol.user.id}`);
            }}
            w={"min-content"}
            fontSize={"sm"}
          >
            {sol.user.userName}
          </Text>
        </Stack>
      </Stack>
    </Box>
  );
};

export default SolutionCard;
