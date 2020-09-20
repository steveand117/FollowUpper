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
  
  const defaultSurvey = [

    {
        questionType: 'Info',
        questionText: 'Welcome2212121 to the React Native Simple Survey Example app! Tap next to continue'
    },
    {
        questionType: 'TextInput',
        questionText: 'Simple Survey supports free form text input.\n\nWhat is your favorite color?',
        questionId: 'favoriteColor',
        placeholderText: 'Tell me your favorite color!',
    }
];
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [survey, setSurvey] = useState(null)

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
            {props => <HomeScreen {...props} extraData={user} survey={defaultSurvey} />}
          </Tab.Screen>
          <Tab.Screen name="Survey">
            {props => <SurveyScreen {...props} extraData={user} survey={defaultSurvey} />}
          </Tab.Screen>
          <Tab.Screen name="Calender">
            {props => <CalenderScreen {...props} extraData={user} survey={defaultSurvey} />}
          </Tab.Screen>
            <Tab.Screen name="Login" component={LoginScreen} />
            <Tab.Screen name="Registration" component={RegistrationScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}