import React from "react";
import {
  Avatar,
  Text,
  Flex,
  Link,
  Box,
  LinkBox,
  Stack,
} from "@chakra-ui/react";
import TruncatedText from "../components/TrunckatedText";
import MyBadge from "./MyBadge";
import { Link as RouterLink } from "react-router-dom";
const SolutionDetail = ({ solution, problem }) => {
  return (
    <Stack>
      <Flex columns={2}>
        <Avatar name={solution.user.userName} src={solution.user.avatar} />
        <Link
          as={RouterLink}
          _hover={{
            textDecoration: "none",
            cursor: "pointer",
          }}
          _focus={{ outline: "none" }}
          to={`/user/${solution.user.id}`}
        >
          <Text ml={"4"} fontSize={"2xl"}>
            {solution.user.userName}
          </Text>
        </Link>
      </Flex>

      <Box p={2}>
        <p fontSize={"1xl"}>
          {solution.description.length > 50 ? (
            <TruncatedText longText={solution.description} lines={2} />
          ) : (
            solution.description
          )}
        </p>
      </Box>
      <LinkBox
        as={RouterLink}
        to={`/problem/${problem.id}`}
        p={"4"}
        key={problem.id}
        maxW={"2xl"}
        w={"full"}
        borderRadius={"lg"}
        overflow="hidden"
        boxShadow={"1xl"}
        borderWidth={"2px"}
      >
        <Text fontSize={"2xl"} mb={"2"}>
          {problem.title}
        </Text>
        <Text color={"gray.600"} mb={"2"}>
          {problem.description.length > 100
            ? `${problem.description.substr(0, 80)} ...`
            : problem.description}
        </Text>
        <MyBadge category={problem.category} />
      </LinkBox>
    </Stack>
  );
};

export default SolutionDetail;
