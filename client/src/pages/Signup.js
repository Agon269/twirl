import React, { useContext } from "react";
import twirl from "../api/twirl";
import { withRouter } from "react-router-dom";
import { AuthContext } from "../Auth";
import { Box, Center, Heading } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";

import AuthForm from "../components/AuthForm";

const Signup = ({ history }) => {
  const { onAuthChange } = useContext(AuthContext);
  const toast = useToast();

  const subHandler = async (formVals) => {
    try {
      await twirl.post("/user/signup", {
        userName: formVals.userName,
        password: formVals.password,
      });

      onAuthChange();
      history.goBack();
    } catch (err) {
      toast({
        title:
          err.message === "Request failed with status code 422"
            ? "user name in use"
            : err.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };
  return (
    <>
      <Heading textAlign={"center"}>Sign Up</Heading>
      <Center py={"6"}>
        <Box
          maxW={"sm"}
          w={"full"}
          boxShadow={"2xl"}
          borderWidth={"1px"}
          borderRadius={"lg"}
          overflow="hidden"
        >
          <Box m="5" p="2">
            <AuthForm onSubmit={subHandler} />
          </Box>
        </Box>
      </Center>
    </>
  );
};
export default withRouter(Signup);
