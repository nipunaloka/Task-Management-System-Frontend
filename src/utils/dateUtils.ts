import { format, formatDistance, isToday, isTomorrow, isYesterday, parseISO } from 'date-fns';

export const formatDate = (dateString: string): string => {
  const date = parseISO(dateString);
  return format(date, 'MMM dd, yyyy');
};

export const formatDateTime = (dateString: string): string => {
  const date = parseISO(dateString);
  return format(date, 'MMM dd, yyyy HH:mm');
};

export const formatRelativeDate = (dateString: string): string => {
  const date = parseISO(dateString);
  
  if (isToday(date)) {
    return `Today at ${format(date, 'HH:mm')}`;
  } else if (isTomorrow(date)) {
    return `Tomorrow at ${format(date, 'HH:mm')}`;
  } else if (isYesterday(date)) {
    return `Yesterday at ${format(date, 'HH:mm')}`;
  }
  
  return formatDistance(date, new Date(), { addSuffix: true });
};

export const formatDeadline = (dateString: string): string => {
  const date = parseISO(dateString);
  const now = new Date();
  
  // Check if deadline is past
  if (date < now) {
    return `Overdue by ${formatDistance(date, now)}`;
  }
  
  return `Due ${formatDistance(date, now, { addSuffix: true })}`;
};

export const getCurrentDateISOString = (): string => {
  return new Date().toISOString();
};