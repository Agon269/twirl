import React from "react";
import {
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Stack,
  InputGroup,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import MyButton from "./MyButton";
import { Field, Form, Formik } from "formik";

const AuthForm = ({ onSubmit }) => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const validateUserName = (value) => {
    let error;
    if (!value) {
      error = "Username is required";
    }
    return error;
  };
  const validatePassword = (value) => {
    let error;
    if (!value) {
      error = "Password is required";
    }
    if (value.length < 6) {
      error = "Password length needs to be at least 6 characters.";
    }
    return error;
  };

  return (
    <Formik
      validateOnChange={true}
      initialValues={{ userName: "", password: "" }}
      validate={(values) => {
        let errors = {};
        if (validateUserName(values.userName)) {
          errors.userName = validateUserName(values.userName);
        }

        if (validatePassword(values.password)) {
          errors.password = validatePassword(values.password);
        }
        return errors;
      }}
      onSubmit={(values, actions) => {
        actions.setSubmitting(true);
        onSubmit(values);
      }}
    >
      {(props) => (
        <Form>
          <Field name="userName">
            {({ field, form }) => (
              <FormControl
                isInvalid={form.errors.userName && form.touched.userName}
              >
                <FormLabel htmlFor="userName">UserName</FormLabel>
                <Input {...field} id="userName" placeholder="UserName" />
                <FormErrorMessage>{form.errors.userName}</FormErrorMessage>
              </FormControl>
            )}
          </Field>

          <Field name="password">
            {({ field, form }) => (
              <FormControl
                isInvalid={form.errors.password && form.touched.password}
              >
                <FormLabel htmlFor="des">Password</FormLabel>
                <InputGroup size="md">
                  <Input
                    {...field}
                    id="password"
                    pr="4.5rem"
                    type={show ? "text" : "password"}
                    placeholder="Enter password"
                    autoComplete={"false"}
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      onClick={handleClick}
                      color={"blue.700"}
                      _focus={{ outline: "none" }}
                    >
                      {show ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{form.errors.password}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <FormControl>
            <Stack spacing={10}>
              <MyButton
                label={"Submit"}
                size={"md"}
                variant={"outline"}
                light={"purple.700"}
                dark={"purple.500"}
                type={"submit"}
                disabled={props.isSubmitting === true ? true : false}
                loading={props.isSubmitting === true ? true : false}
                mt={"4"}
              />
            </Stack>
          </FormControl>
        </Form>
      )}
    </Formik>
  );
};

export default AuthForm;
