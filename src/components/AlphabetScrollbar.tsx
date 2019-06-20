import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  PanResponder,
  View
} from 'react-native';

export interface AlphabetScrollbarProps {}

export const AlphabetScrollbar: React.FC<AlphabetScrollbarProps> = () => {
  const [currPos, setCurrPos] = React.useState(4);
  const [listY, setListY] = React.useState(0);
  const [itemHeight, setItemHeight] = React.useState(0);

  const alphabet = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z'
  ];

  const panResponder = PanResponder.create({
    // Ask to be the responder:
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
    onMoveShouldSetPanResponder: (evt, gestureState) => true,
    onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

    onPanResponderGrant: (evt, gestureState) => {
      // The gesture has started. Show visual feedback so the user knows
      // what is happening!
      // gestureState.d{x,y} will be set to zero now
    },
    onPanResponderMove: (evt, gestureState) => {
      // The most recent move distance is gestureState.move{X,Y}
      // The accumulated gesture distance since becoming responder is
      // gestureState.d{x,y}
      const offset = 200;
      const pos = evt.nativeEvent.pageY - offset;
      setCurrPos(pos);
    },
    onPanResponderTerminationRequest: (evt, gestureState) => true,
    onPanResponderRelease: (evt, gestureState) => {
      // The user has released all touches while this view is the
      // responder. This typically means a gesture has succeeded
      const offset = 200;
      const pos = evt.nativeEvent.pageY - offset;
      setCurrPos(pos);
    },
    onPanResponderTerminate: (evt, gestureState) => {
      // Another component has become the responder, so this gesture
      // should be cancelled
    },
    onShouldBlockNativeResponder: (evt, gestureState) => {
      // Returns whether this component should block native components from becoming the JS
      // responder. Returns true by default. Is currently only supported on android.
      return true;
    }
  });

  return (
    <View style={styles.container}>
      <FlatList
        {...panResponder.panHandlers}
        contentContainerStyle={styles.content}
        data={alphabet}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <TouchableWithoutFeedback
            onLayout={e => setItemHeight(e.nativeEvent.layout.height)}
          >
            <Text style={styles.text}>{item}</Text>
          </TouchableWithoutFeedback>
        )}
        showsVerticalScrollIndicator={false}
      />
      <View style={[styles.highlight, { translateY: currPos }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexGrow: 0,
    flexShrink: 1,
    position: 'relative'
  },
  content: {
    alignItems: 'center',
    borderColor: Colors.tintColor,
    borderRadius: 15,
    borderWidth: 1,
    padding: 5
  },
  text: {
    fontSize: 11.5
  },
  highlight: {
    backgroundColor: Colors.tabIconDefault,
    borderRadius: 50,
    // height: 15,
    padding: 10,
    position: 'absolute',
    // width: 15,
    zIndex: -1
  }
});
