import { PeopleState } from './people';

export interface AsyncState<T> {
  response?: T;
  loading: boolean;
  error?: Error;
}

export interface ApplicationState {
  People: PeopleState;
}
