import React from "react";
import { connect } from "react-redux";
import { Box, Center, Heading } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import { createProblem } from "../actions/index";
import ProblemForm from "../components/ProblemForm";

const CreateProblem = ({ createProblem, error }) => {
  const toast = useToast();

  const subHander = async (formVals) => {
    createProblem(formVals);
  };
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
      <Heading textAlign={"center"}>Create a problem</Heading>

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
                title: "",
                description: "",
                category: "",
              }}
              type={"create"}
            />
          </Box>
        </Box>
      </Center>
    </>
  );
};

const mapStateToPropos = (state) => {
  return { error: state.error };
};

export default connect(mapStateToPropos, { createProblem })(CreateProblem);
