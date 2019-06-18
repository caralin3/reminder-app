export type FetchMethod = 'GET' | 'POST';

export type HebrewMonths =
  | 'Nisan'
  | 'Iyar'
  | 'Sivan'
  | 'Tammuz'
  | 'Av'
  | 'Elul'
  | 'Tishrei'
  | 'Cheshvan'
  | 'Marcheshvan'
  | 'Kislev'
  | 'Tevet'
  | 'Shevat'
  | 'Adar';

export interface HebrewDateRequestParams {
  cfg: 'json' | 'xml'; // Output
  gy: number; // Gregorian year
  gm: number; // Gregorian month
  gd: number; // Gregorian day
  gs?: 'on'; // After sunset
  g2h?: number; // Gregorian to Hebrew (1)
}

export interface GregorianDateRequestParams {
  cfg: 'json' | 'xml'; // Output
  hy: number; // Hebrew year
  hm: HebrewMonths; // Hebrew month
  hd: number; // Hebrew day
  h2g?: number; // Hebrew to Gregorian (1)
}

// https://www.hebcal.com/home/219/hebrew-date-converter-rest-api
export interface ConverterResponse {
  gy: number; // Gregorian year
  gm: number; // Gregorian month
  gd: number; // Gregorian day
  hy: number; // Hebrew year
  hm: string; // Hebrew month
  hd: number; // Hebrew day
  hebrew: string; // Date in Hebrew
  events: string[];
}
