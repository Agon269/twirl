import React, { useEffect } from "react";
import { Box, SimpleGrid, LinkBox } from "@chakra-ui/layout";
import { connect } from "react-redux";
import { getProblems } from "../actions/index";
import { Link as RouterLink } from "react-router-dom";
import { Text, Heading, Center } from "@chakra-ui/react";
import MyBadge from "../components/MyBadge";
import Loading from "../components/Loading";

const Home = ({ getProblems, problems, error }) => {
  useEffect(() => {
    getProblems();
  }, [getProblems]);

  if (error && problems.length === 0) {
    return <div>Error</div>;
  }

  if (problems.length === 0) {
    return <Loading />;
  }

  const renderProblems = problems.map((problem) => {
    return (
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
    );
  });
  return (
    <Center>
      <Box>
        <Heading m={"4"} size={"xl"}>
          Problems Board
        </Heading>

        <Box maxW={"2xl"} w={"full"} mb={4}>
          <SimpleGrid columns={[1]} spacing={2}>
            {renderProblems}
          </SimpleGrid>
        </Box>
      </Box>
    </Center>
  );
};

const mapStateToPropos = (state) => {
  let sols = Object.values(state.problems);
  sols.reverse();

  return { problems: sols, error: state.error };
};

export default connect(mapStateToPropos, { getProblems })(Home);
