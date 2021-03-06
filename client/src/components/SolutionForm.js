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
import { validateDes, validateVideo } from "./validate";
const SolutionForm = ({ onSubmit, initialValues, type }) => {
  return (
    <Formik
      validateOnChange={true}
      initialValues={{
        description: initialValues.description,
        video: "",
      }}
      onSubmit={(values, actions) => {
        actions.setSubmitting(true);
        onSubmit(values);
      }}
    >
      {(props) => (
        <Form>
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
                light={"purple.700"}
                dark={"purple.500"}
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

export default SolutionForm;
