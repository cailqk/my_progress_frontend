export const dateParser = (date: Date) => {
  const year = new Date(date).getFullYear();
  let month: string | number = new Date(date).getMonth() + 1;
  let day: string | number = new Date(date).getDate();

  if (month < 10) {
    month = "0" + month.toString();
  }

  if (day < 10) {
    day = "0" + day.toString();
  }

  const final = `${year}-${month}-${day}`;
  return final;
};

export const maxDate = () => {
  const date = new Date();
  return date.setFullYear(date.getFullYear() - 4);
};

export const minDate = new Date(1926, 0, 1);
