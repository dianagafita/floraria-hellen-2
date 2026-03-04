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
  const hours = String(currentDate.getHours()).padStart(2, "0");
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

/** After this time (HH:MM), same-day delivery is no longer available; order is for next day. */
export const LATEST_SAME_DAY_ORDER = "19:00";

/** Delivery interval start times in order (each interval is 2h: 08-10, 10-12, ... 18-20). */
const INTERVAL_STARTS = ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00"];

/** Which interval index (0–5) the current time falls into. */
export function getCurrentIntervalIndex(timeStr) {
  const [h, m] = (timeStr || "00:00").split(":").map(Number);
  const mins = (h ?? 0) * 60 + (m ?? 0);
  for (let i = 0; i < INTERVAL_STARTS.length; i++) {
    const [sh, sm] = INTERVAL_STARTS[i].split(":").map(Number);
    const startMins = sh * 60 + sm;
    const endMins = i < INTERVAL_STARTS.length - 1 ? startMins + 120 : 24 * 60;
    if (mins >= startMins && mins < endMins) return i;
  }
  return INTERVAL_STARTS.length - 1;
}

/** Minimum interval start time for same-day: 1 interval ahead. When already in the last interval (18-20), that last interval is still available until 20:00. Returns null only when same-day not possible. */
export function getMinIntervalStartForSameDay(timeStr) {
  const idx = getCurrentIntervalIndex(timeStr);
  const oneAhead = idx + 1;
  if (oneAhead >= INTERVAL_STARTS.length) return INTERVAL_STARTS[INTERVAL_STARTS.length - 1];
  return INTERVAL_STARTS[oneAhead];
}
