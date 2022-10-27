import React,{useState} from 'react';
import { StyleSheet, SafeAreaView, StatusBar, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import StyledInput from '../componentes/styledTextInput'
import AbsoluteButton from '../componentes/absoluteButton';
import tasksList from '../../Tasks.service'
import {grupos} from '../componentes/dropdown'

export default function CreateTask() {
  const[titulo,setTitulo] = useState(null)
  const[lista,setLista] = useState(null)

  const addTask = () =>{
  if(grupos.every((group)=>{return !(group.label.toLowerCase() === lista.toLowerCase())})){
  grupos.push({label:lista, value: lista})
  tasksList.push({tatus:"Active", titulo:titulo, grupo:lista})
  }
else{
  let index = grupos.map(g => g.label.toLowerCase()).indexOf(lista.toLowerCase())
  tasksList.push({tatus:"Active", titulo:titulo, grupo:grupos[index].label})
}

      

      
  }



  const navigation = useNavigation();
 return (
        <SafeAreaView style={styles.container}>
         <StatusBar/>
         <View style={styles.header}>
         <Icon style={styles.arrowIcon}name="arrow-left" size={20} color={"#ffff"} onPress={() => navigation.navigate('Home')}/>
        <Text style={styles.headerTitle}>New Task</Text>
      </View>
      <View style={styles.main}>
     <StyledInput set={setTitulo} textoLabel='O que tem para ser feito?'   placeHolder='Insira a tarefa aqui'/>
     <StyledInput set={setLista} textoLabel='Adicionar a lista' placeHolder='Default'/>
      </View>
      <AbsoluteButton func={addTask} navigate={'Home'} simbol={<Icon name="check" size={25}/>}/>
         </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor:"#121212"
    },
    header: {
      backgroundColor: '#7442d8',
      width: '100%',
      height: 55,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    headerTitle: {
      color: "#ffff",
      marginLeft: 10,
      fontSize: 20,
      fontWeight: "bold",
    },
    arrowIcon:{
      marginLeft:10,
    },
    main: {
      width:"80%",
      alignItems: 'flex-start',
      display:'flex',
    },
 
  
  });