import React from 'react';
import {PhotoStore} from './store/store';
import ImageScreen from './screens/ImageScreen';
import {Provider} from 'mobx-react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ViewInfo from './screens/ViewInfo';
import Auth from './screens/Auth';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider photoStore={PhotoStore}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="ImageScreen" component={ImageScreen} />
          <Stack.Screen name="ViewInfo" component={ViewInfo} />
          <Stack.Screen name="Auth" component={Auth} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
