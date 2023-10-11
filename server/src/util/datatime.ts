import * as dayjs from 'dayjs';

export const getStartOfDay = () => dayjs().startOf('day').toDate().getTime();
