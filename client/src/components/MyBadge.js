import React from "react";
import { Badge } from "@chakra-ui/react";

const MyBadge = ({ category }) => {
  let color;
  if (category === "Javascript") {
    color = "yellow";
  } else if (category === "java") {
    color = "orange";
  } else if (category === "Python") {
    color = "blue";
  } else if (category === "C++") {
    color = "teal";
  } else if (category === "C") {
    color = "yellow";
  } else if (category === "any") {
    color = "green";
  } else {
    color = "gray";
  }
  return <Badge colorScheme={color}>{category}</Badge>;
};

export default MyBadge;
