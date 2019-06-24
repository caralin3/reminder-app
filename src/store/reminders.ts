import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { asyncFactory } from 'typescript-fsa-redux-thunk';
import { Reminder } from '../types';
import { rehydrateAction } from './utility';
import { ApplicationState } from '.';
import { cancelScheduledNotification } from '../utility';
import { AsyncState } from './types';

const NAME = 'REMINDERS';
const RESET = 'RESET';
const ADD = 'ADD';
const EDIT = 'EDIT';
const REMOVE = 'REMOVE';

export interface RemindersState extends AsyncState<Reminder[]> { }

const initialState: RemindersState = {
  response: undefined,
  loading: false,
  error: undefined
};

const actionCreator = actionCreatorFactory(NAME);
const asyncActionCreator = asyncFactory<ApplicationState>(actionCreator);

const resetAction = actionCreator(RESET);

export const reset = () => resetAction();

const addAction = actionCreator<{ person: Reminder }>(ADD);

export const add = (person: Reminder) => addAction({ person });

const editAction = actionCreator<{ person: Reminder }>(EDIT);

export const edit = (person: Reminder) => editAction({ person });

const removeAction = asyncActionCreator<{ id: string }, Reminder[] | undefined>(
  REMOVE,
  async (params, _d, getState) => {
    const reminders = getState().Reminders.response;
    if (reminders && reminders.length > 0) {
      const [reminder] = reminders.filter(r => r.id === params.id);
      const notificationId = reminder.notificationId;
      await cancelScheduledNotification(notificationId);
      return reminders.filter((p: Reminder) => p.id !== params.id);
    }
    return undefined;
  }
);

export const remove = (id: string) => removeAction.action({ id });

export const reducer = reducerWithInitialState(initialState)
  .case(rehydrateAction, state => state)
  .case(resetAction, _ => ({ ...initialState }))
  .case(addAction, (state, { person }) => ({
    ...state,
    response: state.response ? [...state.response, person] : undefined
  }))
  .case(editAction, (state, { person }) => ({
    ...state,
    response: state.response
      ? [...state.response.filter((p: Reminder) => p.id !== person.id), person]
      : undefined
  }))
  .case(removeAction.async.started, state => ({
    response: state.response,
    loading: true,
    error: undefined
  }))
  .case(removeAction.async.done, (state, { result: response }) => ({
    response,
    loading: false,
    error: undefined
  }))
  .case(removeAction.async.failed, (state, { error }) => ({
    error,
    response: state.response,
    loading: false
  }));
