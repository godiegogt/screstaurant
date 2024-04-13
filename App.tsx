/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ThemeProvider } from '@rneui/themed';

import { rneuiTheme as theme } from './src/constants/'


import Navigation from './src/navigation/drawer/screenNavigation';

import { persistor, store } from './src/app/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

function App(): React.JSX.Element {


  return (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
      <Navigation/>
      </ThemeProvider>
    </SafeAreaProvider>
      </PersistGate>
  </Provider>
  );
}


export default App;
