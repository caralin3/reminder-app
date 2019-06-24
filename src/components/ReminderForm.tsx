import moment from 'moment';
import React from 'react';
import {
  Alert,
  Button,
  DatePickerIOS,
  StyleSheet,
  Text,
  TextInput,
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
import {
  renderAndroidDatePicker,
  renderAndroidTimePicker,
  scheduleNotification,
  LocalNotification
} from '../utility';

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
  const [dod, setDod] = React.useState('');
  const [afterSunset, setAfterSunset] = React.useState(false);

  React.useEffect(() => {
    if (person) {
      setEdit(true);
      console.log(person);
      setName(person.name);
      setDod(new Date(person.dod).toISOString());
    }
  }, [person]);

  const handleChooseDate = () => {
    if (isIos) {
      setShowPicker(true);
    } else {
      renderAndroidDatePicker(d =>
        renderAndroidTimePicker(d, date => setDod(date))
      );
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
    // if (errors.length === 0) {
    try {
      console.log('Here');
      const notification: LocalNotification = {
        title: 'Yahrzeit Reminder',
        body: `Light ${name}'s Candle`
      };
      const notificationId = await scheduleNotification(
        notification,
        new Date().getTime() + 1000
      );
      console.log(notificationId);
      // const years = Math.ceil(moment().diff(dod, 'years', true));
      // const hebrewRes: ConverterResponse = await fetchHebrewDate(
      //   new Date(dod),
      //   afterSunset
      // );
      // const { hd, hm, hy } = hebrewRes;
      // const hDod = `${hm} ${hd}, ${hy}`;
      // const gregRes: ConverterResponse = await fetchGregorianDate(
      //   hy + years,
      //   hm as HebrewMonths,
      //   hd
      // );
      // const nextDate = new Date(gregRes.gy, gregRes.gm, gregRes.gd);
      // const newPerson: Person = {
      //   afterSunset,
      //   hDod,
      //   dod,
      //   name,
      //   id: uuidv4()
      // };
      // addPerson(newPerson);
      // const message = `${newPerson.name} passed on:
      //   \n${moment(newPerson.dod).format('MMMM DD, YYYY')} ${
      //   afterSunset ? 'after sundown' : 'before sundown'
      // }
      //   \nHebrew Date: ${hDod}
      //   \nNext Yahrzeit Candle lighting:
      //   \nThe night before ${moment(nextDate).format('MMMM DD, YYYY')}
      // `;
      // Alert.alert('Added', message, [
      //   {
      //     text: 'OK',
      //     onPress: () => navigation.goBack()
      //   }
      // ]);
    } catch (err) {
      console.error(err);
    }
    // } else {
    //   console.log(errors);
    // }
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
        <Text style={styles.label}>Date</Text>
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
