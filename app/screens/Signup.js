import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Text, TouchableOpacity } from 'react-native';
import { globalStyles } from '../globalStyles/globalStyles';

import { Formik } from 'formik';
import * as yup from 'yup';

const signUpSchema = yup.object({
	username: yup.string()
		.required('This field is required')
		.min(6, 'Minimum 6 characters'),
	password: yup.string()
		.required('This field is required')
		.min(8, 'Minimum 8 characters'),
	confirm: yup.string()
		.required('This field is required')
		.oneOf([yup.ref('password')], "Passwords do not match"),
})

export default function SignUpForm({ navigation }) {
	return ( 
		<View style={globalStyles.container}>
            <View>
                <Text style={globalStyles.title}>Create Your Profile</Text>
            </View>
			<Formik
				initialValues={{ username: '', password: '', confirm: '' }}
                validationSchema={signUpSchema}
				onSubmit={(values, actions) => {
					navigation.navigate('HomeTab');
				}}
			>
			    {(props) => (
			    <View style={{ ...globalStyles.containers, width: '100%'}}>
				    <TextInput
					    style={{ alignSelf: 'center', width: '85%', 
								...globalStyles.textInput}}
					    placeholder='Username'
					    onChangeText={props.handleChange('username')}
					    value={props.values.username}
						onBlur={props.handleBlur('username')}
			        />
					{props.touched.username && props.errors.username ? (
						<Text style={style.errorText}>{props.errors.username}</Text>
					) : null}
							
			        <TextInput
				        style={{ alignSelf: 'center', width: '85%', 
								...globalStyles.textInput}}
				        placeholder='Password'
				        onChangeText={props.handleChange('password')}
				        value={props.values.password}
						onBlur={props.handleBlur('password')}
						secureTextEntry={true}
		            />
					{props.touched.password && props.errors.password ? (
						<Text style={style.errorText}>{props.errors.password}</Text>
					) : null}
							
			        <TextInput
			            style={{ alignSelf: 'center', width: '85%', 
								...globalStyles.textInput}}
				        placeholder='Confirm Password'
                        onChangeText={props.handleChange('confirm')}
                        value={props.values.confirm}
						onBlur={props.handleBlur('confirm')}
						secureTextEntry={true}
                    />
					{props.touched.confirm && props.errors.confirm ? (
						<Text style={style.errorText}>{props.errors.confirm}</Text>
					) : null}
							
                    <TouchableOpacity 
						style={{
								alignSelf: 'center', width: '57%', 
								...globalStyles.button
						}} 
						onPress={props.handleSubmit}
					>
                        <Text style={globalStyles.buttonText}>Next</Text>
                    </TouchableOpacity>
                </View>
			    )}
		    </Formik>
		</View>
	)
}

const style = StyleSheet.create({
	errorText: {
		fontFamily: 'Nunito-Regular',
        fontSize: 14,
		color: 'red',
		alignSelf: 'center'
	}
})