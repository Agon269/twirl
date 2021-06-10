import React from "react";
import { Avatar, Text, Flex, Link } from "@chakra-ui/react";
import TruncatedText from "../components/TrunckatedText";

import { Link as RouterLink } from "react-router-dom";
const SolutionDetail = ({ solution }) => {
  return (
    <>
      <Flex columns={2}>
        <Avatar name={solution.createrName} src={solution.avatar} />
        <Link
          as={RouterLink}
          _hover={{
            textDecoration: "none",
            cursor: "pointer",
          }}
          to={`/user/${solution.userId}`}
        >
          <Text ml={"4"} fontSize={"2xl"}>
            {solution.createrName}
          </Text>
        </Link>
      </Flex>
      <Text fontSize={"1xl"} p={4}>
        {solution.description.length > 50 ? (
          <TruncatedText longText={solution.description} lines={1} />
        ) : (
          solution.description
        )}
      </Text>
    </>
  );
};

export default SolutionDetail;
