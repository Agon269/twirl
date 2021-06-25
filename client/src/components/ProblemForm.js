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
import { validateTitle, validateDes, validateCat } from "./validate";
const ProblemForm = ({ onSubmit, initialValues }) => {
  return (
    <Formik
      validateOnChange={true}
      initialValues={{
        title: initialValues.title,
        description: initialValues.description,
        category: initialValues.category,
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
                  rows={6}
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
                  <option value="C++">C++</option>
                  <option value="C">C</option>
                  <option value="java">java</option>
                  <option value="Javascript">Javascript</option>
                  <option value="Python">Python</option>
                  <option value="any">Any</option>
                </Select>
                <FormErrorMessage>{form.errors.category}</FormErrorMessage>
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
                mt={"6"}
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

export default ProblemForm;
