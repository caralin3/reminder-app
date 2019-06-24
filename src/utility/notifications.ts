import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import { Store, AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { ApplicationState } from '../store';
import * as sessionState from '../store/session';
import { Navigation } from '../types';

export interface Notification {
  data: any;
  origin: 'selected' | 'received';
  remote: boolean;
}

export interface LocalNotification {
  title: string;
  body: string;
  data?: any;
  categoryId?: string;
  ios?: {
    sound?: boolean;
  };
  android?: {
    channelId?: string;
    icon?: string;
    color?: string;
    sticky?: boolean;
    link?: string;
  };
}

export const registerForPushNotifications = async (
  store: Store<ApplicationState>
) => {
  try {
    const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);

    if (status !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      if (status !== 'granted') {
        return;
      }
    }

    (store.dispatch as ThunkDispatch<ApplicationState, void, AnyAction>)(
      sessionState.setPushToken()
    );
  } catch (err) {
    console.log(err);
  }
};

export const listenForNotifications = (navigation: Navigation) =>
  Notifications.addListener((notification: Notification) =>
    handleNotification(notification, navigation)
  );

export const handleNotification = (
  notification: Notification,
  navigation: Navigation
) => {
  const { personId, personName } = notification.data;
  if (notification.origin === 'selected') {
    navigation.push('Profile', { id: personId, name: personName });
  }
};

export const scheduleNotification = async (
  notification: LocalNotification,
  date: string | number
) =>
  Notifications.scheduleLocalNotificationAsync(notification, {
    time: new Date(date)
  });

export const cancelScheduledNotification = async (id: number) =>
  Notifications.cancelScheduledNotificationAsync(id);

export const cancelAllScheduledNotifications = async () =>
  Notifications.cancelAllScheduledNotificationsAsync();
