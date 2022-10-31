import { useEffect, useState } from 'react';
import { StyleSheet, TextInput, View, SafeAreaView, StatusBar, FlatList, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import tasksList from '../../Tasks.service'
import TaskCard from '../componentes/taskCard'
import AbsoluteButton from '../componentes/absoluteButton';
import Dropdown from '../componentes/dropdown'
import { useIsFocused } from "@react-navigation/native";
import { grupos } from '../componentes/dropdown'
var filtro;


export default function Home() {
  const [tasks, setTasks] = useState([...tasksList])
  const [header, setHeader] = useState("Home")
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState(false)



  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      setTasks([...tasksList]);
      setHeader("Home")
      setSearch("")
    }
  }, [isFocused]);


  useEffect(() => {
    filterSearch(search)
  }, [search])

  const filterSearch = (search) => {
    let filteredSearch = [];
    tasksList.forEach((task) => {
      if (task.titulo.toLowerCase().includes(search.toLowerCase())) {
        filteredSearch.push(task);
      }
    });
    setTasks(filteredSearch);
  }

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

  const checked = (item) => {
    item.status ='done'
    var index = tasksList.map(g => g.titulo).indexOf(item.titulo)
    let deletedGroup = tasksList[index].grupo
    setTimeout(()=>{
      tasksList.splice(index, 1)
      newTask = [...tasksList]
      setTasks(newTask)
    },1000)
  
    let newTask = [...tasksList]
    setTasks(newTask)
    if (filter == true) {
      filterList(filtro)
    }
    const teste = tasksList.some((task) => {
      return task.grupo == deletedGroup
    })
    if (!teste) {
      grupos.splice(grupos.map(g => g.label).indexOf(deletedGroup), 1)
    }
  }

  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <View style={[styles.header, { display: header == "Home" ? 'flex' : 'none', justifyContent: "space-between", }]}>
        <Dropdown function={(item) => filterList(item)} />
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
      <FlatList style={{ width: "100%", alignContent: "center" }} data={tasks} renderItem={({ item, index }) => <TaskCard data={item} function={checked} functionIndex={item} key={index}/>}>
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

