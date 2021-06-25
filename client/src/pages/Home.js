import React, { useEffect } from "react";
import {
  Box,
  SimpleGrid,
  Heading,
  Center,
  Text,
  Stack,
  Link,
} from "@chakra-ui/layout";
import { connect } from "react-redux";
import { getSolutions } from "../actions/index";
import Loading from "../components/Loading";
import SolutionCard from "../components/SolutionCard";
import MyButton from "../components/MyButton";
import { Link as RouterLink } from "react-router-dom";
import Error from "../components/Error";

const Home = ({ getSolutions, solutions, error }) => {
  useEffect(() => {
    getSolutions();
  }, [getSolutions]);

  if (error && solutions.length === 0) {
    return <Error err={error} />;
  }

  if (solutions.length === 0) {
    return <Loading />;
  }

  const renderSolutions = solutions.reverse().map((sol) => {
    return <SolutionCard key={sol.id} sol={sol} />;
  });

  return (
    <>
      <Center>
        <SimpleGrid columns={[0, 1, 2]} spacing={4}>
          <Stack direction={"column"}>
            <Box>
              <Heading>Welcome to twirl</Heading>
              <Text mt={"4"} w={"sm"}>
                A place to share your code problems and get response with a
                detailed video explanation
              </Text>
            </Box>
          </Stack>
          <Box alignSelf="center">
            <Text>Share your problem now and get a response</Text>
            <Link
              as={RouterLink}
              to={"/createproblem"}
              _hover={{
                textDecoration: "none",
                cursor: "pointer",
              }}
              _focus={{
                outlineColor: "transparent",
              }}
            >
              <MyButton
                label={"Create problem"}
                light={"purple.700"}
                dark={"purple.500"}
                mt={"4"}
                size={"md"}
              />
            </Link>
          </Box>
        </SimpleGrid>
      </Center>
      <Box p={8}>
        <Heading m={"4"} size={"xl"} mb={"8"}>
          Solutions
        </Heading>
        <SimpleGrid columns={[1, 2, 3, 4, 5]} spacing={12}>
          {renderSolutions}
        </SimpleGrid>
      </Box>
    </>
  );
};

const mapStateToPropos = (state) => {
  let sols = Object.values(state.solutions);

  return { solutions: sols, error: state.error };
};

export default connect(mapStateToPropos, { getSolutions })(Home);
