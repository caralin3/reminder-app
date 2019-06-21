import React from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { NavigationScreenProps } from 'react-navigation';
import { HeaderIcon, ListItem, SearchBar } from '../components';
import { ApplicationState } from '../store';
import { NavigationOptionsProps, Person } from '../types';
import { sort } from '../utility';

export interface PeopleScreenProps extends NavigationScreenProps {
  people: Person[];
}

export const DisconnectedPeopleScreen: React.FC<PeopleScreenProps> = ({
  people,
  navigation
}) => {
  const sortedPeople = sort(people, 'asc', 'name');
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
            onPress={() =>
              navigation.push('Profile', { id: item.id, name: item.name })
            }
          />
        )}
        ListEmptyComponent={
          <Text style={{ paddingHorizontal: 20 }}>No people to show</Text>
        }
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
      <HeaderIcon name="person-add" />
    </TouchableOpacity>
  )
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15
  }
});
