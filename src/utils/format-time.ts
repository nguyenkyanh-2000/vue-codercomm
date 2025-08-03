import { format, getTime, formatDistanceToNow } from "date-fns";

export function fDate(date: string | Date) {
  return format(new Date(date), "dd MMMM yyyy");
}

export function fDateTime(date: string | Date) {
  return format(new Date(date), "dd MMM yyyy HH:mm");
}

export function fTimestamp(date: string | Date) {
  return getTime(new Date(date));
}

export function fDateTimeSuffix(date: string | Date) {
  return format(new Date(date), "dd/MM/yyyy hh:mm p");
}

/**
 * Formats a date as a relative time (e.g., "2 hours ago")
 * @param {string|Date} dateString - The date to format
 * @returns {string} Formatted relative time
 */
export function formatTimeAgo(dateString: string | Date) {
  return formatDistanceToNow(new Date(dateString), {
    addSuffix: true,
  });
}

// For backward compatibility
export function fToNow(date: string | Date) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
  });
}
