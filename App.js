import React from 'react';

import Navigation from './src/Navigation';
import { LogBox } from 'react-native'

import { store } from './src/redux/store';
import { Provider } from 'react-redux';

// LogBox.ignoreLogs([
//   "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
// ]);


export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
