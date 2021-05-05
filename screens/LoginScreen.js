import { StatusBar } from 'expo-status-bar';
import React, {  useEffect,useState } from 'react'
import { StyleSheet, Text, View, Image, KeyboardAvoidingView } from 'react-native'
import {Button, Input  } from 'react-native-elements';

import { auth } from "../firebase"

const LoginScreen = ( {navigation} ) => {

    const [email, setEmail ] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((authUser) => {

        if(authUser){
          navigation.replace("Home");
        }
      });
      return unsubscribe;
    },[])

    const signIn = () => {
      auth.signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error));
    }

    return (
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <StatusBar style='light' />
            <Image
                source={
                   require('../assets/logo1.png')
                }
                style={{width:200 , height: 200, borderRadius:15, marginTop:10 }}
            />
            <View style={styles.inputContainer}>
                <Input
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChangeText = { (text) => setEmail(text) }
                />
                <Input
                    placeholder="Password"
                    secureTextEntry
                    type="Password"
                    value={password}
                    onChangeText = { (text) => setPassword(text) }
                />
              
            </View>
            <Button containerStyle={styles.button} onPress={signIn} title="Login" />
            <Button
              containerStyle={styles.button}
              onPress={ () => navigation.navigate("Register") }
              type="outline"
              title="Register"
             />
            <View style={{ height: 100 }} />
        </KeyboardAvoidingView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container:{
      flex:1,
      alignItems:"center",
      justifyContent:"center",
      padding:10
    },
    inputContainer:{
      width:300,
      marginTop:20
    },
    button:{
      width:200,
      marginTop: 10
    }

})
