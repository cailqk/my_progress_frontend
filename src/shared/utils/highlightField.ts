import styles from "/App.module.css";

export const highlightField = (errors: string[], fieldName: string) => {
  
  const hasError =
    Array.from(errors).some((error: string) => error.includes(fieldName)) ||
    errors.includes(fieldName);

  return hasError ? styles.error : "";
};
