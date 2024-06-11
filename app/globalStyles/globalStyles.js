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
        fontFamily: 'EBG-bold',
        fontSize: 24,
        fontWeight: 'bold',
        padding: 10,
    },
    text: {
        fontFamily: 'EBG-regular',
        fontSize: 14,
        padding: 5,
    },
    textInput: {
        marginVertical: 10,
        fontFamily: 'EBG-regular',
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
        fontFamily: 'EBG-regular',
        fontSize: 14,
        color: 'white',
    },
    header: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    body: {
        flex: 20,
    }
})

export const images = {
    condition: {
        '0': require('../../assets/images/Invisible.png'),
        '1': require('../../assets/images/Flower.png'),
        '2': require('../../assets/images/Pot.png'),
    }
}