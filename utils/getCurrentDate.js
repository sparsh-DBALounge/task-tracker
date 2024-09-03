export const getCurrentDate = () => {
  const date = new Date().getDate();
  const month = new Date().getMonth();
  const year = new Date().getFullYear();

  return `${date}/${month}/${year}`;
};
