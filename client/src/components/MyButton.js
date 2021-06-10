import React from "react";
import { Button, useColorModeValue } from "@chakra-ui/react";
import { withRouter } from "react-router-dom";

const MyButton = ({
  label,
  size,
  light,
  dark,
  mt,
  type,
  loading,
  loadingText,
  disabled,
}) => {
  return (
    <Button
      bg={useColorModeValue(light, dark)}
      color={useColorModeValue("white", "white")}
      _hover={{
        backgroundColor: { dark },
      }}
      mt={mt}
      type={type}
      isLoading={loading}
      loadingText={loadingText}
      size={size}
      disabled={disabled}
    >
      {label}
    </Button>
  );
};
export default withRouter(MyButton);
