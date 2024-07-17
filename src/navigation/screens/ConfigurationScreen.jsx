import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import Icon from "react-native-vector-icons/FontAwesome5";
import { useDispatch, useSelector } from 'react-redux';

//Ducks


//Const
import { printerCongifs } from '../../constants/variables';
import { updateHavePrinter, updatePrinterConfig } from '../../features/configurations/configurationSlice';
import { ListItem } from '@rneui/themed';
import Theme from '../../constants/Theme';


const havePrinterList=[
  {
    name: "Si",
    index: 0
  },
  {
    name: "No",
    index: 1
  }
]

const ConfigHomeScreen = ({ navigation }) => {
  // const [isSinmi, setisSinmi] = React.useState("");
  const dispatch = useDispatch();
  const configurations = useSelector(state => state.configuration);
  const [selectedButtonIndex, setSelectedButtonIndex] = React.useState(configurations.havePrinter.index);
  const [sizeSelected, setsizeSelected] = React.useState(configurations.printerConfig.id)
  const changehavePrinter = (index) => {
    setSelectedButtonIndex(index);


    dispatch(updateHavePrinter(havePrinterList[index]));



  }

  const changePrinter = (index) => {

    const sizeSelected2 = printerCongifs.filter(item => item.id == index)[0];

    dispatch(updatePrinterConfig(sizeSelected2));
    setsizeSelected(sizeSelected2.id)

  }

  

  return (
    <View style={styles.container}>
      {/* <ListItem bottomDivider>
                <ListItem.Content>
                  <ListItem.Title>¿Tiene impresora térmica?</ListItem.Title>
                </ListItem.Content>
                <Switch
                  value={isSinmi}
                  onValueChange={(value) => setisSinmi(value)}
                  color={theme.colors.primary}
                />
              </ListItem> */}

      <ListItem bottomDivider>
        <ListItem.Content>
          <ListItem.Title>Uso con impresora</ListItem.Title>
        </ListItem.Content>
        <ListItem.ButtonGroup
          buttons={havePrinterList.map((item) => { return item.name })}
          selectedIndex={selectedButtonIndex}
          onPress={changehavePrinter}
        />
      </ListItem>
      {configurations.printerConfig != null && <ListItem bottomDivider>
        <ListItem.Content>
          <ListItem.Title>Tamaño del papel</ListItem.Title>
        </ListItem.Content>
        <ListItem.ButtonGroup
          buttons={printerCongifs.map((item) => { return item.name })}
          selectedIndex={sizeSelected}
          onPress={changePrinter}
        />
      </ListItem>}
      {
        configurations.havePrinter.name == 'Si'
        &&
        <TouchableOpacity onPress={() => navigation.navigate("EditPrinterScreen")}>
          <ListItem bottomDivider>
            <Icon name={'print'} size={20} color={Theme.colors.icon} />
            <ListItem.Content>
            <ListItem.Title>Configurar impresora</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        </TouchableOpacity>
      }
        {
        configurations.userData.name =="Programador" 
        &&
        <TouchableOpacity onPress={() => navigation.navigate("ChangeServerScreen")}>
          <ListItem bottomDivider>
            
            <ListItem.Content>
            <ListItem.Title>Cambiar servidor</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        </TouchableOpacity>
      }
      
    </View>
  );
};

export default ConfigHomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
