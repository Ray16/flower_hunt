import React, {useState} from 'react';
import { StyleSheet, TextInput, View, Text, TouchableOpacity,
	FlatList
 } from 'react-native';
import { globalStyles } from '../globalStyles/globalStyles';

export default function SecretCreation({ navigation }) {
	const [secrets, setSecrets] = useState([
		{ prompt: 'What is your favourite movie?',  placeholder: 'e.g. Titanic', answer: '', key: 1 },
		{ prompt: 'What is your favourite class?',  placeholder: 'e.g. Mathematics', answer: '', key: 2 },
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

/*					
                    <Text style={style.title}>Secret 1</Text>
				    <TextInput
						multiline
					    style={{ alignSelf: 'center', width: '85%', 
								...globalStyles.textInput}}
					    placeholder='Secret 1!'
					    onChangeText={props.handleChange('secret1')}
					    value={props.values.secret1}
						onBlur={props.handleBlur('secret1')}
			        />
					<Text style={style.errorText}>{ props.touched.secret1 && props.errors.secret1 }</Text>

                    <Text style={style.title}>Secret 2</Text>
				    <TextInput
						multiline
					    style={{ alignSelf: 'center', 
								width: '85%', 
								...globalStyles.textInput}}
					    placeholder='Secret 2!'
					    onChangeText={props.handleChange('secret2')}
					    value={props.values.secret2}
						onBlur={props.handleBlur('secret2')}
			        />
					<Text style={style.errorText}>{ props.touched.secret2 && props.errors.secret2 }</Text>

                    <Text style={style.title}>Secret 3</Text>
				    <TextInput
						multiline
					    style={{ alignSelf: 'center', width: '85%', 
								...globalStyles.textInput}}
					    placeholder='Secret 3!'
					    onChangeText={props.handleChange('secret3')}
					    value={props.values.secret3}
						onBlur={props.handleBlur('secret3')}
			        />
					<Text style={style.errorText}>{ props.touched.secret3 && props.errors.secret3 }</Text>

                    <Text style={style.title}>Secret 4</Text>
				    <TextInput
						multiline
					    style={{ alignSelf: 'center', width: '85%', 
								...globalStyles.textInput}}
					    placeholder='Secret 4!'
					    onChangeText={props.handleChange('secret4')}
					    value={props.values.secret4}
						onBlur={props.handleBlur('secret4')}
			        />
					<Text style={style.errorText}>{ props.touched.secret4 && props.errors.secret4 }</Text>

                    <Text style={style.title}>Secret 5</Text>
				    <TextInput
						multiline
					    style={{ alignSelf: 'center', width: '85%', 
								...globalStyles.textInput}}
					    placeholder='Secret 5!'
					    onChangeText={props.handleChange('secret5')}
					    value={props.values.secret5}
						onBlur={props.handleBlur('secret5')}
			        />
					<Text style={style.errorText}>{ props.touched.secret5 && props.errors.secret5 }</Text>
*/