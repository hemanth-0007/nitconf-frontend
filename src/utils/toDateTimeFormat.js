const toDateTimeFormat = (date) => {
  const dateTime = new Date(date);
  const year = dateTime.getFullYear();
  const month = dateTime.getMonth() + 1;
  const day = dateTime.getDate();
  const hours = dateTime.getHours();
  const minutes = dateTime.getMinutes();
  const seconds = dateTime.getSeconds();
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export default toDateTimeFormat;
