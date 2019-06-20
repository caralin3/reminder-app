import moment from 'moment';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { connect } from 'react-redux';
import {
  NavigationParams,
  NavigationRoute,
  NavigationScreenProps,
  NavigationScreenProp
} from 'react-navigation';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { isIos } from '../constants/System';
import { ApplicationState } from '../store';
import { Person } from '../types';
import Colors from '../constants/Colors';
import { fetchGregorianDate, HebrewMonths, ConverterResponse } from '../api';

export interface ProfileScreenProps extends NavigationScreenProps {
  people: Person[];
}

export const DisconnectedProfileScreen: React.FC<ProfileScreenProps> = ({
  navigation,
  people
}) => {
  const [person, setPerson] = React.useState<Person | undefined>(undefined);

  React.useEffect(() => {
    const {
      state: { params }
    } = navigation;
    if (params) {
      const [person] = people.filter(p => p.id === params.id);
      setPerson(person);
      async () => {
        console.log(await getYahrzeitDates(person.dod, person.hebrewDate));
        // console.log(await getYahrzeitDates(person.dod, person.hebrewDate, 6));
      };
    }
  }, [navigation.state]);

  const getYearsSince = (gregDate: Date, round?: boolean) =>
    Math.ceil(moment().diff(new Date(gregDate), 'years', round));

  const getYahrzeitDates = async (
    gregDate: Date,
    hebrewDate: string,
    index: number = 0
  ) => {
    // const dates: string[] = [];
    const hDate = hebrewDate.split(',');
    const hebrewYear = parseInt(hDate[1].trim(), 10);
    const yearsSince = getYearsSince(gregDate, true);
    const start = hebrewYear + yearsSince;
    let i = index;
    console.log('Here');
    try {
      while (i < 5) {
        console.log(i);
        const hm = hDate[0].split(' ')[0].trim() as HebrewMonths;
        const hd = parseInt(hDate[0].split(' ')[1].trim(), 10);
        const hy = start + i;
        // const res: ConverterResponse = await fetchGregorianDate(hy, hm, hd);
        // console.log(res);
        // dates.push(new Date(res.gy, res.gm, res.gd).toISOString());
        i += 1;
      }
    } catch (err) {
      console.log(err);
    }
    // return dates;
  };

  return (
    <ScrollView style={styles.container}>
      {person && (
        <View>
          <FontAwesome
            name="user-circle"
            color={Colors.tabIconDefault}
            size={50}
          />
          <Text>Name: {person.name}</Text>
          {person.bio && <Text>Bio: {person.bio}</Text>}
          {person.relationship && (
            <Text>Relationship: {person.relationship}</Text>
          )}
          <Text>
            Date of Birth: {moment(person.dob).format('MMM DD, YYYY')}
          </Text>
          <Text>
            Date of Death: {moment(person.dod).format('MMM DD, YYYY')}
          </Text>
          <Text>Hebrew Date of Death: {person.hebrewDate}</Text>
          <View>
            <Text>Yahrzeit Dates</Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const mapStateToProps = (state: ApplicationState) => ({
  people: state.People.response
});

export const ProfileScreen = connect(mapStateToProps)(
  DisconnectedProfileScreen
);

interface NavigationOptionsProps {
  navigation: NavigationScreenProp<
    NavigationRoute<NavigationParams>,
    NavigationParams
  >;
}

(ProfileScreen as any).navigationOptions = ({
  navigation
}: NavigationOptionsProps) => {
  const {
    state: { params }
  } = navigation;
  return {
    title: params ? `${params.name}'s Profile` : 'Person Profile',
    headerRight: (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('AddPerson', {
            id: params ? params.id : undefined
          })
        }
      >
        <Text style={{ paddingRight: 10 }}>
          <MaterialCommunityIcons
            name="account-edit"
            color={Colors.tabIconSelected}
            size={26}
          />
        </Text>
      </TouchableOpacity>
    )
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15
  }
});
