import React from "react";
import {
  FormControl,
  Textarea,
  Stack,
  Text,
  Avatar,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";

import MyButton from "./MyButton";
const CommentForm = ({ user, solution, onSubmit }) => {
  const validateComment = (value) => {
    let error;
    if (!value) {
      error = "Please write something";
    }
    if (!user) {
      error = "You need to be logged in if you want to comment";
    }
    return error;
  };
  return (
    <>
      <Text m={2} mb={"8"} size={"xl"}>
        {solution.comments.length === 0
          ? "Be the first to comment"
          : `${solution.comments.length} Comments`}
      </Text>
      <Formik
        validateOnChange={true}
        initialValues={{ comment: "" }}
        validate={(values) => {
          let errors = {};
          if (validateComment(values.comment)) {
            errors.comment = validateComment(validateComment.comment);
          }
        }}
        onSubmit={(values, actions) => {
          actions.setSubmitting(true);
          actions.resetForm({ comment: "" });
          onSubmit(values);
        }}
      >
        {(props) => (
          <Form>
            <Stack direction={"row"}>
              <Avatar
                name={user ? user.userName : ""}
                src={user ? user.avatar : ""}
              />

              <Field name="comment" validate={validateComment}>
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.comment && form.touched.comment}
                  >
                    <Textarea
                      rows={1}
                      {...field}
                      variant="flushed"
                      id="comment"
                      placeholder="Leave a comment"
                    />
                    <FormErrorMessage>{form.errors.comment}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </Stack>

            {props.values.comment ? (
              <Stack direction={"row"} justifyContent={"flex-end"}>
                <MyButton
                  type={"submit"}
                  mt={4}
                  disabled={props.errors.comment}
                  label={"Submit"}
                  light={"purple.700"}
                  dark={"purple.500"}
                  size={"md"}
                />
              </Stack>
            ) : (
              ""
            )}
          </Form>
        )}
      </Formik>
    </>
  );
};

export default CommentForm;
