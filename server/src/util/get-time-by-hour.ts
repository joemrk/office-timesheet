export const getTimeByHour = (hour: number): number =>
  new Date().setHours(hour, 0, 0);
