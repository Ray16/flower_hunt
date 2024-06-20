import { StyleSheet } from 'react-native';
import { BorderlessButton, TextInput } from 'react-native-gesture-handler';

export const globalStyles = StyleSheet.create({
    container: {
        padding: 24,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        width: '100%',
    },
    title: {
        fontFamily: 'Nunito-Bold',
        fontSize: 24,
        fontWeight: 'bold',
        padding: 10,
    },
    text: {
        fontFamily: 'Nunito-Regular',
        fontSize: 14,
        padding: 5,
    },
    textInput: {
        marginVertical: 10,
        fontFamily: 'Nunito-Regular',
        fontSize: 16,
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#006a00',
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
        fontFamily: 'Nunito-Regular',
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
