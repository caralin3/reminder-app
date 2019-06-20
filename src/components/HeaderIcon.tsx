import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

export interface HeaderIconProps {
  name: string;
}

export const HeaderIcon: React.FC<HeaderIconProps> = ({ name }) => (
  <MaterialIcons
    name={name}
    size={26}
    style={{ marginRight: 10 }}
    color={Colors.tabIconSelected}
  />
);
