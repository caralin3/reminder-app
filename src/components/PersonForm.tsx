import React from 'react';
import {
  Button,
  DatePickerAndroid,
  DatePickerIOS,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import Colors from '../constants/Colors';

export interface PersonFormProps {}

export const PersonForm: React.FC<PersonFormProps> = () => {
  const [showPicker, setShowPicker] = React.useState(false);
  const [name, setName] = React.useState('');
  const [selectedDate, setSelectedDate] = React.useState('');
  const [afterSunset, setAfterSunset] = React.useState(false);
  const [alertOn, setAlertOn] = React.useState(0);

  const renderAndroidDatePicker = async () => {
    try {
      const { action, year, month, day } = (await DatePickerAndroid.open({
        date: new Date(),
        mode: 'spinner'
      })) as any;
      if (action !== DatePickerAndroid.dismissedAction) {
        // Selected year, month (0-11), day
        const date = new Date(year, month, day);
        console.log(date);
        setSelectedDate(date.toISOString());
      }
    } catch ({ code, message }) {
      console.warn('Cannot open date picker', message);
    }
  };

  const handleChooseDate = () => {
    if (Platform.OS === 'ios') {
      setShowPicker(true);
    } else {
      renderAndroidDatePicker();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 16, paddingBottom: 20 }}>
        Add a person to get Yahrzeit dates
      </Text>
      <View style={styles.form}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Name"
          onChangeText={text => setName(text)}
        />
        <Button
          title="Choose Date"
          color={Colors.tabIconSelected}
          onPress={handleChooseDate}
          accessibilityLabel="Choose a passing date"
        />
        {showPicker && (
          <DatePickerIOS
            date={new Date(selectedDate)}
            onDateChange={date => setSelectedDate(date.toISOString())}
          />
        )}
        <View style={styles.col}>
          <Text style={styles.label}>After Sunset?</Text>
          <View style={styles.row}>
            <Button
              title="Yes"
              color={
                afterSunset ? Colors.tabIconSelected : Colors.tabIconDefault
              }
              onPress={() => setAfterSunset(true)}
              accessibilityLabel="Set after sunset"
            />
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
        <Text style={styles.label}>Add reminder</Text>
        <View style={styles.row}>
          <TextInput
            style={styles.input}
            placeholder="#"
            onChangeText={text => setAlertOn(parseInt(text, 10))}
            keyboardType="numeric"
          />
          <Text>days before</Text>
        </View>
        <Button
          title="Submit"
          color={Colors.tabIconSelected}
          onPress={() => null}
          accessibilityLabel="Submit"
        />
      </View>
      <Text>
        {name}
        {selectedDate}
        {afterSunset ? 'true' : 'false'}
        {alertOn}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    paddingTop: 15
  },
  form: {
    alignItems: 'flex-start',
    flex: 1
  },
  label: {
    paddingBottom: 5
  },
  col: {
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  textInput: {
    borderColor: Colors.tabIconSelected,
    borderWidth: 1,
    minWidth: 100,
    padding: 3
  },
  input: {
    borderColor: Colors.tabIconSelected,
    borderWidth: 1,
    padding: 3,
    textAlign: 'center'
  }
});
