import React, { useEffect, useContext } from "react";
import ProblemForm from "../components/ProblemForm";
import { connect } from "react-redux";
import { Box, Center, Heading } from "@chakra-ui/react";

import { editProblem, getProblem } from "../actions/index";
import { AuthContext } from "../Auth";
import { useToast } from "@chakra-ui/toast";

const EditSolution = ({ editProblem, getProblem, match, problem, error }) => {
  const toast = useToast();

  const { currentUser, token } = useContext(AuthContext);

  const { id } = match.params;

  useEffect(() => {
    getProblem(id);
  }, [getProblem, id]);

  const subHander = async (formVals) => {
    editProblem(problem.id, formVals, token);
  };

  if (!problem) {
    return <div>No such problem ...</div>;
  }
  if (problem.user.id !== currentUser.id) {
    return <div>redirect back not allwoed !!!</div>;
  }
  if (error) {
    toast({
      title: error.message,
      status: "error",
      duration: 2000,
      isClosable: true,
    });
  }
  return (
    <>
      <Heading textAlign={"center"}>Edit solution</Heading>

      <Center py={"6"}>
        <Box
          maxW={"md"}
          w={"full"}
          boxShadow={"2xl"}
          borderWidth={"1px"}
          borderRadius={"lg"}
          overflow="hidden"
        >
          <Box m="5">
            <ProblemForm
              onSubmit={subHander}
              initialValues={{
                title: problem.title,
                description: problem.description,
                category: problem.category,
              }}
              type={"edit"}
            />
          </Box>
        </Box>
      </Center>
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    problem: state.problems[ownProps.match.params.id],
    error: state.error,
  };
};
export default connect(mapStateToProps, { editProblem, getProblem })(
  EditSolution
);
