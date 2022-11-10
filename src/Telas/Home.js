import { useEffect, useState } from 'react';
import { StyleSheet, TextInput, View, SafeAreaView, StatusBar, FlatList, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
/* import tasksList from '../../Tasks.service' */
import TaskCard from '../componentes/taskCard'
import AbsoluteButton from '../componentes/absoluteButton';
import Dropdown from '../componentes/dropdown'
import { useIsFocused } from "@react-navigation/native";
var filtro;
let tasksList = [];


export const grupos = [
  { key:1 ,label: 'Todas as listas', value: 'Todas as listas' },
];


export default function Home() {
  let [loadTask, setLoadTask] = useState(0);
  const [tasks, setTasks] = useState()
  const [header, setHeader] = useState("Home")
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState(false)

/* Crud */
  const updateTask = (task) => {
    fetch(`http://localhost:3000/tasks/${task}`, {
      method: 'PATCH',
      body: JSON.stringify({
        status: 'done'
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .catch(error => console.log('error', error));
    setLoadTask(loadTask += 1)
  }
  const deleteTask = (task) => {
    var formdata = new FormData();
    var requestOptions = {
      method: 'DELETE',
      body: formdata,
      redirect: 'follow'
    };
    fetch(`http://localhost:3000/tasks/${task}`, requestOptions)
      .catch(error => console.log('error', error));
    setLoadTask(loadTask += 1)
    console.log('setou')
  }
  useEffect(() => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    fetch("http://localhost:3000/tasks", requestOptions)
      .then(response => response.json())
      .then(result => {
        tasksList = [...result];
        setTasks([...result])
      })
      .catch(error => console.log('error', error))
  }, [loadTask])

 /*  Atualiza a pagina quando trocar da pagina de criar para home */
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      setLoadTask(loadTask += 1)
      setHeader("Home")
      setSearch("")
    }
  }, [isFocused]);

/* pesquisar por nome */
  useEffect(() => {
    filterSearch(search)
  }, [search])

  const filterSearch = (search) => {
    let filteredSearch = [];
    tasksList.map((task) => {
      if (task.titulo.toLowerCase().includes(search.toLowerCase())) {
        filteredSearch.push(task);
      }
    });
    setTasks(filteredSearch);
  }

/* pesquisar por grupos */
  const filterList = (filter) => {
    filtro = filter;
    var filteredTasks = []
    if (filter == 'Todas as listas') {
      filteredTasks = [...tasksList]
      setFilter(false)
    }
    else {
      setFilter(true)
      tasksList.forEach((task) => {
        if (task.grupo == filter) {
          filteredTasks.push(task)
        }
      })
    }
    setTasks(filteredTasks)

  }

  const pass = () => { }


/*   marcar como concluida */
  const checked = (item) => {
    updateTask(item.id)
    var index = tasksList.map(g => g.titulo).indexOf(item.titulo)
    let deletedGroup = tasksList[index].grupo
    setTimeout(() => { deleteTask(item.id)
      if (filter == true) {
        filterList(filtro)
      }
    },1000)
    async () => { setTimeout(() => {  
    const teste = tasksList.some((task) => {
      return task.grupo == deletedGroup
    })
    console.log(tasksList)
    if (!teste) {
      grupos.splice(grupos.map(g => g.label).indexOf(deletedGroup), 1)
    }
  }, 2000)}
 
  }

/* grupos para o dropdown */
useEffect(() => {
tasksList.map((task) => {
  if(!(grupos.some((grupo)=>{
    return grupo.label == task.grupo}))){
    grupos.push({id:grupos.length+1, label:task.grupo , value:task.grupo})
  }
})
},[tasks])

  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <View style={[styles.header, { display: header == "Home" ? 'flex' : 'none', justifyContent: "space-between", }]}>
        <Dropdown function={(item) => filterList(item)} data={grupos} />
        <View style={{ flexDirection: "row" }}>
          <Icon name="search" size={20} color={"#ffff"} style={styles.headerIcon} onPress={() => setHeader("Search")} />
        </View>
      </View>
      <View style={[styles.header, { display: header == "Search" ? 'flex' : 'none' }]}>
        <Icon style={{ marginLeft: 15 }} name="arrow-left" size={20} color={"#ffff"} onPress={() => { setHeader("Home"); setSearch("") }} />
        <Icon name="search" size={20} color={"#ffff"} style={styles.headerIcon} />
        <TextInput style={styles.headerInput} placeholder="Pesquisar" placeholderTextColor="rgba(255,255,255,0.6)" selectionColor="#ffff" value={search} onChangeText={setSearch} />
        <Icon style={[styles.arrowIcon, { display: search == "" ? 'none' : 'flex' }]} name="x" size={20} color={"#ffff"} onPress={() => setSearch("")} />
      </View>
      <FlatList style={{ width: "100%", alignContent: "center" }} data={tasks} renderItem={({ item, index }) => <TaskCard data={item} function={checked} functionIndex={item} key={index} />}>
      </FlatList>
      <AbsoluteButton func={pass} navigate={'Create'} simbol={"+"} />
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectList: {
    backgroundColor: 'green',
    width: 300,
    marginLeft: 500,
    fontSize: 20,
    fontWeight: "bold",
  },
  headerIcon: {
    marginLeft: 50,
    marginRight: 10,
  },
  headerInput: {
    width: 175,
    color: "#ffff",
  }



});

