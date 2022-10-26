import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/Telas/Home.js'
import CreateComentario from './src/Telas/CreateTask'


const Stack = createNativeStackNavigator();

export default function App() {
 return (
  <View style={styles.container}>
   <NavigationContainer>
      <Stack.Navigator  screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Home}/>
      <Stack.Screen name="Create" component={CreateComentario}/>
        </Stack.Navigator>
  </NavigationContainer>
   </View>
  );


}const styles = StyleSheet.create({
  container: {
  backgroundColor: '#121212',
  flex:1,  }});