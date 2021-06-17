import {
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Textarea,
  Stack,
  Select,
} from "@chakra-ui/react";
import MyButton from "./MyButton";

import { Field, Form, Formik } from "formik";
import {
  validateTitle,
  validateDes,
  validateVideo,
  validateCat,
} from "./validate";
const streamForm = ({ onSubmit, initialValues, type }) => {
  return (
    <Formik
      validateOnChange={true}
      initialValues={{
        title: initialValues.title,
        description: initialValues.description,
        category: initialValues.category,
        video: "",
      }}
      onSubmit={(values, actions) => {
        actions.setSubmitting(true);
        onSubmit(values);
      }}
    >
      {(props) => (
        <Form>
          <Field name="title" validate={validateTitle}>
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.title && form.touched.title}>
                <FormLabel htmlFor="title">Title</FormLabel>
                <Input {...field} id="title" placeholder="title" />
                <FormErrorMessage>{form.errors.title}</FormErrorMessage>
              </FormControl>
            )}
          </Field>

          <Field name="description" validate={validateDes}>
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

          <Field name="category" validate={validateCat}>
            {({ field, form }) => (
              <FormControl
                isInvalid={form.errors.category && form.touched.category}
              >
                <FormLabel htmlFor="category">Category</FormLabel>
                <Select
                  name="category"
                  placeholder="Category"
                  id="category"
                  {...field}
                >
                  <option value="js">Javascript</option>
                  <option value="java">java</option>
                  <option value="py">Python</option>
                  <option value="cpp">C ++</option>
                </Select>
                <FormErrorMessage>{form.errors.category}</FormErrorMessage>
              </FormControl>
            )}
          </Field>

          {type === "create" ? (
            <Field name="video" validate={validateVideo}>
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.video && form.touched.video}
                >
                  <FormLabel htmlFor="video">Video</FormLabel>
                  <Input
                    p={"12"}
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
