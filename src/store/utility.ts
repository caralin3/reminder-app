import actionCreatorFactory from 'typescript-fsa';
import { ApplicationState } from '.';

export const rehydrateAction = actionCreatorFactory()<ApplicationState>(
  'persist/REHYDRATE'
);
