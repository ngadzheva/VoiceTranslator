import React from 'react';
import { ScrollView } from 'react-native';
import Appbar from './components/Appbar';
import App from './navigation/App';

import { ThemeContext, getTheme } from 'react-native-material-ui';

const uiTheme = {
  palette: {
    primaryColor: '#3D78CC',
    backgroundColor: '#3D78CC',
  },
  button: {
    container: { 
      backgroundColor: '#3D78CC', 
    },
  }
};

export default function TranslatorApp(): React.ReactElement {
  return (
    <ThemeContext.Provider value={getTheme(uiTheme)}>
      <ScrollView>
        <Appbar />
        <App />
      </ScrollView>
    </ThemeContext.Provider>
  );
}
