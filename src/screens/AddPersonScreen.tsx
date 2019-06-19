import React from 'react';
import {
  Platform,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { PersonForm, HeaderIcon } from '../components';
import { ApplicationState } from '../store';
// import { Person } from '../types';

export interface AddPersonScreenProps {}

export const DisconnectedAddPersonScreen: React.FC<
  AddPersonScreenProps
> = () => {
  return (
    <ScrollView style={styles.container}>
      <PersonForm />
    </ScrollView>
  );
};

const mapStateToProps = (state: ApplicationState) => ({
  people: state.People.response
});

export const AddPersonScreen = connect(mapStateToProps)(
  DisconnectedAddPersonScreen
);

(AddPersonScreen as any).navigationOptions = {
  title: 'Add Person'
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15
  }
});
