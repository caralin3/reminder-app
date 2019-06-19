import React from 'react';
import {
  Platform,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { HeaderIcon } from '../components';
import { ApplicationState } from '../store';
import { Person } from '../types';

export interface PeopleScreenProps {
  people?: Person[];
}

interface NavigationOptionsProps {
  navigation: any;
}

export const DisconnectedPeopleScreen: React.FC<PeopleScreenProps> = ({
  people
}) => {
  return (
    <ScrollView style={styles.container}>
      {people && people.map(person => <Text>{person.name}</Text>)}
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
    paddingTop: 15,
    backgroundColor: '#fff'
  }
});
