import React from 'react';
import { Text, View } from 'react-native';
// import { ExpoConfigView } from '@expo/samples';

export const SettingsScreen = () => {
  /**
   * Go ahead and delete ExpoConfigView and replace it with your content;
   * we just wanted to give you a quick view of your config.
   */
  return (
    <View>
      <Text>Settings</Text>
    </View>
  );
};

SettingsScreen.navigationOptions = {
  title: 'app.json'
};
