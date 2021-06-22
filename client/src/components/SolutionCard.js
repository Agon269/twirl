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
          src={sol.thumbnail}
          alt={`${sol.problem.title}'s solution thumbnail`}
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
            {sol.problem.title}
          </Text>
          <Text
            ml={"4"}
            color={"gray.600"}
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
