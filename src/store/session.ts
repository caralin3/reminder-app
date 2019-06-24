import { Notifications } from 'expo';
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { asyncFactory } from 'typescript-fsa-redux-thunk';
import { ApplicationState, AsyncState, SessionResponseState } from './types';
import { rehydrateAction } from './utility';

const NAME = 'SESSION';
const RESET = 'RESET';
const SET_PUSH_TOKEN = 'SET_PUSH_TOKEN';

export interface SessionState extends AsyncState<SessionResponseState> {}

const initialState: SessionState = {
  response: undefined,
  loading: false,
  error: undefined
};

const actionCreator = actionCreatorFactory(NAME);
const asyncActionCreator = asyncFactory<ApplicationState>(actionCreator);

const resetAction = actionCreator(RESET);

export const reset = () => resetAction();

const setPushTokenAction = asyncActionCreator<{}, string>(
  SET_PUSH_TOKEN,
  async () => await Notifications.getExpoPushTokenAsync()
);

export const setPushToken = () => setPushTokenAction.action();

export const reducer = reducerWithInitialState(initialState)
  .case(rehydrateAction, state => state)
  .case(resetAction, _ => ({ ...initialState }))
  .case(setPushTokenAction.async.started, state => ({
    response: state.response,
    loading: true,
    error: undefined
  }))
  .case(setPushTokenAction.async.done, (state, { result: pushToken }) => ({
    response: {
      ...state.response,
      pushToken
    },
    loading: false,
    error: undefined
  }))
  .case(setPushTokenAction.async.failed, (state, { error }) => ({
    error,
    response: state.response,
    loading: false
  }));
