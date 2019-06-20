import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
  TabBarIconProps
} from 'react-navigation';
import { TabBarIcon } from '../components';
import {
  AddPersonScreen,
  HomeScreen,
  PeopleScreen,
  ProfileScreen,
  SettingsScreen
} from '../screens';

const HomeStack = createStackNavigator({
  Home: HomeScreen
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: (props: TabBarIconProps) => (
    <TabBarIcon
      focused={props.focused}
      name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'}
    />
  )
};

const PeopleStack = createStackNavigator({
  People: PeopleScreen,
  AddPerson: AddPersonScreen,
  Profile: ProfileScreen
});

PeopleStack.navigationOptions = {
  tabBarLabel: 'People',
  tabBarIcon: (props: TabBarIconProps) => (
    <TabBarIcon
      focused={props.focused}
      name={Platform.OS === 'ios' ? 'ios-people' : 'md-people'}
    />
  )
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: (props: TabBarIconProps) => (
    <TabBarIcon
      focused={props.focused}
      name={Platform.OS === 'ios' ? 'ios-settings' : 'md-settings'}
    />
  )
};

export default createBottomTabNavigator({
  HomeStack,
  PeopleStack,
  SettingsStack
});
