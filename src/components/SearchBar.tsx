import React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import { isIos } from '../constants/System';

export interface SearchBarProps {
  onChangeText: (text: string) => void;
  onSearch: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onChangeText,
  onSearch
}) => (
  <View style={styles.container}>
    <TextInput
      style={styles.input}
      placeholder="Search"
      onChangeText={onChangeText}
    />
    <TouchableOpacity onPress={onSearch}>
      <Ionicons
        name={isIos ? 'ios-search' : 'md-search'}
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
    paddingHorizontal: 10
  },
  input: {
    borderColor: Colors.tabIconDefault,
    borderWidth: 1,
    flex: 1,
    padding: 5
  }
});
