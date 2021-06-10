import {
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Textarea,
  Stack,
} from "@chakra-ui/react";
import MyButton from "./MyButton";

import { Field, Form, Formik } from "formik";
const streamForm = ({ onSubmit, initialValues, type }) => {
  const validateTitle = (value) => {
    let error;
    if (!value) {
      error = "Title required";
    }
    return error;
  };
  const validateDes = (value) => {
    let error;
    if (!value) {
      error = "Description is required";
    }
    return error;
  };
  const validateVideo = (value) => {
    let errors;

    if (!value) {
      errors = "Video is required";
      return errors;
    } else if (value.type !== "video/mp4") {
      errors = "Needs to be an mp4 video";
    }
    return errors;
  };
  return (
    <Formik
      validateOnChange={true}
      initialValues={{
        title: initialValues.title,
        description: initialValues.description,
        video: "",
      }}
      validate={(values) => {
        let errors = {};
        if (validateTitle(values.title)) {
          errors.title = validateTitle(values.title);
        }

        if (validateDes(values.description)) {
          errors.description = validateDes(values.description);
        }
        if (validateVideo(values.video)) {
          if (type === "create") {
            errors.video = validateVideo(values.video);
          }
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
          <Field name="title">
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.title && form.touched.title}>
                <FormLabel htmlFor="title">Title</FormLabel>
                <Input {...field} id="title" placeholder="title" />
                <FormErrorMessage>{form.errors.title}</FormErrorMessage>
              </FormControl>
            )}
          </Field>

          <Field name="description">
            {({ field, form }) => (
              <FormControl
                isInvalid={form.errors.description && form.touched.description}
              >
                <FormLabel htmlFor="des">Description</FormLabel>
                <Textarea
                  {...field}
                  id="description"
                  placeholder="description"
                />
                <FormErrorMessage>{form.errors.description}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          {type === "create" ? (
            <Field name="video">
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.video && form.touched.video}
                >
                  <FormLabel htmlFor="video">Video</FormLabel>
                  <Input
                    p={"10"}
                    type="file"
                    id="video"
                    onClick={() =>
                      form.setTouched({ ...form.touched, [field.name]: true })
                    }
                    placeholder="video"
                    name="video"
                    onChange={(event) => {
                      props.setFieldValue(
                        "video",
                        event.currentTarget.files[0]
                      );
                    }}
                  />
                  <FormErrorMessage>{form.errors.video}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
          ) : (
            ""
          )}

          <FormControl>
            <Stack spacing={10}>
              <MyButton
                label={"Submit"}
                size={"md"}
                variant={"outline"}
                light={"blue.700"}
                dark={"blue.500"}
                type={"submit"}
                mt={"4"}
                disabled={props.isSubmitting === true ? true : false}
                loading={props.isSubmitting === true ? true : false}
                loadingText="Uploading"
              />
            </Stack>
          </FormControl>
        </Form>
      )}
    </Formik>
  );
};

export default streamForm;
