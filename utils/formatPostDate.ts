import {
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
  isToday,
  isYesterday,
  format,
} from "date-fns";

export function formatPostDate(createdAt: string) {
  const now = new Date();
  const minutesAgo = differenceInMinutes(now, createdAt);
  const hoursAgo = differenceInHours(now, createdAt);
  const daysAgo = differenceInDays(now, createdAt);

  if (minutesAgo < 1) {
    return "Just now";
  } else if (minutesAgo < 60) {
    return `${minutesAgo} minute${minutesAgo === 1 ? "" : "s"} ago`;
  } else if (hoursAgo < 1) {
    return "In the past hour";
  } else if (isToday(createdAt)) {
    return `${hoursAgo} hour${hoursAgo === 1 ? "" : "s"} ago`;
  } else if (isYesterday(createdAt)) {
    return "Yesterday";
  } else if (daysAgo < 3) {
    return `${daysAgo} day${daysAgo === 1 ? "" : "s"} ago`;
  } else {
    return format(new Date(createdAt), "MMM dd, yyyy");
  }
}
