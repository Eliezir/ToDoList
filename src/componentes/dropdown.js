import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';


export const grupos = [
  { key:1 ,label: 'Todas as listas', value: 'Todas as listas' },
  { key:2 ,label: 'ENEM', value: 'ENEM' },
  { key:3 ,label: 'IFAL', value: 'IFAL' },
  { key:4 ,label: 'feira', value: 'feira' },
  { key:5 ,label: 'Monitoria', value: 'Monitoria' },
];



export default function DropdownComponent (props){
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={styles.container}>
 
      <Dropdown
        style={[styles.dropdown, isFocus]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={grupos}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Todas as listas' : '...'}
        searchPlaceholder="Pesquisar..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {setValue(item.value);setIsFocus(false);props.function(item.value)
        }}
      />
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  dropdown: {
    marginLeft:'10%',
    width:200,
    height: 50,
    color:'black',
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    color:'white',
    fontSize: 16,
  },
  selectedTextStyle: {
    color:'white',
    fontSize: 16,
  },
  iconStyle: {
    width: 25,
    height: 25,
   Color:"#ffffff"
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color:'green'
  },
});

