import React, {useEffect} from 'react';
import {View, StyleSheet, Image, Text, TextInput, Alert} from 'react-native';
import GlobalStyle from '../utils/GlobalStyle';

export default function Splash({navigation}) {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Home');
    }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.body}>
      <Image
        source={require('../../assets/checklist.png')}
        style={styles.logo}
      />
      <Text style={[GlobalStyle.CustomFontBig, styles.text]}>To-Do List</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#0080ff',
    justifyContent: 'center',
  },
  text: {
    fontSize: 40,
    color: '#ffffff',
  },
  logo: {
    width: 150,
    height: 150,
    margin: 20,
  },
});
