import React from 'react';
import { Text, ScrollView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import { Person } from '../types';

export interface PeopleScreenProps {
  people?: Person[];
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

(PeopleScreen as any).navigationOptions = {
  title: 'People'
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff'
  }
});
