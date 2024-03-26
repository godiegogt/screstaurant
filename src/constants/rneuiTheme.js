
import { createTheme } from '@rneui/themed';

import materialTheme from './Theme'

export default  createTheme({
    lightColors: {
      primary: materialTheme.colors.primary,
    },
    darkColors: {
      primary: '#000',
    },
    mode: 'light',
  });