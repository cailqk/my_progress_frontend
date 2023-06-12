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

export const maxDate = (date: Date, years: number) => {
  date.setFullYear(date.getFullYear() - years);
  return date;
};
