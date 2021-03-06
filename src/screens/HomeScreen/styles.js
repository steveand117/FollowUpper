
import { StyleSheet } from 'react-native';
const ActorFont = "Actor Regular";
const CairoFont = "Cairo Regular";
const BLUE = 'rgba(160,210,250,1)';

export default StyleSheet.create({
    container: {
        minWidth: '70%',
        maxWidth: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        
        flex: 1, 
        
    },
    formContainer: {
        // height: 80,
        // marginTop: 40,
        // marginBottom: 20,
        // flex: 1,
        // paddingTop: 10,
        paddingBottom: 10,
        // paddingLeft: 30,
        // paddingRight: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        paddingLeft: 16,
        flex: 1,
        marginRight: 5
    },
    button: {
        height: 47,
        borderRadius: 5,
        backgroundColor: '#2089DC',
        width: 150,
        alignItems: "center",
        justifyContent: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontFamily: ActorFont,

    },
    listContainer: {
        marginTop: 20,
        padding: 20,
    },
    entityContainer: {
        marginTop: 16,
        borderBottomColor: '#cccccc',
        borderBottomWidth: 1,
        paddingBottom: 16
    },
    entityText: {
        fontSize: 20,
        color: '#333333',
        textAlign: 'center',
        margin: '5px',
        fontFamily: ActorFont
    },
    titleText: {
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: CairoFont,
        color: BLUE,
    }
})