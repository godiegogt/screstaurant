/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ThemeProvider } from '@rneui/themed';

import { rneuiTheme as theme } from './src/constants/'

import LoginScreen from './src/navigation/screens/LoginScreen';



function App(): React.JSX.Element {


  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <LoginScreen/>
        
      </ThemeProvider>
    </SafeAreaProvider>
  );
}


export default App;
