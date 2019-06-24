export interface Person {
  afterSunset?: boolean;
  dob?: string;
  dod: string;
  hDob?: string;
  hDod: string;
  holidayReminder?: boolean;
  id: string;
  name: string;
  relationship?: string;
}

export interface Reminder {
  date: string;
  id: string;
  notificationId: number;
  personId: string;
}
