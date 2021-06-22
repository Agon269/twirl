import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Box, Stack } from "@chakra-ui/layout";
import { Image, Avatar, Text, Divider } from "@chakra-ui/react";
import { getUsersSolutions, getUser, getUserProblems } from "../actions/index";
import UserSolutions from "../components/UserSolutions";
import UserProblems from "../components/UserProblems";
import Loading from "../components/Loading";
const User = ({
  match,
  getUsersSolutions,
  solutions,
  getUser,
  user,
  error,
  problems,
  getUserProblems,
}) => {
  const { id } = match.params;
  const [display, setDisplay] = useState("sol");

  useEffect(() => {
    getUsersSolutions(id);
    getUser(id);
    getUserProblems(id);
  }, [getUserProblems, getUsersSolutions, id, getUser]);

  if (error && (isEmpty(solutions) || isEmpty(user))) {
    return <div>Error.</div>;
  }
  if (isEmpty(user) || isEmpty(solutions)) {
    return <Loading />;
  }

  return (
    <>
      <Image
        src={user.banner}
        alt={`${user.userName}'s Banner`}
        onError={<Loading />}
        width={"full"}
        mt={"-8"}
      />
      <Stack direction={"row"} m={"6"} p={8}>
        <Avatar src={user.avatar} name={user.userName} />
        <Text fontSize={"4xl"} mb={"2"} alignSelf={"center"}>
          {user.userName}
        </Text>
      </Stack>
      <Box mb={4} w="full" maxW={"md"}>
        <Text
          fontSize={"xl"}
          ml={14}
          display={"inline-block"}
          _hover={{ cursor: "pointer", color: "purple.500" }}
          onClick={() => {
            setDisplay("sol");
          }}
          color={display === "sol" ? "purple.500" : ""}
        >
          Solutions
        </Text>
        <Text
          fontSize={"xl"}
          ml={6}
          display={"inline-block"}
          _hover={{ cursor: "pointer", color: "purple.500" }}
          onClick={() => {
            setDisplay("probs");
          }}
          color={display === "probs" ? "purple.500" : ""}
        >
          problems
        </Text>
      </Box>
      <Divider />
      {display === "sol" ? (
        <UserSolutions solutions={solutions} user={user} />
      ) : (
        <UserProblems problems={problems} />
      )}
    </>
  );
};

const mapStateToPropos = (state, ownProps) => {
  console.log(state.problems);
  let sols = Object.values(state.solutions);
  let probs = Object.values(state.problems);

  const newSols = sols.filter((sol) => {
    return sol.user.id === ownProps.match.params.id;
  });

  const newProbs = probs.filter((prob) => {
    return prob.user.id === ownProps.match.params.id;
  });

  newSols.reverse();
  return {
    solutions: newSols,
    user: state.user,
    error: state.error,
    problems: newProbs,
  };
};

export default connect(mapStateToPropos, {
  getUsersSolutions,
  getUser,
  getUserProblems,
})(User);
function isEmpty(obj) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      return false;
    }
  }
  return JSON.stringify(obj) === JSON.stringify({});
}
