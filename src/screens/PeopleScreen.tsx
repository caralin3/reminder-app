import React from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { connect } from 'react-redux';
import { Header, NavigationScreenProps } from 'react-navigation';
import { HeaderIcon, PersonListItem, SearchBar } from '../components';
import Layout from '../constants/Layout';
import { mockPeople as people } from '../mock';
import { ApplicationState } from '../store';
import { NavigationOptionsProps, Person } from '../types';
import { sort } from '../utility';

export interface PeopleScreenProps extends NavigationScreenProps {
  people: Person[];
}

export const DisconnectedPeopleScreen: React.FC<PeopleScreenProps> = ({
  // people,
  navigation
}) => {
  const sortedPeople = sort(people, 'asc', 'name');

  const emptyComponent = (
    <View style={styles.emptyContainer}>
      <Image
        source={require('../assets/images/robot-dev.png')}
        style={styles.emptyImage}
      />
      <Text style={styles.emptyMessage}>No people to show</Text>
      <TouchableOpacity
        onPress={() => navigation.push('AddPerson')}
        style={styles.helpLink}
      >
        <Text style={styles.helpLinkText}>Add a new person</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {sortedPeople.length > 0 && (
        <SearchBar
          onChangeText={(text: string) => console.log(text)}
          onFilter={() => null}
          onSort={() => null}
        />
      )}
      <FlatList
        data={sortedPeople}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <PersonListItem
            item={item}
            onPress={() =>
              navigation.push('Profile', { id: item.id, name: item.name })
            }
          />
        )}
        ListEmptyComponent={emptyComponent}
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
  },
  emptyContainer: {
    alignItems: 'center',
    height: Layout.window.height - (Header.HEIGHT + 100),
    justifyContent: 'center'
  },
  emptyImage: {
    resizeMode: 'contain'
  },
  emptyMessage: {
    fontSize: 14,
    lineHeight: 30,
    paddingHorizontal: 10,
    paddingVertical: 30,
    textAlign: 'center'
  },
  helpLink: {
    // paddingVertical: 10
  },
  helpLinkText: {
    color: '#2e78b7',
    fontSize: 16,
    textDecorationLine: 'underline'
  }
});
