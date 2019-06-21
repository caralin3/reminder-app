import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { PersonForm } from '../components';
import { mockPeople as people } from '../mock';
import { ApplicationState } from '../store';
import * as peopleState from '../store/people';
import { NavigationOptionsProps, Person } from '../types';

export interface AddPersonScreenProps extends NavigationScreenProps {
  addPerson: (person: Person) => void;
  people: Person[];
}

export const DisconnectedAddPersonScreen: React.FC<AddPersonScreenProps> = ({
  addPerson,
  // people,
  navigation
}) => {
  const {
    state: { params }
  } = navigation;
  const [person, setPerson] = React.useState<Person | undefined>(undefined);

  React.useEffect(() => {
    if (params && params.id) {
      const [editPerson] = people.filter(p => p.id === params.id);
      setPerson(editPerson);
    }
  }, [navigation.state]);

  return (
    <ScrollView style={styles.container}>
      <PersonForm
        addPerson={addPerson}
        navigation={navigation}
        person={person}
      />
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

(AddPersonScreen as any).navigationOptions = ({
  navigation
}: NavigationOptionsProps) => ({
  title: navigation.state.params ? 'Edit Person' : 'Add Person'
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15
  }
});
