import React, { useContext } from "react";
import twirl from "../api/twirl";
import { withRouter } from "react-router-dom";
import { AuthContext } from "../Auth";
import { Box, Center, Heading } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import { Redirect } from "react-router-dom";

import AuthForm from "../components/AuthForm";

const Signup = ({ history }) => {
  const { onAuthChange, currentUser } = useContext(AuthContext);
  const toast = useToast();

  const subHandler = async (formVals) => {
    try {
      let user = await twirl.post("/user/signup", {
        userName: formVals.userName,
        password: formVals.password,
      });

      await onAuthChange(user.data.token);
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
  if (currentUser) {
    return <Redirect to="/" />;
  }
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
