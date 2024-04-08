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

import store from './src/app/store'
import { Provider } from 'react-redux'

function App(): React.JSX.Element {


  return (
  <Provider store={store}>
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
      <Navigation/>
      </ThemeProvider>
    </SafeAreaProvider>

  </Provider>
  );
}


export default App;
