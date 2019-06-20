import React from 'react';
import { Platform } from 'react-native';
import {
  createMaterialTopTabNavigator,
  createStackNavigator,
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
import Colors from '../constants/Colors';

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

export default createMaterialTopTabNavigator(
  {
    HomeStack,
    PeopleStack,
    SettingsStack
  },
  {
    swipeEnabled: true,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      showIcon: true,
      activeTintColor: Colors.tabIconSelected,
      inactiveTintColor: Colors.tabIconDefault,
      indicatorStyle: {
        backgroundColor: Colors.tabIconSelected
      },
      labelStyle: {
        fontSize: 12,
        margin: 0
      },
      upperCaseLabel: false,
      style: {
        backgroundColor: 'white'
      }
    }
  }
);
