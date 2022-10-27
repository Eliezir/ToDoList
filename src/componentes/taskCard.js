import React from 'react';
import { View,TouchableOpacity,Text,StyleSheet } from 'react-native';

export default function componentes(props) {
 return (
    <View key={props.id} style={styles.taskCard}>
    <TouchableOpacity onPress={() => props.function(props.functionIndex)}style={styles.check}></TouchableOpacity>
    <View>
    <Text style={styles.taskTittle}>{props.data.titulo}</Text>
    <Text style={styles.taskGroup}>{props.data.grupo}</Text>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
taskCard:{
    width:"80%",
    marginLeft:"10%",
    height:70,
    backgroundColor:"#242424",
    margin:10,
    borderRadius:10,
    alignItems:"center",
    justifyContent: 'flex-start',
    flexDirection:"row"
  },
  taskTittle:{
    color:'white',
    fontSize:15,
    fontWeight:'bold'
  },
  taskGroup: {
    color:'rgba(255,255,255,0.5)',
    fontSize:12,
  },
  check:{
    height:15,
    width:15,
    border:"solid 2px grey",
    borderRadius:3,
    marginLeft:15,
    marginRight:15,
    backgroundColor:"#121212"
  }
});