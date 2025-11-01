import { addDays } from "./addDays";

export function getTrackingProgress(orderDate, deliveryDays) {
  const orderedDate = new Date(orderDate);
  const orderedTime = new Date(orderDate).getTime();
  const estimatedDeliveryDate = addDays(orderedDate, deliveryDays);
  const deliveryTime = estimatedDeliveryDate.getTime();

  const now = Date.now();

  // Calculate percentage of time passed
  const totalDuration = deliveryTime - orderedTime;
  const elapsed = Math.max(0, Math.min(now - orderedTime, totalDuration));

  const progress = Math.round((elapsed / totalDuration) * 100);

  let status = "Preparing";
  if (progress >= 67) status = "Delivered";
  else if (progress >= 34) status = "Shipped";

  return { progress, status };
}
