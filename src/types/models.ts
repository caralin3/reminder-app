export interface Person {
  afterSunset?: boolean;
  dateType: 'hebrew' | 'gregorian';
  deathDate: Date;
  id: string;
  name: string;
}

export interface Reminder {
  date: Date;
  holidays: Date[];
  personId: string;
  alertOn: number;
}
