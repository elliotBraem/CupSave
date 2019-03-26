import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import COLORS from '../constants/colors';

const Loading = () => (
  <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
    <ActivityIndicator size="large" color={COLORS.primary} />
  </View>
);

export default Loading;
