import React, { useLayoutEffect ,useState } from "react";
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import {StatusBar} from 'expo-status-bar'
import {Button, Input, Text  } from 'react-native-elements';

import { auth } from "../firebase";

const RegisterScreen = ( { navigation } ) => {

  const [ name, setName] = useState("");
  const [ email, setEmail] = useState("");
  const [ password, setPassword] = useState("");
  const [ imageUrl, setImageUrl] = useState("");

  const register = () => {
    auth.createUserWithEmailAndPassword(email, password)
    .then((authUser) => {
        authUser.user.updateProfile({
          displayName: name,
          photoURL: imageUrl || "https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png"
        });
    })
    .catch(error => alert((error.message)))
  };

  useLayoutEffect( () => {
    navigation.setOptions({
      headerBackTitle:"Back to Login"
    })
  }, [navigation])

  return(
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <Text h3 style={{ marginBottom: 50}}>
          Create a Signal account
      </Text>
      <View style={styles.inputContainer}>
        <Input
          placeholder="Full Name"
          autofocus type='text'
          value = {name}
          onChangeText={ (text) => setName(text)}
        />
        <Input
          placeholder="Email"
          autofocus type='text'
          value = {email}
          onChangeText={ (text) => setEmail(text)}
        />
        <Input
          placeholder="Password"
          autofocus type='text'
          value = {password}
          secureTextEntry
          onChangeText={ (text) => setPassword(text)}
        />
        <Input
          placeholder="Profile Picture URL (optional)"
          autofocus type='text'
          value = {imageUrl}
          onChangeText={ (text) => setImageUrl(text)}
          onSubmitEditing={register}
        />
      </View>

      <Button
        raised
        onPress={register}
        title="Register"
        containerStyle={styles.button}
      />

      <View style={{height:100}}/>

    </KeyboardAvoidingView>

  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems: "center",
    justifyContent:'center',
    padding:10,
    backgroundColor:"white"
  },
  inputContainer:{
    width:300
  },
  button:{
    width:200,
    marginTop:10

  }
});
