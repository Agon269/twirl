import React, { useContext } from "react";
import SolutionForm from "../components/SolutionForm";
import { connect } from "react-redux";
import { Box, Center, Heading } from "@chakra-ui/react";
import app from "../firebase";
import { useToast } from "@chakra-ui/toast";
import { AuthContext } from "../Auth";

import { createSolutionProblem } from "../actions/index";

const SFP = ({ createSolutionProblem, error, match }) => {
  const toast = useToast();
  const { id } = match.params;
  const { token } = useContext(AuthContext);

  const upload = async (acceptedFiles) => {
    let bucketName = "files";
    let file = acceptedFiles;
    let storageRef = app.storage().ref(`${bucketName}/${file.name}`);
    await storageRef.put(file);
    let download = await storageRef.getDownloadURL();
    return download;
  };
  const subHander = async (formVals) => {
    try {
      formVals.video = await upload(formVals.video);
    } catch (err) {
      toast({
        title: err.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
    createSolutionProblem(formVals, id, token);
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
      <Heading textAlign={"center"}>Create a solution</Heading>

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
            <SolutionForm
              onSubmit={subHander}
              initialValues={{
                title: "",
                description: "",
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

export default connect(mapStateToPropos, { createSolutionProblem })(SFP);
