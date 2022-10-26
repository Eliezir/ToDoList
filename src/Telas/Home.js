import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TextInput, View, SafeAreaView, StatusBar, TouchableOpacity, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import tasksList from '../../Tasks.service'
import TaskCard from '../componentes/taskCard'
import AbsoluteButton from '../componentes/absoluteButton';



export default function Home() {
  const [tasks, setTasks] = useState([...tasksList])


  const filterTasks = (filter) => {
    const filteredTasks = []
    tasksList.forEach((task) => {
      if (task.grupo == filter) {
        filteredTasks.push(task)
      }
    })
    setTasks(filteredTasks)
  }

  const pass = () => {}

  const checked = (index) => {
    tasksList.splice(index, 1)
    const newTask = [...tasksList]
    setTasks(newTask)
  }
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <View style={styles.header}>
        <Text style={styles.selectList}>Select</Text>
        <View style={{ flexDirection: "row" }}>
          <Icon name="search" size={20} color={"#ffff"} style={styles.headerIcon} />
          <Icon name="more-vertical" size={20} color={"#ffff"} style={styles.headerIcon} />
        </View>
      </View>
      {tasks.map((task, index) => (<TaskCard titulo={task.titulo} function={checked} functionIndex={index} key={task.id} />))}
    <AbsoluteButton func={pass}navigate={'Create'} simbol={"+"}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#121212',
    alignItems: 'center',
    flex: 1,
  },
  header: {
    backgroundColor: '#7442d8',
    width: '100%',
    height: 55,
    display: 'flex',
    justifyContent: "space-between",
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectList: {
    color: "#ffff",
    marginLeft: 50,
    fontSize: 20,
    fontWeight: "bold",
  },
  headerIcon: {
    marginRight: 20,
  },



});

