import { applyMiddleware, createStore, compose, Store } from 'redux';
import { composeWithDevTools } from 'remote-redux-devtools';
import { persistCombineReducers } from 'redux-persist';
import thunk from 'redux-thunk';
import { AsyncStorage } from 'react-native';
import * as people from './people';
import * as reminders from './reminders';
import * as session from './session';
import { ApplicationState } from '.';

declare const window: any;

export default (): Store<ApplicationState> => {
  const composeEnhancers = __DEV__
    ? // tslint:disable-next-line no-any no-string-literal
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||
      composeWithDevTools({ realtime: true })
    : compose;

  const middleware = composeEnhancers(applyMiddleware(thunk));

  const persistConfig = {
    storage: AsyncStorage,
    key: 'primary'
  };

  const rootReducer = persistCombineReducers<ApplicationState>(persistConfig, {
    People: people.reducer,
    Reminders: reminders.reducer,
    Session: session.reducer
  });

  return createStore(rootReducer, undefined, middleware);
};
