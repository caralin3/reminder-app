import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { PersonForm } from '../components';
import { ApplicationState } from '../store';
import * as peopleState from '../store/people';
import { Person } from '../types';

export interface AddPersonScreenProps extends NavigationScreenProps {
  addPerson: (person: Person) => void;
}

export const DisconnectedAddPersonScreen: React.FC<AddPersonScreenProps> = ({
  addPerson,
  navigation
}) => {
  return (
    <ScrollView style={styles.container}>
      <PersonForm addPerson={addPerson} navigation={navigation} />
    </ScrollView>
  );
};

const mapStateToProps = (state: ApplicationState) => ({
  people: state.People.response
});

const actionCreators = {
  addPerson: (person: Person) => peopleState.add(person)
};

const mapActionsToProps = (dispatch: Dispatch) => ({
  ...bindActionCreators(actionCreators, dispatch)
});

export const AddPersonScreen = connect(
  mapStateToProps,
  mapActionsToProps
)(DisconnectedAddPersonScreen);

(AddPersonScreen as any).navigationOptions = {
  title: 'Add Person'
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15
  }
});
