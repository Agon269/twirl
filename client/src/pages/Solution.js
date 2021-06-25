import React, { useEffect, useContext } from "react";
import { connect } from "react-redux";
import { getSolution, createComment } from "../actions/index";
import { Box, Text, SimpleGrid, Divider, Link, Center } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { AuthContext } from "../Auth";
import CommentForm from "../components/CommentForm";
import Comment from "../components/Comment";
import SolutionDetail from "../components/SolutionDetail";
import MyButton from "../components/MyButton";
import DeleteModal from "../components/DeleteModal";
import { useToast } from "@chakra-ui/toast";
import Error from "../components/Error";
import Loading from "../components/Loading";

const Solution = ({ getSolution, solution, match, createComment, error }) => {
  const toast = useToast();

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
  if (error && !solution) {
    return <Error err={error} />;
  }
  if (!solution) {
    return <Loading />;
  }
  if (error) {
    toast({
      title: error.message,
      status: "error",
      duration: 2000,
      isClosable: true,
    });
  }
  const owner = currentUser?.id === solution.user.id;
  let problem = solution.problem;

  return (
    <Center>
      <Box p={8}>
        <SimpleGrid>
          <Box maxW={"3xl"} w={"full"} borderRadius={"lg"} overflow="hidden">
            <video width="800" height="240" controls src={solution.video} />
          </Box>
          <Box pt={2}>
            <Text fontSize={"3xl"} mb={4}>
              {problem.title}
            </Text>
            {owner ? (
              <>
                <Link
                  mr={"4"}
                  as={RouterLink}
                  to={`/solution/edit/${solution.id}`}
                  _hover={{
                    textDecoration: "none",
                    cursor: "pointer",
                  }}
                  _focus={{ outline: "none" }}
                >
                  <MyButton
                    label={"Edit"}
                    size={"md"}
                    light={"purple.700"}
                    dark={"purple.500"}
                  />
                </Link>

                <DeleteModal solutionId={solution.id} />
              </>
            ) : (
              ""
            )}
          </Box>
          <Divider mt={2} />
          {/**this is where owner is shown */}
          <Box pt={8} pb={6} maxW={"2xl"}>
            <SolutionDetail solution={solution} problem={problem} />
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
      </Box>
    </Center>
  );
};
const mapStateToProps = (state, ownProps) => {
  return {
    solution: state.solutions[ownProps.match.params.id],
    error: state.error,
  };
};
export default connect(mapStateToProps, {
  getSolution,
  createComment,
})(Solution);
