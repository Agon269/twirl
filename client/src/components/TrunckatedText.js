import React, { useState } from "react";
import Truncate from "react-truncate";
import { Badge } from "@chakra-ui/react";
const TruncatedText = ({ longText, lines }) => {
  const [expand, setExpanded] = useState(false);
  const [trunk, setTrunk] = useState(false);

  const toggleLines = (e) => {
    e.preventDefault();
    setExpanded((prev) => !prev);
  };
  const handleTruncate = (truncated) => {
    setTrunk(truncated);
  };
  return (
    <>
      <Truncate
        lines={!expand && lines}
        ellipsis={
          <Badge ml={"3"} onClick={toggleLines} _hover={{ cursor: "pointer" }}>
            SHOW MORE
          </Badge>
        }
        onTruncate={handleTruncate}
      >
        {longText}
      </Truncate>
      {!trunk && expand && (
        <Badge ml={"3"} onClick={toggleLines} _hover={{ cursor: "pointer" }}>
          SHOW LESS
        </Badge>
      )}
    </>
  );
};

export default TruncatedText;
