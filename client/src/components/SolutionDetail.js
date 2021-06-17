import React from "react";
import { Avatar, Text, Flex, Link } from "@chakra-ui/react";
import TruncatedText from "../components/TrunckatedText";

import { Link as RouterLink } from "react-router-dom";
const SolutionDetail = ({ solution }) => {
  return (
    <>
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
      <p fontSize={"1xl"} p={4}>
        {solution.description.length > 50 ? (
          <TruncatedText longText={solution.description} lines={2} />
        ) : (
          solution.description
        )}
      </p>
    </>
  );
};

export default SolutionDetail;
