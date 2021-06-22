import React from "react";
import { LinkBox, Text, SimpleGrid } from "@chakra-ui/layout";
import { Link as RouterLink } from "react-router-dom";
import MyBadge from "./MyBadge";

const UserProblems = ({ problems }) => {
  const renderProblems = problems.map((problem) => {
    return (
      <LinkBox
        as={RouterLink}
        to={`/problem/${problem.id}`}
        p={"4"}
        w={"full"}
        maxW={"full"}
        key={problem.id}
        borderRadius={"lg"}
        overflow="hidden"
        boxShadow={"1xl"}
        borderWidth={"2px"}
      >
        <Text fontSize={"2xl"} mb={"2"} display={"inline-block"}>
          {problem.title}
        </Text>
        <Text color={"gray.600"} mb={"2"}>
          {problem.description.length > 100
            ? `${problem.description.substr(0, 80)} ...`
            : problem.description}
        </Text>
        <MyBadge category={problem.category} />
      </LinkBox>
    );
  });
  return (
    <SimpleGrid columns={[1, 2, 3, 4]} spacing={8} p={8}>
      {renderProblems}
    </SimpleGrid>
  );
};
export default UserProblems;
