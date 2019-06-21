import moment from 'moment';
import React from 'react';
import {
  Alert,
  Button,
  DatePickerAndroid,
  DatePickerIOS,
  StyleSheet,
  Text,
  TextInput,
  TimePickerAndroid,
  View
} from 'react-native';
import {
  NavigationParams,
  NavigationRoute,
  NavigationScreenProp
} from 'react-navigation';
import uuidv4 from 'uuid/v4';
import {
  ConverterResponse,
  fetchHebrewDate,
  fetchGregorianDate,
  HebrewMonths
} from '../api';
import Colors from '../constants/Colors';
import { isIos } from '../constants/System';
import { Person } from '../types';

export interface ReminderFormProps {
  addPerson: (person: Person) => void;
  person?: Person;
  navigation: NavigationScreenProp<
    NavigationRoute<NavigationParams>,
    NavigationParams
  >;
}

export const ReminderForm: React.FC<ReminderFormProps> = ({
  addPerson,
  person,
  navigation
}) => {
  const [edit, setEdit] = React.useState(false);
  const [showPicker, setShowPicker] = React.useState(false);
  const [name, setName] = React.useState('');
  const [relationship, setRelationship] = React.useState('');
  const [dob, setDob] = React.useState('');
  const [dod, setDod] = React.useState('');
  const [afterSunset, setAfterSunset] = React.useState(false);

  React.useEffect(() => {
    if (person) {
      setEdit(true);
      console.log(person);
      setName(person.name);
      if (person.relationship) {
        setRelationship(person.relationship);
      }
      setDod(new Date(person.dod).toISOString());
      if (person.afterSunset) {
        setAfterSunset(person.afterSunset);
      }
    }
  }, [person]);

  const renderAndroidDatePicker = async () => {
    try {
      const { action, year, month, day } = (await DatePickerAndroid.open({
        date: new Date(),
        mode: 'spinner'
      })) as any;
      if (action !== DatePickerAndroid.dismissedAction) {
        const date = new Date(year, month, day);
        await renderAndroidTimePicker(date);
      }
    } catch ({ code, message }) {
      console.warn('Cannot open date picker', message);
    }
  };

  const renderAndroidTimePicker = async (selectedDate: Date) => {
    try {
      const { action, hour, minute } = (await TimePickerAndroid.open({
        hour: new Date().getHours(),
        minute: 0,
        is24Hour: false,
        mode: 'spinner'
      })) as any;
      if (action !== TimePickerAndroid.dismissedAction) {
        const date = new Date(selectedDate);
        date.setHours(hour);
        date.setMinutes(minute);
        setDod(date.toISOString());
      }
    } catch ({ code, message }) {
      console.warn('Cannot open date picker', message);
    }
  };

  const handleChooseDate = () => {
    if (isIos) {
      setShowPicker(true);
    } else {
      renderAndroidDatePicker();
    }
  };

  const isNotEmpty = (val: string) => val && val.trim().length > 0;

  const getErrors = () => {
    const errors: {
      [key: string]: string;
    }[] = [];
    if (!isNotEmpty(name)) {
      errors.push({ name: 'Required' });
    }
    if (!isNotEmpty(dod)) {
      errors.push({ date: 'Required' });
    }
    return errors;
  };

  const handleSubmit = async () => {
    const errors = getErrors();
    if (errors.length === 0) {
      try {
        const years = Math.ceil(moment().diff(dod, 'years', true));
        const hebrewRes: ConverterResponse = await fetchHebrewDate(
          new Date(dod),
          afterSunset
        );
        const { hd, hm, hy } = hebrewRes;
        const hDod = `${hm} ${hd}, ${hy}`;
        const gregRes: ConverterResponse = await fetchGregorianDate(
          hy + years,
          hm as HebrewMonths,
          hd
        );
        const nextDate = new Date(gregRes.gy, gregRes.gm, gregRes.gd);
        const newPerson: Person = {
          afterSunset,
          hDod,
          dob,
          dod,
          name,
          id: uuidv4()
        };
        addPerson(newPerson);
        const message = `${newPerson.name} passed on:
          \n${moment(newPerson.dod).format('MMMM DD, YYYY')} ${
          afterSunset ? 'after sundown' : 'before sundown'
        }
          \nHebrew Date: ${hDod}
          \nNext Yahrzeit Candle lighting:
          \nThe night before ${moment(nextDate).format('MMMM DD, YYYY')}
        `;
        Alert.alert('Added', message, [
          {
            text: 'OK',
            onPress: () => navigation.goBack()
          }
        ]);
      } catch (err) {
        console.error(err);
      }
    } else {
      console.log(errors);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          autoFocus={!edit}
          style={styles.textInput}
          placeholder="John Doe"
          defaultValue={name}
          onChangeText={text => setName(text)}
        />
        <Text style={styles.label}>Relationship (optional)</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Father"
          defaultValue={relationship}
          onChangeText={text => setRelationship(text)}
          onBlur={name && !edit ? handleChooseDate : () => null}
        />
        {edit && (
          <View>
            <Text style={styles.label}>Date of Birth (optional)</Text>
            <View style={styles.chooseButton}>
              <Text
                style={dod ? styles.date : styles.emptyDate}
                onPress={handleChooseDate}
              >
                {dod
                  ? moment(new Date(dod)).format('MMM DD, YYYY h:mm')
                  : 'Choose Date'}
              </Text>
            </View>
            {showPicker && (
              <DatePickerIOS
                date={new Date(dod)}
                onDateChange={date => setDod(date.toISOString())}
              />
            )}
            <View style={styles.col}>
              <Text style={styles.label}>After Sunset?</Text>
              <View style={styles.row}>
                <View style={styles.sunsetButton}>
                  <Button
                    title="Yes"
                    color={
                      afterSunset
                        ? Colors.tabIconSelected
                        : Colors.tabIconDefault
                    }
                    onPress={() => setAfterSunset(true)}
                    accessibilityLabel="Set after sunset"
                  />
                </View>
                <View style={styles.sunsetButton}>
                  <Button
                    title="No"
                    color={
                      !afterSunset
                        ? Colors.tabIconSelected
                        : Colors.tabIconDefault
                    }
                    onPress={() => setAfterSunset(false)}
                    accessibilityLabel="Set before sunset"
                  />
                </View>
              </View>
            </View>
          </View>
        )}
        <Text style={styles.label}>Date of Passing</Text>
        <View style={styles.chooseButton}>
          <Text
            style={dod ? styles.date : styles.emptyDate}
            onPress={handleChooseDate}
          >
            {dod
              ? moment(new Date(dod)).format('MMM DD, YYYY h:mm')
              : 'Choose Date'}
          </Text>
        </View>
        {showPicker && (
          <DatePickerIOS
            date={new Date(dod)}
            onDateChange={date => setDod(date.toISOString())}
          />
        )}
        <View style={styles.col}>
          <Text style={styles.label}>After Sunset?</Text>
          <View style={styles.row}>
            <View style={styles.sunsetButton}>
              <Button
                title="Yes"
                color={
                  afterSunset ? Colors.tabIconSelected : Colors.tabIconDefault
                }
                onPress={() => setAfterSunset(true)}
                accessibilityLabel="Set after sunset"
              />
            </View>
            <View style={styles.sunsetButton}>
              <Button
                title="No"
                color={
                  !afterSunset ? Colors.tabIconSelected : Colors.tabIconDefault
                }
                onPress={() => setAfterSunset(false)}
                accessibilityLabel="Set before sunset"
              />
            </View>
          </View>
        </View>
        <View style={styles.submit}>
          <Button
            title="Submit"
            color={Colors.tabIconSelected}
            onPress={handleSubmit}
            accessibilityLabel="Submit"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
    padding: 15
  },
  form: {
    alignItems: 'flex-start',
    flex: 1,
    paddingHorizontal: '15%',
    width: '100%'
  },
  label: {
    fontWeight: 'bold',
    paddingBottom: 10
  },
  col: {
    justifyContent: 'space-between'
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  chooseButton: {
    marginBottom: 20,
    width: '100%'
  },
  sunsetButton: {
    marginBottom: 20,
    width: '50%'
  },
  textInput: {
    borderColor: Colors.tabIconSelected,
    borderWidth: 1,
    flex: 1,
    marginBottom: 20,
    minWidth: 100,
    padding: 3,
    width: '100%'
  },
  date: {
    borderColor: Colors.tabIconSelected,
    borderWidth: 1,
    marginRight: 10,
    minWidth: 100,
    padding: 5
  },
  emptyDate: {
    borderColor: Colors.tabIconSelected,
    borderWidth: 1,
    color: Colors.tabIconDefault,
    marginRight: 10,
    minWidth: 100,
    padding: 5
  },
  input: {
    borderColor: Colors.tabIconSelected,
    borderWidth: 1,
    padding: 3,
    textAlign: 'center'
  },
  days: {
    marginLeft: 10
  },
  checkbox: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: 20
  },
  submit: {
    alignSelf: 'center',
    paddingVertical: 20,
    width: '100%'
  }
});
