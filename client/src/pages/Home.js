import React, { useEffect } from "react";
import { Box, SimpleGrid, Heading } from "@chakra-ui/layout";
import { connect } from "react-redux";
import { getSolutions } from "../actions/index";

import SolutionCard from "../components/SolutionCard";

const Home = ({ getSolutions, solutions, error }) => {
  useEffect(() => {
    getSolutions();
  }, [getSolutions]);

  if (error && solutions.length === 0) {
    return <div>Error</div>;
  }

  if (solutions.length === 0) {
    return <div>Loading...</div>;
  }

  const renderSolutions = solutions.reverse().map((sol) => {
    return <SolutionCard key={sol.id} sol={sol} />;
  });

  return (
    <Box p={4}>
      <Heading m={"4"} size={"xl"} mb={"8"}>
        Solutions
      </Heading>
      <SimpleGrid columns={[1, 2, 3, 4]} spacing={12}>
        {renderSolutions}
      </SimpleGrid>
    </Box>
  );
};

const mapStateToPropos = (state) => {
  let sols = Object.values(state.solutions);
  sols.reverse();
  return { solutions: sols, error: state.error };
};

export default connect(mapStateToPropos, { getSolutions })(Home);