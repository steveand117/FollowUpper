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
        questionType: 'SelectionGroup',
        questionText:
            'How would you describe your overall energy level today?',
        questionId: 'energyLevel',
        options: [
            {
                optionText: 'I was active and moving about.',
                value: 'high'
            },
            {
                optionText: 'I completed daily tasks with no trouble.',
                value: 'normal'
            },
            {
                optionText: 'I had mild discomfort but still completed daily tasks.',
                value: 'belowNormal'
            },
            {
                optionText: 'I was tired and had to rest often.',
                value: 'tired'
            },
            {
                optionText: 'I was fatigued and mostly did not move.',
                value: 'fatigued'
            }
        ]
    },
    {
        questionType: 'MultipleSelectionGroup',
        questionText:
            'Which of these symptoms did you experience today? Select all that apply.',
        questionId: 'symptoms',
        questionSettings: {
            maxMultiSelect: 6,
            minMultiSelect: 1,
        },
        options: [
            {
                optionText: 'Coughing',
                value: 'coughing'
            },
            {
                optionText: 'Fever',
                value: 'fever'
            },
            {
                optionText: 'Hot/cold flashes',
                value: 'chills'
            },
            {
                optionText: 'Loss of taste or smell',
                value: 'loss sense'
            },
            {
                optionText: 'Shortness of breath',
                value: 'short breath'
            },
            {
                optionText: 'No symptoms',
                value: 'none'
            },
        ]
    },
            {
                questionType: 'TextInput',
                questionText: 'Do you have anything else to note for today\'s check in?',
                questionId: 'favoriteColor',
                placeholderText: 'Type here...',
            },
];
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
            if (route.name == 'Calendar') {
              iconName = focused
                ? 'calendar-blank'
                : 'calendar-blank-outline'
            }

            // You can return any component that you like here!
            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#A0D2FA',
          inactiveTintColor: 'gray',
        }}
      >
      <Tab.Screen name="Home">
            {props => <HomeScreen {...props} extraData={user} survey={defaultSurvey} />}
          </Tab.Screen>
          <Tab.Screen name="Survey">
            {props => <SurveyScreen {...props} extraData={user} survey={defaultSurvey} />}
          </Tab.Screen>
          <Tab.Screen name="Calendar">
            {props => <CalenderScreen {...props} extraData={user} survey={defaultSurvey} />}
          </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}