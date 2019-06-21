import moment from 'moment';
import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import { Person, Reminder } from '../types';

export interface ReminderListItemProps {
  item: Reminder;
  onPress: () => void;
  person?: Person;
}

export const ReminderListItem: React.FC<ReminderListItemProps> = ({
  item,
  onPress,
  person
}) => (
  <TouchableHighlight
    style={styles.container}
    underlayColor={Colors.tabIconDefault}
    onPress={onPress}
  >
    {person && (
      <View style={styles.row}>
        <Text>{person.name}</Text>
        <View style={styles.row}>
          <Text>{moment(item.date).format('MMM DD')}</Text>
          {/* Toggle */}
        </View>
      </View>
    )}
  </TouchableHighlight>
);

const styles = StyleSheet.create({
  container: {
    borderTopColor: Colors.tabIconDefault,
    borderTopWidth: 1,
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});
