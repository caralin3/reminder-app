export interface Person {
  afterSunset?: boolean;
  dateType: 'hebrew' | 'gregorian';
  deathDate: Date;
  hebrewDate: string;
  id: string;
  name: string;
}

export interface Reminder {
  date: Date;
  holidays: boolean;
  personId: string;
}
