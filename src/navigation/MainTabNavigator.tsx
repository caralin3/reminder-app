import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
  TabBarIconProps
} from 'react-navigation';

import { TabBarIcon } from '../components/TabBarIcon';
import { HomeScreen } from '../screens/HomeScreen';
import { PeopleScreen } from '../screens/PeopleScreen';
import { SettingsScreen } from '../screens/SettingsScreen';

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

const LinksStack = createStackNavigator({
  Links: PeopleScreen
});

LinksStack.navigationOptions = {
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
  LinksStack,
  SettingsStack
});
