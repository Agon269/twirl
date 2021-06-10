import React, { useEffect, useContext } from "react";
import { connect } from "react-redux";
import { getSolution, createComment } from "../actions/index";
import { Box, Center, Text, SimpleGrid, Divider, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { AuthContext } from "../Auth";
import CommentForm from "../components/CommentForm";
import Comment from "../components/Comment";
import SolutionDetail from "../components/SolutionDetail";
import MyButton from "../components/MyButton";

const Solution = ({ getSolution, solution, match, createComment }) => {
  const { currentUser } = useContext(AuthContext);

  const { id } = match.params;

  useEffect(() => {
    getSolution(id);
  }, [getSolution, id]);

  const handleComment = (values) => {
    let commentParams = {
      ...values,
      solutionId: solution.id,
      userId: currentUser.id,
    };
    createComment(commentParams);
  };
  if (!solution) {
    return <div>No such solution...</div>;
  }
  const owner = currentUser?.id === solution.createrId;

  return (
    <>
      <Center p={6}>
        <SimpleGrid>
          <Box maxW={"3xl"} w={"full"} borderRadius={"lg"} overflow="hidden">
            <video src={solution.video} controls width="800" />
          </Box>
          <Box pt={2}>
            <Text fontSize={"3xl"}>{solution.title}</Text>
            {owner ? (
              <>
                <Link
                  mr={"4"}
                  as={RouterLink}
                  to={`/solution/edit/${solution.id}`}
                >
                  <MyButton
                    label={"Edit"}
                    size={"md"}
                    variant={"outline"}
                    light={"blue.700"}
                    dark={"blue.500"}
                  />
                </Link>

                <MyButton
                  label={"Delete"}
                  size={"md"}
                  variant={"outline"}
                  light={"red.700"}
                  dark={"red.500"}
                />
              </>
            ) : (
              ""
            )}
          </Box>
          <Divider />
          {/**this is where owner is shown */}
          <Box pt={8} pb={6} maxW={"2xl"}>
            <SolutionDetail solution={solution} />
          </Box>
          <Divider />
          {/**this is where current user is shown */}
          <Box pt={4}>
            <CommentForm
              user={currentUser}
              solution={solution}
              onSubmit={handleComment}
            />
          </Box>
          <Box pt={4} maxW={"3xl"}>
            <Comment comments={solution.comments} />
          </Box>
        </SimpleGrid>
      </Center>
    </>
  );
};
const mapStateToProps = (state, ownProps) => {
  return { solution: state.solutions[ownProps.match.params.id] };
};
export default connect(mapStateToProps, { getSolution, createComment })(
  Solution
);
