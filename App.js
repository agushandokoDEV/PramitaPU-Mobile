import React from 'react';
import { useEffect } from 'react';
import { StatusBar } from 'react-native';
import SplashScreen from 'react-native-splash-screen'
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from "redux-persist/es/integration/react";

import Router from './src/Router';
import store from './src/store';

const App = () => {

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <StatusBar barStyle='light-content' translucent={true} backgroundColor={'rgba(52, 52, 52, 0.2)'}></StatusBar>
          <Router />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;