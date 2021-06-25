import React, { useEffect, useContext } from "react";
import { connect } from "react-redux";
import { getProblem } from "../actions/index";
import {
  Box,
  Center,
  Text,
  Divider,
  Link,
  Heading,
  Button,
  SimpleGrid,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import MyBadge from "../components/MyBadge";
import Loading from "../components/Loading";

import { AuthContext } from "../Auth";
import MyButton from "../components/MyButton";
import DeleteModal from "../components/DeleteModal";
import { useToast } from "@chakra-ui/toast";
import Error from "../components/Error";

const Problem = ({ getProblem, problem, match, error }) => {
  const toast = useToast();

  const { currentUser } = useContext(AuthContext);

  const { id } = match.params;

  useEffect(() => {
    getProblem(id);
  }, [getProblem, id]);

  if (error && !problem) {
    return <Error err={error} />;
  }
  if (!problem) {
    return <Loading />;
  }
  if (error) {
    toast({
      title: error.message,
      status: "error",
      duration: 2000,
      isClosable: true,
    });
  }
  const owner = currentUser?.id === problem.user.id;

  return (
    <>
      <Center p={"4"}>
        <Box maxW={"2xl"} w={"full"} mb={4}>
          <Heading m={"4"} size={"xl"}>
            Problem
          </Heading>
          <Box
            maxW={"2xl"}
            w={"full"}
            borderRadius={"lg"}
            overflow="hidden"
            boxShadow={"1xl"}
            borderWidth={"2px"}
            p={8}
          >
            <Text fontSize={"2xl"} mb={"2"}>
              {problem.title}
            </Text>
            <Text mb={"2"}>{problem.description}</Text>
            <MyBadge category={problem.category} />
            <Box mt={8}>
              {owner ? (
                <>
                  <Link
                    mr={"4"}
                    as={RouterLink}
                    to={`/problem/edit/${problem.id}`}
                    _hover={{
                      textDecoration: "none",
                      cursor: "pointer",
                    }}
                    _focus={{ outline: "none" }}
                  >
                    <MyButton
                      label={"Edit problem"}
                      size={"md"}
                      light={"purple.700"}
                      dark={"purple.500"}
                    />
                  </Link>

                  <DeleteModal solutionId={problem.id} />
                </>
              ) : (
                ""
              )}
            </Box>
            <Divider my={4} />
            <Box>
              <Link
                mr={"4"}
                as={RouterLink}
                to={`/problemsolution/${problem.id}`}
                _hover={{
                  textDecoration: "none",
                  cursor: "pointer",
                }}
                _focus={{ outline: "none" }}
              >
                <Button colorScheme={"teal"}>Solve Problem</Button>
              </Link>
            </Box>
          </Box>
        </Box>
      </Center>
      <Box p={8}>
        <Heading>Solutions to this problem</Heading>
        <SimpleGrid columns={[1, 2, 3, 4]} spacing={12} p={12}>
          {/**render solutions related to problem here */}
        </SimpleGrid>
      </Box>
    </>
  );
};
const mapStateToProps = (state, ownProps) => {
  return {
    problem: state.problems[ownProps.match.params.id],
    error: state.error,
  };
};
export default connect(mapStateToProps, {
  getProblem,
})(Problem);
