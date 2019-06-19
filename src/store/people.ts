import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { rehydrateAction } from './utility';
import { Person } from '../types/models';

const NAME = 'PERSON';
const RESET = 'RESET';
const ADD = 'ADD';
const EDIT = 'EDIT';
const REMOVE = 'REMOVE';

export interface PeopleState {
  response: Person[];
}

const initialState: PeopleState = {
  response: []
};

const actionCreator = actionCreatorFactory(NAME);

const resetAction = actionCreator(RESET);

export const reset = () => resetAction();

const addAction = actionCreator<{ person: Person }>(ADD);

export const add = (person: Person) => addAction({ person });

const editAction = actionCreator<{ person: Person }>(EDIT);

export const edit = (person: Person) => editAction({ person });

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
      ...state.response.filter((p: Person) => p.id !== person.id),
      person
    ]
  }))
  .case(removeAction, (state, { id }) => ({
    ...state,
    response: state.response.filter((p: Person) => p.id !== id)
  }));
