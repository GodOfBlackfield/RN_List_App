import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import GlobalStyle from '../utils/GlobalStyle';
import MapView from 'react-native-maps';

export default function Map({navigation, route}) {
  const map = route.params.map;

  return (
    <View style={styles.body}>
      <Text style={[GlobalStyle.CustomFont, styles.text]}>{map.city}</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: map.lat,
          longitude: map.lng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 40,
    margin: 10,
  },
  map: {
    height: '100%',
    width: '100%',
  },
});
