export const timestampToString = (timestamp: number): string => {
  const dateString = new Date(timestamp * 1000).toISOString().replace("T", ", ");
  const dateArray = dateString.split(".");
  const dateToReturn = dateArray[0];
  return dateToReturn;
};