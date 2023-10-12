import * as dayjs from 'dayjs';

const getStartOf = (v) => dayjs().startOf(v).toDate().getTime();

export const getStartOfDay = () => getStartOf('day');

export const getStartOfMonth = () => getStartOf('month');

export const getDaysOfCurrentMonth = () => dayjs().daysInMonth();
