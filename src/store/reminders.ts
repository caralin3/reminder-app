import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { rehydrateAction } from './utility';
import { Reminder } from '../types/models';

const NAME = 'REMINDER';
const RESET = 'RESET';
const ADD = 'ADD';
const EDIT = 'EDIT';
const REMOVE = 'REMOVE';

export interface RemindersState {
  response: Reminder[];
}

const initialState: RemindersState = {
  response: []
};

const actionCreator = actionCreatorFactory(NAME);

const resetAction = actionCreator(RESET);

export const reset = () => resetAction();

const addAction = actionCreator<{ person: Reminder }>(ADD);

export const add = (person: Reminder) => addAction({ person });

const editAction = actionCreator<{ person: Reminder }>(EDIT);

export const edit = (person: Reminder) => editAction({ person });

const removeAction = actionCreator<{ id: string }>(REMOVE);

export const remove = (id: string) => removeAction({ id });

export const reducer = reducerWithInitialState(initialState)
  .case(rehydrateAction, state => state)
  .case(resetAction, _ => ({ ...initialState }))
  .case(addAction, (state, { person }) => ({
    ...state,
    response: [...state.response, person]
  }))
  .case(editAction, (state, { person }) => ({
    ...state,
    response: [
      ...state.response.filter((p: Reminder) => p.id !== person.id),
      person
    ]
  }))
  .case(removeAction, (state, { id }) => ({
    ...state,
    response: state.response.filter((p: Reminder) => p.id !== id)
  }));
