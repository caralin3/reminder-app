import moment from 'moment';
import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

export interface ListItemProps {
  item: any;
  onPress: () => void;
}

export const ListItem: React.FC<ListItemProps> = ({ item, onPress }) => (
  <TouchableHighlight
    style={styles.container}
    underlayColor={Colors.tabIconDefault}
    onPress={onPress}
  >
    <View style={styles.row}>
      <Text>{item.name}</Text>
      <View style={styles.row}>
        <Text>{moment(item.deathDate).format('MMM DD')}</Text>
        <Ionicons
          name="ios-arrow-forward"
          size={26}
          style={{ marginLeft: 10 }}
          color={Colors.tabIconSelected}
        />
      </View>
    </View>
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
