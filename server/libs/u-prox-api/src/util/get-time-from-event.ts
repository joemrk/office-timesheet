export const convertEventTime = (eventTime): number =>
  parseInt(eventTime.replace('/Date(', '').replace(')/', ''));
