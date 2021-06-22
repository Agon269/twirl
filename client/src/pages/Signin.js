import React, { useContext } from "react";
import { AuthContext } from "../Auth";
import { withRouter } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import twirl from "../api/twirl";
import { useToast } from "@chakra-ui/toast";
import { Redirect } from "react-router-dom";

import { Box, Center, Heading } from "@chakra-ui/react";

const Signin = ({ history }) => {
  const { onAuthChange, currentUser } = useContext(AuthContext);

  const toast = useToast();

  const subHandler = async (formVals) => {
    try {
      await twirl.post("/user/signin", {
        userName: formVals.userName,
        password: formVals.password,
      });
      onAuthChange();
      history.goBack();
    } catch (err) {
      console.log(err);
      toast({
        title:
          err.message === "Request failed with status code 401"
            ? "Invalid username or password"
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
      <Heading textAlign={"center"}>Sign in</Heading>
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
export default withRouter(Signin);
