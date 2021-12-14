import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity} from 'react-native';

const Auth = () => {
  return (
    <SafeAreaView style={styles.container}>
      <TextInput style={styles.textInput} placeholder='Введите логин'></TextInput>
      <TextInput style={styles.textInput} placeholder='Введите пароль'></TextInput>
        <TouchableOpacity style={styles.btn}><Text>Войти</Text></TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
        alignContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        borderWidth: 1,
        height: 30,
        padding: 0,
        paddingHorizontal: 5,
        margin: 5
    },
    btn: {
        backgroundColor: '#ffd769',
        margin: 10,
        padding: 4,
        paddingHorizontal: 40,
        borderRadius: 4,
        height: 30
    }
  });

export default Auth;
