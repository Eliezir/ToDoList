import React from 'react';
import { TouchableOpacity,Text,StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function AbsoluteButton(props) {
    const navigation = useNavigation();
 return (
    <TouchableOpacity onPress={() => {navigation.navigate(props.navigate);props.func()}} style={styles.btnCreateComentario}>
    <Text style={styles.btnCreateComentarioTxt}>{props.simbol}</Text>
  </TouchableOpacity>
  );
}

const styles = StyleSheet.create({  btnCreateComentario: {
    position: "absolute",
    bottom: 50,
    right: 30,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#7442d8",
    justifyContent: "center",
    alignItems: "center"
  },
  btnCreateComentarioTxt: {
    fontSize: 30,
    color: "white",
    alignSelf: "center",
    fontWeight: "bold",
  },})