import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getSolutions } from "../actions/index";
import { Text, Image, LinkBox, Flex, Stack, Box } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const SideSolutions = ({ solutions, getSolutions }) => {
  useEffect(getSolutions, [getSolutions]);

  const renderSolutions = solutions.slice(0, 3).map((sol) => {
    return (
      <LinkBox key={sol.id} as={RouterLink} to={`/solution/${sol.id}`} mb={"3"}>
        <Flex p={"4"}>
          <Image
            src={sol.thumbnail}
            alt={`${sol.problem.title}'s solution thumbnail`}
            className="solution__thumbnail"
            height={"40"}
            width={"64"}
          />

          <Stack direction={"column"} spacing={"5"} p={"5"}>
            <Text display={"inline-block"} w={32}>
              {sol.problem.title}
            </Text>

            <Stack>
              <Text
                color={"gray.400"}
                _hover={{ cursor: "pointer" }}
                w={"min-content"}
                fontSize={"sm"}
              >
                {sol.user.userName}
              </Text>
            </Stack>
          </Stack>
        </Flex>
      </LinkBox>
    );
  });
  return <Box>{renderSolutions}</Box>;
};
const mapStateToProps = (state) => {
  let sols = Object.values(state.solutions);

  return { solutions: sols };
};
export default connect(mapStateToProps, { getSolutions })(SideSolutions);
