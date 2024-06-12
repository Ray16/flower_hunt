import React, {useState} from 'react';
import { StyleSheet, TextInput, View, Text, TouchableOpacity,
	FlatList
 } from 'react-native';
import { globalStyles } from '../globalStyles/globalStyles';

export default function SecretCreation({ navigation }) {
	const [secrets, setSecrets] = useState([
		{ prompt: 'What is your favorite movie?',  placeholder: 'e.g. Titanic', answer: '', key: 1 },
		{ prompt: 'What is your favorite class?',  placeholder: 'e.g. Mathematics', answer: '', key: 2 },
		{ prompt: 'What is the name of your first crush?',  placeholder: 'hmmm....', answer: '', key: 3 },
	]);

	const CreateProfile = () => {
		navigation.navigate('HomeTab');
	}

	return ( 
		<View style={globalStyles.container}>
			<FlatList style={{ ...globalStyles.containers, width: '100%'}}
				data={secrets}
				renderItem={({ item }) => (
					<View>
						<Text style={style.title}>{ item.prompt }</Text>
						<TextInput
							multiline
							style={{ alignSelf: 'center', width: '85%', 
									...globalStyles.textInput}}
							placeholder={ item.placeholder }
							
						/>
					</View>
				)}
			/>
            <TouchableOpacity 
				style={{
					alignSelf: 'center', width: '57%', 
					...globalStyles.button
				}} 
				onPress={CreateProfile}
			>
            	<Text style={globalStyles.buttonText}>Create!</Text>
            </TouchableOpacity>
		</View>
	)
}

const style = StyleSheet.create({
	errorText: {
		fontFamily: 'EBG-Regular',
        fontSize: 14,
		color: 'red',
		alignSelf: 'center'
	},
	title: {
		fontFamily: 'EBG-Bold',
		fontWeight: 'bold',
		fontSize: 18,
		marginLeft: 24,
	}
})
