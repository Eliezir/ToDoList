import React from 'react';
import { View,StyleSheet,Text,TouchableOpacity } from 'react-native';
import StyledInput from './styledTextInput'

export default function componentes(props) {
 return (
   <View style={styles.container}>
    <View style={styles.modal}>
      <Text style={[props.inputLabel,{marginTop:0}]}>Nova Lista</Text>
  <StyledInput set={props.set}  placeHolder='Default'/> 
  <View style={styles.buttonView}>
<TouchableOpacity style={styles.modalButton} onPress={props.fechar}>
  <Text style={styles.buttonText}>Fechar</Text>
</TouchableOpacity>
<TouchableOpacity style={styles.modalButton} onPress={props.add}>
<Text style={styles.buttonText}>Adicionar</Text>
</TouchableOpacity>
  </View>
  </View>
   </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal:{
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderRadius: 5,
    padding:15,
    width:'70%',
    height:225,
    backgroundColor:'#242424',
    alignContent:'flex-end'
  },
  buttonText:{
    color:'#6320ee',
    fontWeight:'bold'
  },
  modalButton: {
    padding:10,
  },
  buttonView:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    marginTop:'20%',
  }
 

})