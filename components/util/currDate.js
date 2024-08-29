// export function getCurrentDate() {
//   const currentDate = new Date();
//   const year = currentDate.getFullYear();
//   const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
//   const day = String(currentDate.getDate() + 1).padStart(2, "0");
//   const today = `${year}-${month}-${day}`;
//   return today;
// }
export function getCurrentDate() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const day = String(currentDate.getDate()).padStart(2, "0");
  const hours = currentDate.getHours();
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");
  const today = `${year}-${month}-${day}`;
  const time = `${hours}:${minutes}`;
  return { today, time };
}

export function getNextDay() {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 1);
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const day = String(currentDate.getDate()).padStart(2, "0");
  const nextDay = `${year}-${month}-${day}`;
  return nextDay;
}

export function getDateForOffer() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const day = String(currentDate.getDate() + 7).padStart(2, "0");
  const today = `${year}-${month}-${day}`;
  return today;
}
