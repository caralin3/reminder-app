import moment from 'moment';
import React from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { connect } from 'react-redux';
import { NavigationScreenProps } from 'react-navigation';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ConverterResponse, fetchGregorianDate, HebrewMonths } from '../api';
import Colors from '../constants/Colors';
import { mockPeople as people } from '../mock';
import { ApplicationState } from '../store';
import { NavigationOptionsProps, Person } from '../types';
import { getYearsSince } from '../utility';

export interface ProfileScreenProps extends NavigationScreenProps {
  people: Person[];
}

export const DisconnectedProfileScreen: React.FC<ProfileScreenProps> = ({
  navigation
  // people
}) => {
  const [loading, setLoading] = React.useState(false);
  const [person, setPerson] = React.useState<Person | undefined>(undefined);
  const [dates, setDates] = React.useState<string[]>([]);

  React.useEffect(() => {
    const {
      state: { params }
    } = navigation;
    if (params) {
      const [profilePerson] = people.filter(p => p.id === params.id);
      setPerson(profilePerson);
      getYahrzeitDates(profilePerson.dod, profilePerson.hDod);
    }
  }, [navigation.state]);

  const getYahrzeitDates = async (
    gregDate: string,
    hebrewDate: string,
    index: number = 0
  ) => {
    const yahrzeitDates: string[] = [];
    const hDate = hebrewDate.split(',');
    const hebrewYear = parseInt(hDate[1].trim(), 10);
    const yearsSince = getYearsSince(new Date(gregDate).toISOString(), true);
    const start = hebrewYear + yearsSince;
    let i = index;
    try {
      setLoading(true);
      while (i < 5) {
        const hm = hDate[0].split(' ')[0].trim() as HebrewMonths;
        const hd = parseInt(hDate[0].split(' ')[1].trim(), 10);
        const hy = start + i;
        const res: ConverterResponse = await fetchGregorianDate(hy, hm, hd);
        yahrzeitDates.push(new Date(res.gy, res.gm, res.gd).toISOString());
        i += 1;
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
    setDates([...dates, ...yahrzeitDates]);
  };

  return (
    <ScrollView
      style={styles.scrollContainer}
      contentContainerStyle={styles.container}
    >
      {person && (
        <View style={styles.textContainer}>
          <View style={styles.img}>
            <MaterialCommunityIcons
              name="candle"
              color={Colors.tabIconDefault}
              size={65}
            />
          </View>
          <Text style={styles.text}>Name: {person.name}</Text>
          {person.relationship && (
            <Text style={styles.text}>Relationship: {person.relationship}</Text>
          )}
          <Text style={styles.text}>
            Date of Birth: {moment(person.dob).format('MMM DD, YYYY')}
          </Text>
          <Text style={styles.text}>
            Date of Death: {moment(person.dod).format('MMM DD, YYYY')}
          </Text>
          <Text>Hebrew Date of Death: {person.hDod}</Text>
          <View>
            <Text style={styles.text}>Yahrzeit Dates</Text>
            {loading ? (
              <ActivityIndicator size="large" color={Colors.tabIconSelected} />
            ) : (
              dates.map(date => (
                <Text key={date} style={styles.text}>
                  {moment(new Date(date)).format('MMM DD, YYYY')}
                </Text>
              ))
            )}
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
  scrollContainer: {
    flex: 1,
    paddingTop: 15
  },
  container: {
    alignItems: 'center',
    flex: 1
  },
  textContainer: {
    alignItems: 'flex-start',
    flex: 1
  },
  img: {
    alignSelf: 'center'
  },
  text: {
    paddingVertical: 10
  }
});
