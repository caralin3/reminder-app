import { Person } from '../types';

export const mockPeople: Person[] = [
  {
    dob: '1946-08-20T04:00:00.000Z',
    dod: '2016-06-22T04:00:00.000Z',
    // hDob: '',
    hDod: 'Sivan 16, 5776',
    holidayReminder: true,
    id: '0',
    name: 'Dad',
    relationship: 'Father'
  },
  {
    dob: '1965-04-12T04:00:00.000Z',
    dod: '2013-08-05T04:00:00.000Z',
    // hDob: '',
    hDod: 'Iyar 23, 5774',
    holidayReminder: true,
    id: '1',
    name: 'John Doe'
    // relationship: ''
  },
  {
    // dob: '',
    dod: '2014-02-15T04:00:00.000Z',
    hDob: '',
    hDod: 'Sivan 16, 5778',
    // holidayReminder: true,
    id: '2',
    name: 'Jane Doe',
    relationship: ''
  }
];
