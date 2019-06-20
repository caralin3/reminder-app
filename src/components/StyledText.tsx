import React from 'react';
import { Text } from 'react-native';

export const MonoText: React.FC<any> = (props: any) => (
  <Text {...props} style={[props.style, { fontFamily: 'space-mono' }]} />
);
