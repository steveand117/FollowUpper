import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native'
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import styles from './styles';
import Modal from 'react-native-modal';
import {Button, Image} from 'react-native-elements'
import logo from '../../assets/thinking.svg'
// import logo from 'C:/Users/Stephanie/Desktop/desktop 2 - electric boogaloo/gatech/FollowUpper/src/assets/thinking.svg'

const vacation = {key:'vacation', color: 'red', selectedDotColor: 'blue'};
const massage = {key:'massage', color: 'blue', selectedDotColor: 'blue'};
const workout = {key:'workout', color: 'green'};
const importantDays = ['2020-09-25', '2020-09-30', '2020-09-15']

export default function CalenderScreen(prop) {
    const [selected, setSelected] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);
    const onDayPress = (day) => {
      setSelected(day.dateString);
      if (day.dateString == '2020-09-25') {
            alert("Weekly Followup for Broken Arm", "Be sure to fill it out :)",
            [
                { text: "OK", onPress: () => console.log("OK Pressed") },
                { text: "Set a reminder", onPress: () => console.log("OK Pressed") }
                  ],
                  { cancelable: false })
                }
    if (day.dateString == '2020-09-30') {
        alert("Braces Followup", "Be sure to fill it out :)",
        [
            { text: "OK", onPress: () => console.log("OK Pressed") },
            { text: "Set a reminder", onPress: () => console.log("OK Pressed") }
              ],
              { cancelable: false })
}    if (day.dateString == '2020-09-15') {
    alert("Weekly General Questionaire", "Be sure to fill it out :)",
    [
        { text: "OK", onPress: () => console.log("OK Pressed") },
        { text: "Set a reminder", onPress: () => console.log("OK Pressed") }
          ],
          { cancelable: false })

        }    if (day.dateString == '2020-09-20') {
            alert("Georgia Tech Covid Check-In", "Be sure to fill it out :)",
            [
                { text: "OK", onPress: () => console.log("OK Pressed") },
                { text: "Set a reminder", onPress: () => console.log("OK Pressed") }
                  ],
                  { cancelable: false })
                }
    };
    return (
        <View style={[styles.background]}>
            <Image
                source={{ uri: logo}}
                style={{ width: 200, height: 200 }}
            />
        <View style={styles.container}>
            <Text style={styles.titleText}>
                    {'UPCOMING APPOINTMENTS'}
            </Text>

        <Calendar
          current={'2020-09-20'}
          hideArrows={false}
          onDayPress={onDayPress}
          markingType={'multi-dot'}
          markedDates={{'2020-09-25': {
            dots: [
              {key: 'vacation', color: 'red', selectedDotColor: 'rgba(160,210,250,1)'}
            ],
          }, '2020-09-20': {
            dots: [
              {key: 'vacation', color: 'red', selectedDotColor: 'rgba(160,210,250,1)'}
            ],
          }, '2020-09-30': {
            dots: [
              {key: 'bruh', color: 'red'}
            ],
          },'2020-09-15': {
            dots: [
              {key: 'bruh', color: 'green', selectedDotColor: 'green'}
            ],
          },

            [selected]: {
              selected: true,
              disableTouchEvent: true,
              selectedColor: 'rgba(160,210,250,1)',
              selectedTextColor: 'white',
              selectedDotColor: 'white'
            },
          }}

        />
        </View>

        </View>
    
    
    );
}