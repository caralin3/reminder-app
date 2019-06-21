import { PeopleState } from './people';
import { RemindersState } from './reminders';

export interface AsyncState<T> {
  response?: T;
  loading: boolean;
  error?: Error;
}

export interface ApplicationState {
  People: PeopleState;
  Reminders: RemindersState;
}
