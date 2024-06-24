import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#EFF0F3',
    },

    button: {
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 24,
        fontFamily: 'Baloo2-Bold',
    },

    inputKey: {
        fontSize: 20,
        fontFamily: 'Baloo2-Bold',
        color: 'white',
    },
    textInput: {
        marginVertical: 5,

        fontFamily: 'Baloo2-Regular',
        fontSize: 16,
        color: 'white',

        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 20,
    }
})