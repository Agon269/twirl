import React from "react";

import { Box, SimpleGrid } from "@chakra-ui/layout";

import SolutionCard from "../components/SolutionCard";

const UserSolutions = ({ user, solutions }) => {
  const renderSolutions = solutions.map((sol) => {
    return <SolutionCard key={sol.id} sol={sol} />;
  });

  return (
    <>
      <Box p={"4"}>
        <SimpleGrid columns={[1, 2, 3, 4]} spacing={12} p={12}>
          {renderSolutions}
        </SimpleGrid>
      </Box>
    </>
  );
};

export default UserSolutions;
