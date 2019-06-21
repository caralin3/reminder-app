import {
  NavigationParams,
  NavigationRoute,
  NavigationScreenProp
} from 'react-navigation';

export interface NavigationOptionsProps {
  navigation: NavigationScreenProp<
    NavigationRoute<NavigationParams>,
    NavigationParams
  >;
}
