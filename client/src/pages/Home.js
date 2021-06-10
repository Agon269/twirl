import React, { useContext, useEffect } from "react";
import { AuthContext } from "../Auth";
import { Container, Box, SimpleGrid, Text } from "@chakra-ui/layout";
import { connect } from "react-redux";
import { getSolutions } from "../actions/index";

import SolutionCard from "../components/SolutionCard";

const Home = ({ getSolutions, solutions }) => {
  // const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    getSolutions();
  }, [getSolutions]);

  if (!solutions) {
    return <div>Loading...</div>;
  } else {
    const renderSolutions = solutions.map((sol) => {
      return <SolutionCard key={sol.id} sol={sol} />;
    });
    return (
      <Box p={4}>
        <SimpleGrid columns={[1, 2, 3, 4]} spacing={12}>
          {renderSolutions}
        </SimpleGrid>
      </Box>
    );
  }
};

const mapStateToPropos = (state) => {
  return { solutions: Object.values(state.solutions) };
};

export default connect(mapStateToPropos, { getSolutions })(Home);
