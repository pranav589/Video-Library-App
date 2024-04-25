export function userLoginValidation(email, password) {
  if (!validateEmail(email)) {
    return "Invalid Email";
  }

  if (password?.length < 6) {
    return "Password must be at least 6 characters long.";
  }
}

export function userRegisterValidation(name, email, password, confirmPassword) {
  console.log({ name, email, password, confirmPassword });
  if (!name || !email || !password) {
    return "Please enter all the fields";
  }

  userLoginValidation(email, password);
  if (password !== confirmPassword) {
    return "Passwords did not match.";
  }
}

function validateEmail(email) {
  const isValid =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return isValid.test(email);
}

export const videoUploadValidation = (
  imagePreview,
  videoPreview,
  title,
  description,
  privacy,
  category
) => {
  if (!imagePreview || !videoPreview || !title || !description) {
    return "Please enter all required fields";
  }

  if (title.length < 4) {
    return "Title should be atleast 4 characters long";
  }

  if (description.length < 20) {
    return "Description should be atleast 20 characters long.";
  }
};
