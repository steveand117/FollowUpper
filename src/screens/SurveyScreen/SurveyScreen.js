import React, { Component } from 'react';
import { StyleSheet, ScrollView, Text, TextInput, View } from 'react-native';
import styles from './styles';
import { SimpleSurvey } from 'react-native-simple-survey';
import { firebase } from '../../firebase/config'
import {setCustomText, setCustomTextInput} from 'react-native-global-props';
import { Button } from 'react-native-elements';
import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';




const ActorFont = "Actor Regular";

const BLUE = 'rgba(160,210,250,1)';
const WHITE = 'rgba(255,255,255,1)';
const surveyRef = firebase.firestore().collection('surveys')

const defaultSurvey = [

    {
        questionType: 'Info',
        questionText: 'Welcome2 to the React Native Simple Survey Example app! Tap next to continue'
    },
    {
        questionType: 'TextInput',
        questionText: 'Simple Survey supports free form text input.\n\nWhat is your favorite color?',
        questionId: 'favoriteColor',
        placeholderText: 'Tell me your favorite color!',
    }
];

let survey = [
    {
        questionType: 'Info',
        questionText: 'Welcome2 to the React Native Simple Survey Example app! Tap next to continue'
    },
    {
        questionType: 'TextInput',
        questionText: 'Simple Survey supports free form text input.\n\nWhat is your favorite color?',
        questionId: 'favoriteColor',
        placeholderText: 'Tell me your favorite color!',
    }
];


export default class SurveyScreen extends Component {


    static navigationOptions = () => {
        return {
            headerStyle: {
                backgroundColor: BLUE,
                height: 40,
                elevation: 5,
            },
            headerTintColor: '#fff',
            headerTitle: 'Sample Survey',
            headerTitleStyle: {
                flex: 1,
            }
        };
    }

    constructor(props) {
        super(props);
        let survey;
        // this.itemsRef = firebase.database().ref();
        // this.props.survey = this.props.survey == null ? defaultSurvey : this.props.survey;
        this.state = { backgroundColor: BLUE, answersSoFar: '', jsonIsVisible: 'false'};
    }

    onSurveyFinished(answers) {
        /** 
         *  By using the spread operator, array entries with no values, such as info questions, are removed.
         *  This is also where a final cleanup of values, making them ready to insert into your DB or pass along
         *  to the rest of your code, can be done.
         * 
         *  Answers are returned in an array, of the form 
         *  [
         *  {questionId: string, value: any},
         *  {questionId: string, value: any},
         *  ...
         *  ]
         *  Questions of type selection group are more flexible, the entirity of the 'options' object is returned
         *  to you.
         *  
         *  As an example
         *  { 
         *      questionId: "favoritePet", 
         *      value: { 
         *          optionText: "Dogs",
         *          value: "dog"
         *      }
         *  }
         *  This flexibility makes SelectionGroup an incredibly powerful component on its own. If needed it is a 
         *  separate NPM package, react-native-selection-group, which has additional features such as multi-selection.
         */

        const infoQuestionsRemoved = [...answers];

        // Convert from an array to a proper object. This won't work if you have duplicate questionIds
        const answersAsObj = {};
        let sum = 0
        for (const elem of infoQuestionsRemoved) { 
            answersAsObj[elem.questionId] = elem.value; 
        }
        sum += parseInt(answersAsObj["energyLevel"].value);
        for (const elem of answersAsObj["symptoms"]) {
            sum += parseInt(elem.value)
        }
        firebase.database().ref('users/' + Math.floor(Math.random() * 100)).set(answersAsObj);
        if (sum < 7) {
            alert("You show no symptoms of Covid-19. Be careful, and check your temperature often!")
        }
        if (sum > 6 && sum < 21) {
            alert("There is reasonable concern for Covid. Call your local medical professional to figure out the next steps")
        }
        if (sum > 20) {
            alert("Due to showing emergency warning signs (Shortness of breathe), you should seek emergency medical care immediently.")
        }
        //0[object Object][object Object],[object Object],[object Object],[object Object]23
        this.props.navigation.navigate('Home', this.props);
    }

    /**
     *  After each answer is submitted this function is called. Here you can take additional steps in response to the 
     *  user's answers. From updating a 'correct answers' counter to exiting out of an onboarding flow if the user is 
     *  is restricted (age, geo-fencing) from your app.
     */
    onAnswerSubmitted(answer) {
        this.setState({ answersSoFar: JSON.stringify(this.surveyRef.getAnswers(), 2) });
        switch (answer.questionId) {
            case 'favoriteColor': {
                // if (COLORS.includes(answer.value.toLowerCase())) {
                //     this.setState({ backgroundColor: answer.value.toLowerCase() });
                // }
                break;
            }
            default:
                break;
        }
    }

    renderPreviousButton(onPress, enabled) {
        return (
            <View style={{ flexGrow: 1, maxWidth: 100, marginTop: 10, marginBottom: 10 }}>
                <Button
                    type="outline"
                    onPress={onPress}
                    disabled={!enabled}
                    backgroundColor={BLUE}
                    title={'Previous'}
                />
            </View>
        );
    }

    renderNextButton(onPress, enabled) {
        return (
            <View style={{ flexGrow: 1, maxWidth: 100, marginTop: 10, marginBottom: 10}}>
                <Button
                    color={BLUE}
                    onPress={onPress}
                    disabled={!enabled}
                    backgroundColor={BLUE}
                    title={'Next'}
                />
            </View>
        );
    }

    renderFinishedButton(onPress, enabled) {
        return (
            <View style={{ flexGrow: 1, maxWidth: 100, marginTop: 10, marginBottom: 10 }}>
                <Button
                    title={'Finished'}
                    onPress={onPress}
                    disabled={!enabled}
                    color={BLUE}
                />
            </View>
        );
    }

    renderButton(data, index, isSelected, onPress) {
        return (
            <View
                key={`selection_button_view_${index}`}
                style={{ marginTop: 5, marginBottom: 5, justifyContent: 'flex-start' }}
            >
                <Button
                    title={data.optionText}
                    onPress={onPress}
                    style={isSelected ? { fontWeight: 'bold' } : {}}
                    type={isSelected ? "solid" : "outline" }
                    key={`button_${index}`}
                />
            </View>
        );
    }

    renderQuestionText(questionText) {
        return (
            <View style={{ marginLeft: 10, marginRight: 10 }}>
                <Text numLines={1} style={styles.questionText}>{questionText}</Text>
            </View>
        );
    }

    renderTextBox(onChange, value, placeholder, onBlur) {
        return (
            <View>
                <TextInput
                    style={styles.textBox}
                    onChangeText={text => onChange(text)}
                    numberOfLines={1}
                    underlineColorAndroid={'white'}
                    placeholder={placeholder}
                    placeholderTextColor={'rgba(184,184,184,1)'}
                    value={value}
                    multiline
                    onBlur={onBlur}
                    blurOnSubmit
                    returnKeyType='done'
                />
            </View>
        );
    }

    renderNumericInput(onChange, value, placeholder, onBlur) {
        return (<TextInput 
            style={styles.numericInput}
            onChangeText={text => { onChange(text); }}
            underlineColorAndroid={'white'}
            placeholderTextColor={'rgba(184,184,184,1)'}
            value={String(value)}
            placeholder={placeholder}
            keyboardType={'numeric'}
            onBlur={onBlur}
            maxLength={3}
        />);
    }

    renderInfoText(infoText) {
        return (
            <View style={{ marginLeft: 10, marginRight: 10 }}>
                <Text style={styles.infoText}>{infoText}</Text>
            </View>
        );
    }

    render() {        
        
        // const customTextProps = {
        //     style: {
        //     fontFamily: 'GoodFeelingSans',
        //     },
        // };
        // setCustomText(customTextProps);
        // setCustomTextInput(customTextProps);

        return (
            <View style={[styles.background, { backgroundColor: this.state.backgroundColor }]}>
                <View style={styles.container}>
                    <SimpleSurvey
                        ref={(s) => { this.surveyRef = s; }}
                        survey={this.props.survey}
                        renderSelector={this.renderButton.bind(this)}
                        containerStyle={styles.surveyContainer}
                        selectionGroupContainerStyle={styles.selectionGroupContainer}
                        navButtonContainerStyle={{ flexDirection: 'row', justifyContent: 'space-around' }}
                        renderPrevious={this.renderPreviousButton.bind(this)}
                        renderNext={this.renderNextButton.bind(this)}
                        renderFinished={this.renderFinishedButton.bind(this)}
                        renderQuestionText={this.renderQuestionText}
                        onSurveyFinished={(answers) => this.onSurveyFinished(answers)}
                        onAnswerSubmitted={(answer) => this.onAnswerSubmitted(answer)}
                        renderTextInput={this.renderTextBox}
                        renderNumericInput={this.renderNumericInput}
                        renderInfo={this.renderInfoText}
                    />
                    
                </View>
                
                <ScrollView style={styles.answersContainer}>
                    <Text style={{textAlign:'center'}}>JSON output</Text>
                    <Text>{this.state.answersSoFar}</Text>
                </ScrollView>
                
            </View>
        );
    }
}