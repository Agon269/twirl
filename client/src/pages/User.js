import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Box, SimpleGrid, Stack } from "@chakra-ui/layout";
import { Image, Avatar, Text, Divider, Heading } from "@chakra-ui/react";

import { getUsersSolutions, getUser } from "../actions/index";
import SolutionCard from "../components/SolutionCard";

function isEmpty(obj) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      return false;
    }
  }
  return JSON.stringify(obj) === JSON.stringify({});
}

const User = ({
  match,
  getUsersSolutions,
  solutions,
  getUser,
  user,
  error,
}) => {
  const { id } = match.params;

  useEffect(() => {
    getUsersSolutions(id);
    getUser(id);
  }, [getUsersSolutions, id, getUser]);

  if (error && (isEmpty(solutions) || isEmpty(user))) {
    return <div>Error.</div>;
  }
  if (isEmpty(user) || isEmpty(solutions)) {
    return <div>Loading!!!</div>;
  }

  const renderSolutions = solutions.map((sol) => {
    return <SolutionCard key={sol.id} sol={sol} />;
  });

  return (
    <>
      <Image
        src={user.banner}
        alt={`${user.userName}'s Banner`}
        width={"full"}
        mt={"-8"}
      />

      <Box p={"4"}>
        <Stack direction={"row"} m={"6"}>
          <Avatar src={user.avatar} name={user.userName} />
          <Text fontSize={"4xl"} mb={"8"} alignSelf={"center"}>
            {user.userName}
          </Text>
        </Stack>
        <Divider />
        <Heading p={4}>Solutions</Heading>
        <SimpleGrid columns={[1, 2, 3, 4]} spacing={12} p={12}>
          {renderSolutions}
        </SimpleGrid>
      </Box>
    </>
  );
};

const mapStateToPropos = (state, ownProps) => {
  let sols = Object.values(state.solutions);

  const newSols = sols.filter((sol) => {
    return sol.user.id === ownProps.match.params.id;
  });

  newSols.reverse();
  return { solutions: newSols, user: state.user, error: state.error };
};

export default connect(mapStateToPropos, { getUsersSolutions, getUser })(User);
