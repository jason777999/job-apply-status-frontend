export const convertTime = (dateString) => {
  const dateObject = new Date(dateString);
  return `${dateObject.getFullYear()}/${dateObject.getMonth()}/${dateObject.getDate()}`;
};

export const isValidUrl = (string) => {
  try {
    new URL(string);
    return true;
  } catch (err) {
    return false;
  }
};



