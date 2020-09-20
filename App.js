import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { LoginScreen, HomeScreen, RegistrationScreen, SurveyScreen } from './src/screens'
import {decode, encode} from 'base-64'
import { firebase } from './src/firebase/config'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CalenderScreen from './src/screens/CalenderScreen/CalenderScreen';
if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

const Tab = createBottomTabNavigator();

export default function App() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  // useEffect(() => {
  //   const usersRef = firebase.firestore().collection('users');
  //   firebase.auth().onAuthStateChanged(user => {
  //     if (user) {
  //       usersRef
  //         .doc(user.uid)
  //         .get()
  //         .then((document) => {
  //           const userData = document.data()
  //           setLoading(false)
  //           setUser(userData)
  //         })
  //         .catch((error) => {
  //           setLoading(false)
  //         });
  //     } else {
  //       setLoading(false)
  //     }
  //   });
  // }, []);
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'clipboard-account'
                : 'clipboard-account-outline';
            }
            if (route.name == 'Survey') {
              iconName = focused
                ? 'check-bold'
                : 'check-outline'
              if (focused) {
                size = size + 7
              }
            }
            if (route.name == 'Calender') {
              iconName = focused
                ? 'calendar-blank'
                : 'calendar-blank-outline'
            }

            // You can return any component that you like here!
            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
      <Tab.Screen name="Home">
            {props => <HomeScreen {...props} extraData={user} />}
          </Tab.Screen>
          <Tab.Screen name="Survey">
            {props => <SurveyScreen {...props} extraData={user} />}
          </Tab.Screen>
          <Tab.Screen name="Calender">
            {props => <CalenderScreen {...props} extraData={user} />}
          </Tab.Screen>
            <Tab.Screen name="Login" component={LoginScreen} />
            <Tab.Screen name="Registration" component={RegistrationScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}