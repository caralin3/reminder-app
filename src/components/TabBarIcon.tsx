import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

export interface TabBarIconProps {
  name: string;
  focused: boolean;
}

export const TabBarIcon: React.FC<TabBarIconProps> = (
  props: TabBarIconProps
) => (
  <Ionicons
    name={props.name}
    size={26}
    style={{ marginBottom: -3 }}
    color={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
  />
);
