import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, StatusBar, View, Text, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import IconList from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import StyledInput from '../componentes/styledTextInput'
import AbsoluteButton from '../componentes/absoluteButton';
import tasksList from '../../Tasks.service'
import { grupos } from '../componentes/dropdown'
import { Picker, PickerIOS } from '@react-native-picker/picker';

export default function CreateTask() {
  const [titulo, setTitulo] = useState(null)
  const [lista, setLista] = useState('Default')
  const [modalVisible, setModalVisible] = useState(false)

  const addTask = () => {
    if (grupos.every((group) => { return !(group.label.toLowerCase() === lista.toLowerCase()) })) {
      grupos.push({ label: lista, value: lista })
      tasksList.push({ tatus: "Active", titulo: titulo, grupo: lista })
    }
    else {
      let index = grupos.map(g => g.label.toLowerCase()).indexOf(lista.toLowerCase())
      tasksList.push({ tatus: "Active", titulo: titulo, grupo: grupos[index].label })
    }
  }
  let gruposShow = grupos
  gruposShow[0].label == 'Todas as listas' ? gruposShow.splice(0, 1) : {};

  let gruposItem = gruposShow.map((g, k) => {
    var nome = g.label;
    return <Picker.Item key={k} value={g.label} label={g.label} />
  })


  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <View style={styles.header}>
        <Icon style={styles.arrowIcon} name="arrow-left" size={20} color={"#ffff"} onPress={() => navigation.navigate('Home')} />
        <Text style={styles.headerTitle}>New Task</Text>
      </View>
      <View style={styles.main}>
      <Text style={styles.inputLabel}>O que tem para ser feito?</Text>
        <StyledInput set={setTitulo} placeHolder='Insira a tarefa aqui' />
        {/*  <StyledInput set={setLista} textoLabel='Adicionar a lista' placeHolder='Default'/> */}
        <Text style={styles.inputLabel}>Adicionar a lista</Text>
        <View style={styles.listaInput}>
        <Picker dropdownIconColor={'#ffff'} style={styles.picker} selectedValue={lista} onValueChange={(itemValue) => setLista(itemValue)}>
          {gruposItem}
        </Picker>
        <IconList name="playlist-plus" size={25} color={"#ffff"} />
        </View>
      </View>
      <AbsoluteButton func={addTask} navigate={'Home'} simbol={<Icon name="check" size={25} />} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: "#121212"
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
  arrowIcon: {
    marginLeft: 10,
  },
  main: {
    width: "80%",
    alignItems: 'flex-start',
    display: 'flex',
  },
  picker: {
    color: "#FFFFFF",
    width: "90%"
  },
  listaInput:{
    width: '100%', 
    display: 'flex', 
    flexDirection: 'row', 
    alignItems: 'center'
  },
  inputLabel: {
    color:'white',
    margin:0,
    marginTop:50,
    fontWeight:'Bold',
    marginBottom:10,
    fontSize:20,
  }


});