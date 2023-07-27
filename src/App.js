import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Provider} from 'react-redux';
import {Store} from './redux/store';
import Splash from './screens/Splash';
import Map from './screens/Map';
import ToDo from './screens/ToDo';
import Done from './screens/Done';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Task from './screens/Task';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  const cb = (route, {focused, color, size}) => {
    let iconName;
    if (route.name === 'ToDo') {
      iconName = 'clipboard-list';
      size = focused ? 25 : 20;
    } else if (route.name === 'Done') {
      iconName = 'clipboard-check';
      size = focused ? 25 : 20;
    }
    return <FontAwesome5 name={iconName} color={color} size={size} />;
  };

  return (
    <Tab.Navigator
      initialRouteName="ToDo"
      screenOptions={({route}) => {
        return {
          tabBarIcon: ({focused, color, size}) =>
            cb(route, {focused, color, size}),
          tabBarActiveTintColor: '#0080ff',
          tabBarInactiveTintColor: '#777777',
          tabBarLabelStyle: {fontSize: 15, fontWeight: 'bold'},
        };
      }}>
      <Tab.Screen name="ToDo" component={ToDo} />
      <Tab.Screen name="Done" component={Done} />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#0080ff',
            },
            headerTintColor: '#ffffff',
            headerTitleStyle: {
              fontSize: 25,
              fontWeight: 'bold',
            },
          }}>
          <Stack.Screen
            name="Splash"
            component={Splash}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="Home" component={HomeTabs} />
          <Stack.Screen name="Map" component={Map} />
          <Stack.Screen name="Task" component={Task} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
