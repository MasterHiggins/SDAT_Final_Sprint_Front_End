// Formats time to "HH:MM AM/PM" format
export const formatTime = (dateTime) => {
  return new Date(dateTime).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, // Ensures AM/PM format
  });
};

// Formats date to "MMM DD" format (e.g., "Mar 15")
export const formatDate = (dateTime) => {
  const date = new Date(dateTime);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

// Combined formatter for time display with date underneath
export const formatTimeWithDate = (dateTime) => {
  return {
    time: formatTime(dateTime),
    date: formatDate(dateTime),
  };
};
