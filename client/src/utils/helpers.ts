export const timestampToString = (timestamp: number | string): string => {
  const dateString = typeof timestamp === "number" ? new Date(timestamp * 1000) : new Date(timestamp);

  function padTo2Digits(num: number) {
    return num.toString().padStart(2, "0");
  }

  function formatDate(date: Date) {
    return [date.getFullYear(), padTo2Digits(date.getMonth() + 1), padTo2Digits(date.getDate())].join("-");
  }

  function formatTime(date: Date) {
    return [padTo2Digits(date.getHours()), padTo2Digits(date.getMinutes()), padTo2Digits(date.getSeconds())].join(":");
  }

  const dateToExport = formatDate(dateString);
  const timeToExport = formatTime(dateString);

  const dateTimeString = `${dateToExport}, ${timeToExport}`;
  // console.log("dateTimeString:", dateTimeString);
  return dateTimeString;
};
