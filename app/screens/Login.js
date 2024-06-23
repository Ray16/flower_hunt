import React, { useState } from 'react';
import { View, Image, ImageBackground, Dimensions, TextInput,
    Text, TouchableOpacity,
} from 'react-native';

import { globalStyles } from '../globalStyles/globalStyles';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default function Login(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [infoCorrect, setInfoCorrect] = useState(true);

    return ( 
        <ImageBackground 
            source={require('../../assets/images/LoginBackground.jpg')}
            style={{
                height: height,
                width: width,
                ...globalStyles.container
            }}
        >
            {/* Flower Icon Header */}
            <View
                style={ {
                    height: height * 0.4,
                    width: width,
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                } }
            >
                <Image
                    source={require('../../assets/images/FlowerIcon.jpg')}
                    style={ { 
                        marginBottom: 0.05 * height,
                        height: 150,
                        width: 150,
                    } }
                />
            </View>

            {/* Text Input Component for Username and Password */}
            <View
                style={{
                    height: height * 0.3,
                    width: width * 0.8,
                    alignItems: 'flex-start',
                    justifyContent: 'flex-end',
                }}
            >
                <Text style={globalStyles.inputKey}> Username </Text>
                <TextInput 
                    style={[
                        { 
                            height: 0.06 * height, 
                            width: 0.8 * width,
                            paddingHorizontal: 20, 
                        }, 
                        globalStyles.textInput
                    ]}
                    placeholder='John Smith'
                    placeholderTextColor='white'
                    onChangeText={(val) => setUsername(val)}
                />

                <Text style={globalStyles.inputKey}> Password </Text>
                <TextInput 
                    style={[
                        { 
                            height: 0.06 * height, 
                            width: 0.8 * width,
                            paddingHorizontal: 20, 
                        }, 
                        globalStyles.textInput
                    ]}
                    placeholder='e.g. 12345678'
                    placeholderTextColor='white'
                    onChangeText={(val) => setPassword(val)}
                    secureTextEntry={true}
                />

                {infoCorrect ? 
                    (
                        <View style={{ height: 23 }}>
                        </View>
                    ) 
                    : 
                    (
                        <Text
                            style={{
                                fontFamily: 'Baloo2-Bold',
                                color: '#FFD912'
                            }}
                        >
                            Invalid username or wrong password.
                        </Text>
                    ) 
                }
            </View>

            {/* Login Button */}
            <View
                style={{ 
                    height: 0.1 * height,
                    width: 0.8 * width,

                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <TouchableOpacity
                    style={ [
                        { 
                            backgroundColor: '#F8C660',
                            height: 0.06 * height,
                            width: 0.8 * width,
                        }, 
                        globalStyles.button
                    ] }
                >
                    <Text style={globalStyles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View>

            {/* Sign Up Notification*/}
            <View 
                style={{ 

                    height: 0.2 * height, 
                    flexDirection: 'row' 
                }}
            >
                <Text
                    style= {{ 
                        fontFamily: 'Baloo2-Bold',
                        fontSize: 16,
                        color: 'white',
                    }}
                >
                    Don't have an account? 
                </Text>
                <TouchableOpacity>
                    <Text
                        style= {{
                            fontFamily: 'Baloo2-Bold',
                            fontSize: 16,
                            color: '#FFD912',
                        }}
                    > Sign up.</Text>
                </TouchableOpacity>
            </View>

        </ImageBackground>
    )
}