import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import { Platform, StatusBar, StyleSheet, View, YellowBox } from 'react-native';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import {
  Ionicons,
  FontAwesome,
  MaterialIcons,
  MaterialCommunityIcons
} from '@expo/vector-icons';
import AppNavigator from './src/navigation/AppNavigator';
import { ApplicationState, createStore } from './src/store';

YellowBox.ignoreWarnings([
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillReceiveProps is deprecated'
]);

const App = (props: any) => {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  const store: Store<ApplicationState> = createStore();

  const loadResourcesAsync = async () => {
    await Promise.all([
      Asset.loadAsync([
        require('./src/assets/images/robot-dev.png'),
        require('./src/assets/images/robot-prod.png')
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...FontAwesome.font,
        ...Ionicons.font,
        ...MaterialIcons.font,
        ...MaterialCommunityIcons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free to
        // remove this if you are not using it in your app
        'space-mono': require('./src/assets/fonts/SpaceMono-Regular.ttf')
      })
    ]);
  };

  const handleLoadingError = (error: Error) => {
    // In this case, you might want to report the error to your error reporting
    // service, for example Sentry
    console.warn(error);
  };

  const handleFinishLoading = (setLoadingComplete: (bool: boolean) => void) => {
    setLoadingComplete(true);
  };

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistStore(store)}>
          <AppLoading
            startAsync={loadResourcesAsync}
            onError={handleLoadingError}
            onFinish={() => handleFinishLoading(setLoadingComplete)}
          />
        </PersistGate>
      </Provider>
    );
  }

  return (
    <Provider store={store}>
      <PersistGate persistor={persistStore(store)}>
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <AppNavigator />
        </View>
      </PersistGate>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});

export default App;
