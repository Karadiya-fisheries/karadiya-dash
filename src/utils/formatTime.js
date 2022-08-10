import { format, formatDistanceToNow } from "date-fns";

// ----------------------------------------------------------------------

export function fDate(date) {
  try {
    return format(new Date(date), "dd MMMM yyyy");
  } catch (error) {
    console.log(error);
  }
}

export function fDateTime(date) {
  try {
    return format(new Date(date), "dd MMM yyyy HH:mm");
  } catch (error) {
    console.log(error);
  }
}

export function fDateTimeSuffix(date) {
  return format(new Date(date), "dd/MM/yyyy hh:mm p");
}

export function fToNow(date) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
  });
}
