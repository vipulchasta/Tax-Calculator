import * as React from 'react';

import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';

import { HomePage } from './HomePage';
import { AboutPage } from './AboutPage';

const Stack = createStackNavigator();

export function NavigatorStack() {
  return (
    <Stack.Navigator
      initialRouteName="HomeStack"
      screenOptions={{
                        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                        headerShown: false
                    }}>
      <Stack.Screen name="HomeStack" component={HomePage} options={{title: "Application"}} />
      <Stack.Screen name="AboutStack" component={AboutPage} options={{title: "About"}}/>
    </Stack.Navigator>
  );
}
