import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, Button } from "react-native";
import { globalStyles } from '../globalStyles/globalStyles';
import { useUser } from '../components/UserContext';

export default function Settings({ navigation }){
    const { userState } = useUser();
    const [modalVisible, setModalVisible] = useState(false);

    const handleDelete = async () => {
        try {
            const response = await fetch(
                'http://129.114.24.200:8001/delete_account', {
                method: 'POST',
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  uid: userState.userId,
                }),
              }
            )

            const data = await response.json();
            console.log(data)
        } catch(error) {
            console.log('Error fetching data: ', error);
        } finally {
            setModalVisible(false);
            navigation.navigate('Login');
        }
    }

    return (
        <View style={globalStyles.container}> 

            <TouchableOpacity 
                onPress={() => navigation.navigate('About')}
                style={styles.redirect}
            >
                <Text style={styles.text}> About </Text>
            </TouchableOpacity>

            <TouchableOpacity 
                onPress={() => navigation.navigate('Login')}
                style={styles.redirect}
            >
                <Text style={styles.text}> Logout </Text>
            </TouchableOpacity>

            <TouchableOpacity 
                onPress={() => setModalVisible(true)}
                style={styles.redirect}
            >
                <Text style={styles.text}> Delete Account </Text>
            </TouchableOpacity>
            
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Are you sure you want to delete your account?</Text>
                        <View style={styles.modalButtons}>
                            <Button
                                title="No"
                                onPress={() => setModalVisible(!modalVisible)}
                            />
                            <Button
                                title="Yes"
                                onPress={handleDelete}
                                color="red"
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    redirect: {
        padding: 10,
        marginVertical: 10,
    },
    text: {
        color: '#38CB82',
        fontWeight: 'bold',
        fontFamily: 'Nunito-Bold',
        fontSize: 20,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 18,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
});
