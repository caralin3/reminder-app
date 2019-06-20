import React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import { isIos } from '../constants/System';

export interface SearchBarProps {
  onChangeText: (text: string) => void;
  onFilter: () => void;
  onSort: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onChangeText,
  onFilter,
  onSort
}) => (
  <View style={styles.container}>
    <TextInput
      style={styles.input}
      placeholder="Search"
      onChangeText={onChangeText}
    />
    <TouchableOpacity onPress={onFilter}>
      {/* TODO: Filter By Month, By Letter */}
      <FontAwesome
        name="filter"
        size={26}
        style={{ marginLeft: 10 }}
        color={Colors.tabIconSelected}
      />
    </TouchableOpacity>
    <TouchableOpacity onPress={onSort}>
      <FontAwesome
        name="sort-alpha-asc"
        size={26}
        style={{ marginLeft: 10 }}
        color={Colors.tabIconSelected}
      />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingBottom: 20
  },
  input: {
    borderColor: Colors.tabIconDefault,
    borderWidth: 1,
    flex: 1,
    padding: 5
  }
});
