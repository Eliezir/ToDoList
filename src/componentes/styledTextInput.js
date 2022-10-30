import React, {useState } from 'react';
import { View,Text,TextInput,StyleSheet } from 'react-native';

export default function StyledInput(props) {
    const[inputBorderColor, setInputBorderColor] = useState();

    const customOnFocus = () =>{
      props?.onFocus;
      setInputBorderColor('#7442d8')
    }
    const customOnBlur = () =>{
      props?.onBlur;
      setInputBorderColor('grey')
    
    }

   
  
 return (
    <View style={styles.container}>

      <TextInput onFocus={customOnFocus} onChangeText={props.set} value={props.variable} onBlur={customOnBlur} style={[styles.inputText,{borderColor:inputBorderColor}]} placeholder={props.placeHolder} placeholderTextColor="rgba(255,255,255,0.6)" selectionColor="#7442d8"  />
   </View>
  );
}

const styles = StyleSheet.create({  
    container:{
        width:"100%",
    },
    inputText: {
        color:'white',
        height: 40,
        width:'100%',
        borderBottomWidth: 1,
        /* backgroundColor:"#7442d8", */
        padding: 10,
        paddingLeft:0,
        margin:0,
      },
   
});