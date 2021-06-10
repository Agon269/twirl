import React from "react";
import { Avatar, Stack, Text, Link } from "@chakra-ui/react";
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
        <Stack>
          <Link
            as={RouterLink}
            _hover={{
              textDecoration: "none",
              cursor: "pointer",
            }}
            _focus={{ outline: "none" }}
            to={`/user/${comment.userId}`}
          >
            <Text fontSize={"sm"} mb={"-2"} color={"gray.600"}>
              {comment.userName}
            </Text>
          </Link>

          <Text mt={-14}>
            {comment.comment.length > 50 ? (
              <TruncatedText longText={comment.comment} lines={3} />
            ) : (
              comment.comment
            )}
          </Text>
        </Stack>
      </Stack>
    );
  });
  return showComments;
};
export default Comment;
