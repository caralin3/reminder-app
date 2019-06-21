import React from 'react';
import {
  Animated,
  Image,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Easing
} from 'react-native';
import { Header } from 'react-navigation';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import { Person, Reminder } from '../types';
import { sort } from '../utility';

export interface HomeScreenProps {
  people: Person[];
  reminders: Reminder[];
}

export const DisconnectedHomeScreen: React.FC<HomeScreenProps> = ({
  reminders
}) => {
  const [bounceValue] = React.useState<Animated.Value>(new Animated.Value(0));
  const sortedReminders = reminders ? sort(reminders, 'asc', 'date') : [];

  React.useEffect(() => {
    if (reminders.length === 0) {
      animate();
    }
  }, [reminders]);

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
        You can start adding reminders by creating people.
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
        renderItem={({ item }) => <Text>{item.date}</Text>}
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

(HomeScreen as any).navigationOptions = ({ navigation }: any) => ({
  title: 'Yahrzeit Reminders',
  headerRight: (
    <TouchableOpacity onPress={() => navigation.navigate('AddReminder')}>
      <MaterialIcons
        name="add-alert"
        style={{ marginRight: 10 }}
        color={Colors.tabIconSelected}
        size={26}
      />
    </TouchableOpacity>
  )
});

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
