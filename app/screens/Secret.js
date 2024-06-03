import React from 'react';
import { StyleSheet, TextInput, View, Text, TouchableOpacity } from 'react-native';
import { globalStyles } from '../globalStyles/globalStyles';

import { Formik } from 'formik';
import * as yup from 'yup';

const secretSchema = yup.object({
	secret1: yup.string()
		.required('This field is required'),
    secret2: yup.string()
		.required('This field is required'),
    secret3: yup.string()
		.required('This field is required'),
    secret4: yup.string()
		.required('This field is required'),
    secret5: yup.string()
		.required('This field is required')
})

export default function SecretCreation() {
	return ( 
		<View style={globalStyles.container}>
            <View>
                <Text style={globalStyles.title}>Tell Us Your Secrets!</Text>
            </View>
			<Formik
				initialValues={{ secret1: '',
                                secret2: '',
                                secret3: '',
                                secret4: '',
                                secret5: '',
                }}
                validationSchema={secretSchema}
				onSubmit={(values, actions) => {
					actions.resetForm();
				}}
			>
			    {(props) => (
			    <View style={{ ...globalStyles.containers, width: '100%'}}>
					
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
							
                    <TouchableOpacity 
						style={{
								alignSelf: 'center', width: '57%', 
								...globalStyles.button
						}} 
						onPress={props.handleSubmit}
					>
                        <Text style={globalStyles.buttonText}>Create!</Text>
                    </TouchableOpacity>
                </View>
			    )}
		    </Formik>
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