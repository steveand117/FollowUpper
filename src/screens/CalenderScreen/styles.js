import { StyleSheet } from 'react-native';

const CairoFont = "Cairo Regular";
const BLUE = 'rgba(160,210,250,1)';

export default StyleSheet.create({
    container: {
        minWidth: 400,
        maxWidth: 800,
        alignItems: 'stretch',
        justifyContent: 'center',
        flex: 1,
        marginBottom: 300,
    },    background: {
        flex: 1,
        minHeight: 800,
        justifyContent: 'center',
        alignItems: 'center',
    }, titleText: {
            fontSize: 24,
            fontWeight: 'bold',
            fontFamily: CairoFont,
            color: BLUE,
        }
})