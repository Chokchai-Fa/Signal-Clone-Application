import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, ScrollView  } from 'react-native';
import { Button ,Input } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import { db } from "../firebase";

const AddChatScreen = ({navigation}) =>{
  const [input, setInput] = useState('');


    useLayoutEffect(() => {
      navigation.setOptions({
        title:"Add a new Chat",
        headerBackTitle: "Chats",
      })
    }, [])

    const createChat = async () => {
        await db
        .collection('chats')
        .add({
          chatName: input
        })
        .then( () => {
          navigation.goBack();
        })
        .catch( (error) => alert(error) );
    };


    return(
        <View style={styles.container}>
          <Input
            placeholder="Enter a chat name"
            value = {input}
            onChangeText = { (text) => setInput(text) }
            onSubmitEditing={createChat}
            leftIcon = {
              <Icon name="wechat" type="antDesign" size={24} color="black" />
            }
            />
            <Button disabled={!input} onPress={createChat} title="Create new Chat"/>

        </View>
    );
};


const styles = StyleSheet.create({
  container:{

  }
});

export default AddChatScreen ;
