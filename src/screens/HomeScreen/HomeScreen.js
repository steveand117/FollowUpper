import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native'
import styles from './styles';
import { firebase } from '../../firebase/config';
import {Image} from 'react-native-elements'
import logo from '../../assets/hackmit.svg'
// lol this hard coded path is jank, does this really not work for u?
// import logo from 'C:/Users/Stephanie/Desktop/desktop 2 - electric boogaloo/gatech/FollowUpper/src/assets/hackmit.svg'

const covidSurvey = [
    {
        questionType: 'Info',
        questionText: 'Yo covid doe?'
    },
    {
        questionType: 'TextInput',
        questionText: 'Simple Survey supports free form text input.\n\nWhat is your favorite color?',
        questionId: 'favoriteColor',
        placeholderText: 'Tell me your favorite color!',
    }
];
export default function HomeScreen(props) {

    const [entityText, setEntityText] = useState('')
    const [entities, setEntities] = useState([])

    const entityRef = firebase.firestore().collection('entities')
    // const userID = props.extraData.id

    useEffect(() => {
        entityRef
            // .where("authorID", "==", "bruh")
            .orderBy('createdAt', 'desc')
            .onSnapshot(
                querySnapshot => {
                    const newEntities = []
                    querySnapshot.forEach(doc => {
                        const entity = doc.data()
                        entity.id = doc.id
                        newEntities.push(entity)
                    });
                    setEntities(newEntities)
                },
                error => {
                    console.log(error)
                }
            )
    }, [])

    const onAddButtonPress = () => {
        if (entityText && entityText.length > 0) {
            const timestamp = firebase.firestore.FieldValue.serverTimestamp();
            const data = {
                text: entityText,
                // authorID: userID,
                createdAt: timestamp,
            };
            entityRef
                .add(data)
                .then(_doc => {
                    setEntityText('')
                    Keyboard.dismiss()
                })
                .catch((error) => {
                    alert(error)
                });
        }
    }

    const onBeginCheckIn = () => {
        props.navigation.navigate("Survey", {survey: covidSurvey})
    }

    const renderEntity = ({item, index}) => {
        return (
            <View style={styles.entityContainer}>

                <Text style={styles.entityText}>
                    {index}. {item.text}
                </Text>
            </View>
        )
    }

    return (
    <View style={styles.container}>
        <View style={styles.formContainer}>
            <Text style={styles.titleText}>
                    {'FOLLOWUPPER'}
            </Text>
              <Image
                source={{ uri: logo}}
                style={{ width: 250, height: 250 }}
              />
              <View style={{
                  flexDirection: "column",
                  maxWidth: '70%',
                  alignContent: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '5px'
            }}>
            <Text style={styles.entityText}>
                Welcome back! You have 
                <Text style={styles.titleText}>{' 7 '}</Text> 
                days left in your followup schdule.
            </Text> 
            <Text style={styles.entityText}>
                You have
                <Text style={styles.titleText}>{' not completed your check in '}</Text>
                for the day. Please tap the button below to check in.
            </Text>
            </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={onBeginCheckIn}
                    >
                    <Text style={styles.buttonText}>Begin Check In</Text>
                </TouchableOpacity>

            </View>
            
        </View>
    )
}