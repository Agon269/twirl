import React, { useEffect, useContext } from "react";
import SolutionForm from "../components/SolutionForm";
import { connect } from "react-redux";
import { Box, Center, Heading } from "@chakra-ui/react";

import { editSolution, getSolution } from "../actions/index";
import { AuthContext } from "../Auth";
import { useToast } from "@chakra-ui/toast";

const EditSolution = ({
  editSolution,
  getSolution,
  match,
  solution,
  error,
}) => {
  const toast = useToast();

  const { currentUser } = useContext(AuthContext);

  const { id } = match.params;

  useEffect(() => {
    getSolution(id);
  }, [getSolution, id]);

  const subHander = async (formVals) => {
    editSolution(solution.id, formVals);
  };

  if (!solution) {
    return <div>No such soltuion ...</div>;
  }
  if (solution.user.id !== currentUser.id) {
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
          maxW={"sm"}
          w={"full"}
          boxShadow={"2xl"}
          borderWidth={"1px"}
          borderRadius={"lg"}
          overflow="hidden"
        >
          <Box m="5">
            <SolutionForm
              onSubmit={subHander}
              initialValues={{
                title: solution.title,
                description: solution.description,
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
    solution: state.solutions[ownProps.match.params.id],
    error: state.error,
  };
};
export default connect(mapStateToProps, { editSolution, getSolution })(
  EditSolution
);
