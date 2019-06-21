import moment from 'moment';
import { DatePickerAndroid, TimePickerAndroid } from 'react-native';

export const getYearsSince = (date: string, round?: boolean) =>
  Math.ceil(moment().diff(new Date(date), 'years', round));

export const renderAndroidDatePicker = async (
  callback: (date: string) => void
) => {
  try {
    const res = await DatePickerAndroid.open({
      date: new Date(),
      mode: 'spinner'
    });
    if (res.action !== DatePickerAndroid.dismissedAction) {
      const { year, month, day } = res;
      const date = new Date(year, month, day);
      await callback(date.toISOString());
    }
  } catch ({ code, message }) {
    console.warn('Cannot open date picker', message);
  }
};

export const renderAndroidTimePicker = async (
  d: string,
  callback: (date: string) => void
) => {
  try {
    const res = await TimePickerAndroid.open({
      hour: new Date().getHours(),
      minute: new Date().getMinutes(),
      is24Hour: false,
      mode: 'spinner'
    });
    if (res.action !== TimePickerAndroid.dismissedAction) {
      const { hour, minute } = res;
      const date = new Date(d);
      date.setHours(hour);
      date.setMinutes(minute);
      callback(date.toISOString());
    }
  } catch ({ code, message }) {
    console.warn('Cannot open time picker', message);
  }
};
