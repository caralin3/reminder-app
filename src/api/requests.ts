import {
  FetchMethod,
  GregorianDateRequestParams,
  HebrewDateRequestParams,
  HebrewMonths
} from './types';

const baseAPI = 'https://www.hebcal.com/converter/';

export const getQuerystring = (params: any) =>
  Object.keys(params)
    .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
    .join('&');

export const fetchHebrewDate = async (date: Date, gs: boolean) => {
  const method: FetchMethod = 'POST';
  console.log(gs);
  const queryParams: HebrewDateRequestParams = {
    gy: date.getFullYear(),
    gm: date.getMonth() + 1,
    gd: date.getDate(),
    cfg: 'json',
    g2h: 1
  };
  if (gs) {
    queryParams.gs = 'on';
  }
  console.log(queryParams);
  const query = getQuerystring(queryParams);
  const endpoint = `${baseAPI}?${query}`;
  return (await fetch(endpoint, { method })).json();
};

export const fetchGregorianDate = async (
  hy: number,
  hm: HebrewMonths,
  hd: number
) => {
  const method: FetchMethod = 'POST';
  const queryParams: GregorianDateRequestParams = {
    hy,
    hm,
    hd,
    cfg: 'json',
    h2g: 1
  };
  const query = getQuerystring(queryParams);
  const endpoint = `${baseAPI}?${query}`;
  return (await fetch(endpoint, { method })).json();
};
