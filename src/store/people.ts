import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { asyncFactory } from 'typescript-fsa-redux-thunk';
import * as requests from '../api';
import { ApplicationState, AsyncState } from './types';
import { rehydrateAction } from './utility';
import { Person } from '../types/models';

const NAME = 'PERSON';
const RESET = 'RESET';
const LOAD = 'LOAD';

export interface PeopleState extends AsyncState<Person[]> {}

const initialState: PeopleState = {
  response: undefined,
  loading: false,
  error: undefined
};

const actionCreator = actionCreatorFactory(NAME);
// const asyncActionCreator = asyncFactory<ApplicationState>(actionCreator);

const resetAction = actionCreator(RESET);

export const reset = () => resetAction();

const loadAction = actionCreator(LOAD);

export const load = () => loadAction();

export const reducer = reducerWithInitialState(initialState)
  .case(rehydrateAction, state => state)
  .case(resetAction, _ => ({ ...initialState }));
