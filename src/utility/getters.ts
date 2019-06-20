import moment from 'moment';

export const getYearsSince = (date: string, round?: boolean) =>
  Math.ceil(moment().diff(new Date(date), 'years', round));
