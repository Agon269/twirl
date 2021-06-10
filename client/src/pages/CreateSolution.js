import React from "react";
import SolutionForm from "../components/SolutionForm";
import { connect } from "react-redux";
import { Box, Center, Heading } from "@chakra-ui/react";
import app from "../firebase";

import { createSolution } from "../actions/index";

const CreateSolution = ({ createSolution }) => {
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
      console.log(err);
    }
    createSolution(formVals);
  };
  return (
    <>
      <Heading textAlign={"center"}>Create a solution</Heading>

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
export default connect(null, { createSolution })(CreateSolution);
