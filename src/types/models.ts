export interface Person {
  afterSunset?: boolean;
  bio?: string;
  dateType: 'hebrew' | 'gregorian';
  dob: Date;
  dod: Date;
  hebrewDate: string;
  id: string;
  name: string;
  relationship?: string;
}

export interface Reminder {
  date: Date;
  holidays: boolean;
  personId: string;
}
