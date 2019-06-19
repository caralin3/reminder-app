import React from 'react';
import {
  Platform,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList
} from 'react-native';
import { connect } from 'react-redux';
import { NavigationScreenProps } from 'react-navigation';
import { HeaderIcon, ListItem, SearchBar } from '../components';
import { ApplicationState } from '../store';
import { Person } from '../types';
import { sort } from '../utility';

export interface PeopleScreenProps extends NavigationScreenProps {
  people?: Person[];
}

interface NavigationOptionsProps {
  navigation: any;
}

export const DisconnectedPeopleScreen: React.FC<PeopleScreenProps> = ({
  people,
  navigation
}) => {
  const sortedPeople = people ? sort(people, 'asc', 'name') : [];
  return (
    <ScrollView style={styles.container}>
      <SearchBar
        onChangeText={(text: string) => console.log(text)}
        onFilter={() => null}
        onSort={() => null}
      />
      <FlatList
        data={sortedPeople}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ListItem
            item={item}
            onPress={() => navigation.push('Person', { id: item.id })}
          />
        )}
      />
    </ScrollView>
  );
};

const mapStateToProps = (state: ApplicationState) => ({
  people: state.People.response
});

export const PeopleScreen = connect(mapStateToProps)(DisconnectedPeopleScreen);

(PeopleScreen as any).navigationOptions = ({
  navigation
}: NavigationOptionsProps) => ({
  title: 'People',
  headerRight: (
    <TouchableOpacity onPress={() => navigation.navigate('AddPerson')}>
      <HeaderIcon
        name={Platform.OS === 'ios' ? 'ios-person-add' : 'md-person-add'}
      />
    </TouchableOpacity>
  )
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15
  }
});
