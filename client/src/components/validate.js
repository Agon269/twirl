export const validateTitle = (value) => {
  let error;
  if (!value) {
    error = "Title required";
  }
  return error;
};
export const validateDes = (value) => {
  let error;
  if (!value) {
    error = "Description is required";
  }
  return error;
};
export const validateVideo = (value) => {
  let errors;

  if (!value) {
    errors = "Video is required";
    return errors;
  } else if (value.type !== "video/mp4") {
    errors = "Needs to be an mp4 video";
  }
  return errors;
};

export const validateCat = (value) => {
  let errors;
  if (!value) {
    errors = "Category is required";
  }
  return errors;
};
