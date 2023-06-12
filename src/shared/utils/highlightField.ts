export const highlightField = (errors: string[], fieldName: string) => {

  if (
    Array.from(errors).some((error: string) => error.includes(fieldName)) ||
    errors.includes(fieldName)
  ) {

    return "invalid-input";

  } else {
    
    return "";
  }
};
