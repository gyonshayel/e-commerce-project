export function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}
