import * as React from 'react';
import { Button, View, Text } from 'react-native';

import { useTheme } from '@react-navigation/native';

export function HomePage({ navigation }) {
  const { colors } = useTheme();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{color: colors.text}}>Hello</Text>
    </View>
  );
}