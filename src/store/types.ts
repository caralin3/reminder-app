import { PeopleState } from './people';
import { RemindersState } from './reminders';
import { SessionState } from './session';

export interface AsyncState<T> {
  response?: T;
  loading: boolean;
  error?: Error;
}

export interface ApplicationState {
  People: PeopleState;
  Reminders: RemindersState;
  Session: SessionState;
}

export interface SessionResponseState {
  pushToken: string;
}
