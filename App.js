import React, { useEffect } from 'react';

import Navigation from './src/Navigation';
import CreateEvent from './src/Screens/CreateEvent';
import { LogBox } from 'react-native'

import { store } from './src/redux/store';
import { Provider } from 'react-redux';

import PushNotification from "react-native-push-notification";

// LogBox.ignoreLogs([
//   "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
// ]);

export default function App() {

  useEffect(() => {
    createChannel();
  }, []);

  const createChannel = () => {
    PushNotification.createChannel({
      channelId: "TestID",
      channelName: "Test Channel"
    })
  }

  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
