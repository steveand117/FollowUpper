import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native'
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import styles from './styles';

export default function CalenderScreen(prop) {
    return (
        <View style={[styles.background]}>
        <View style={styles.container}>
        <Calendar></Calendar>
        </View>
        
        
    </View>);
}