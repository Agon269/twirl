import React from "react";
import { Avatar, Stack, Text, Link, Flex } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import uuid from "react-uuid";

import TruncatedText from "./TrunckatedText";
const Comment = ({ comments }) => {
  const showComments = comments.reverse().map((comment) => {
    return (
      <Stack direction={"row"} mt={"14"} key={uuid()}>
        <Link
          as={RouterLink}
          _hover={{
            textDecoration: "none",
            cursor: "pointer",
          }}
          _focus={{ outline: "none" }}
          to={`/user/${comment.userId}`}
        >
          <Avatar src={comment.userAvatar} mr={2} />
        </Link>
        <Flex direction={"column"}>
          <div style={{ width: "fit-content" }}>
            <Link
              as={RouterLink}
              _hover={{
                textDecoration: "none",
                cursor: "pointer",
              }}
              _focus={{ outline: "none" }}
              to={`/user/${comment.userId}`}
            >
              <Text
                w={"min-content"}
                fontSize={"sm"}
                m={"0"}
                color={"gray.500"}
              >
                {comment.userName}
              </Text>
            </Link>
          </div>

          <p>
            {comment.comment.length > 50 ? (
              <TruncatedText longText={comment.comment} lines={3} />
            ) : (
              comment.comment
            )}
          </p>
        </Flex>
      </Stack>
    );
  });
  return showComments;
};
export default Comment;
