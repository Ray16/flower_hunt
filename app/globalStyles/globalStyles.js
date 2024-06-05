import { StyleSheet } from 'react-native';
import { BorderlessButton, TextInput } from 'react-native-gesture-handler';

export const globalStyles = StyleSheet.create({
    container: {
        padding: 24,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontFamily: 'EBG-Bold',
        fontSize: 24,
        fontWeight: 'bold',
        padding: 10,
    },
    text: {
        fontFamily: 'EBG-Regular',
        fontSize: 14,
        padding: 5,
    },
    textInput: {
        marginVertical: 10,
        fontFamily: 'EBG-Regular',
        fontSize: 16,
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderRadius: 10,
        backgroundColor: '#F4FFF4',
        textAlign: 'left',
    },
    button: {
        backgroundColor: '#228b22',
        paddingHorizontal: 30,
        paddingVertical: 10,
        margin: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontFamily: 'EBG-Regular',
        fontSize: 14,
        color: 'white',
    }
})

export const images = {
    condition: {
        '0': require('../../assets/images/lock.png'),
        '1': require('../../assets/images/Flower.png'),
        '2': require('../../assets/images/Pot.png'),
    }
}