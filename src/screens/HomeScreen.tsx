import React from 'react';
import {
  Animated,
  Easing,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import {
  Header,
  NavigationScreenProps,
  withNavigation
} from 'react-navigation';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import { Person, Reminder } from '../types';
import { mockReminders as reminders, mockPeople as people } from '../mock';
import { sort } from '../utility';
import { ReminderListItem } from '../components';

export interface HomeScreenProps extends NavigationScreenProps {
  people: Person[];
  reminders: Reminder[];
}

export const DisconnectedHomeScreen: React.FC<HomeScreenProps> = ({
  navigation
  // people,
  // reminders
}) => {
  const [bounceValue] = React.useState<Animated.Value>(new Animated.Value(0));
  const sortedReminders = reminders ? sort(reminders, 'desc', 'date') : [];

  React.useEffect(() => {
    if (reminders.length === 0) {
      animate();
    }
  }, [navigation.state.routeName]);

  const animate = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceValue, {
          easing: Easing.linear,
          toValue: 1,
          useNativeDriver: true
        }),
        Animated.timing(bounceValue, {
          easing: Easing.linear,
          toValue: 0,
          useNativeDriver: true
        })
      ])
    ).start();
  };

  const translateY = bounceValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 10, 15]
  });

  const emptyComponent = (
    <View style={styles.emptyContainer}>
      <Image
        source={require('../assets/images/robot-prod.png')}
        style={styles.emptyImage}
      />
      <Text style={styles.emptyMessage}>
        You can start adding reminders by storing people.
      </Text>
      <Animated.Text style={[styles.arrow, { transform: [{ translateY }] }]}>
        <MaterialCommunityIcons
          name="arrow-down"
          color={Colors.tabIconSelected}
          size={36}
        />
      </Animated.Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.listContainer}
        data={sortedReminders}
        keyExtractor={item => item.id}
        renderItem={({ item }) => {
          const [person] = people.filter(p => p.id === item.personId);
          return (
            <ReminderListItem
              item={item}
              person={person}
              onPress={() => navigation.push('EditReminder')}
            />
          );
        }}
        ListEmptyComponent={emptyComponent}
      />
    </View>
  );
};

const mapStateToProps = (state: ApplicationState) => ({
  people: state.People.response,
  reminders: state.Reminders.response
});

export const HomeScreen = connect(mapStateToProps)(DisconnectedHomeScreen);

interface HomeHeaderProps extends NavigationScreenProps {
  empty?: boolean;
}

const DisconnectedHomeHeader: React.FC<HomeHeaderProps> = ({
  empty,
  navigation
}) =>
  people.length === 0 ? (
    // empty ? (
    <View></View>
  ) : (
    <TouchableOpacity onPress={() => navigation.navigate('AddReminder')}>
      <MaterialIcons
        name="add-alert"
        style={{ marginRight: 10 }}
        color={Colors.tabIconSelected}
        size={26}
      />
    </TouchableOpacity>
  );

const mapHomeHeaderStateToProps = (state: ApplicationState) => ({
  empty: state.People.response.length === 0
});

export const HomeHeader = withNavigation(
  connect(mapHomeHeaderStateToProps)(DisconnectedHomeHeader)
);

(HomeScreen as any).navigationOptions = {
  title: 'Yahrzeit Reminders',
  headerRight: <HomeHeader />
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  listContainer: {
    flex: 1
  },
  emptyContainer: {
    alignItems: 'center',
    height: Layout.window.height - (Header.HEIGHT + 60),
    justifyContent: 'center'
  },
  emptyImage: {
    // width: 100,
    // height: 80,
    resizeMode: 'contain'
  },
  emptyMessage: {
    fontSize: 18,
    lineHeight: 30,
    paddingHorizontal: 10,
    paddingVertical: 30,
    textAlign: 'center'
  },
  arrow: {
    bottom: 40,
    position: 'absolute'
  }
});
