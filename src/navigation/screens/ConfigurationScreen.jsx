import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import Icon from "react-native-vector-icons/FontAwesome5";
import { useDispatch, useSelector } from 'react-redux';

//Ducks


//Const
import { printerCongifs } from '../../constants/variables';
import { updateExportType, updatePrinterConfig } from '../../features/configurations/configurationSlice';
import { ListItem } from '@rneui/themed';
import Theme from '../../constants/Theme';





const ConfigHomeScreen = ({ navigation }) => {
  // const [isSinmi, setisSinmi] = React.useState("");
  const dispatch = useDispatch();
  const configurations = useSelector(state => state.configuration);
  const [selectedButtonIndex, setSelectedButtonIndex] = React.useState(configurations.exporttypes.index);
  const [sizeSelected, setsizeSelected] = React.useState(configurations.printerConfig.id)
  const changeExportType = (index) => {
    setSelectedButtonIndex(index);


    dispatch(updateExportType(exporttypes[index]));



  }

  const changePrinter = (index) => {

    const sizeSelected2 = printerCongifs.filter(item => item.id == index)[0];

    dispatch(updatePrinterConfig(sizeSelected2));
    setsizeSelected(sizeSelected2.id)

  }

  const exporttypes = [
    {
      name: "Ticket",
      index: 0
    },
    {
      name: "PDF",
      index: 1
    }
  ]

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
          <ListItem.Title>Generar factura como</ListItem.Title>
        </ListItem.Content>
        <ListItem.ButtonGroup
          buttons={exporttypes.map((item) => { return item.name })}
          selectedIndex={selectedButtonIndex}
          onPress={changeExportType}
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
        configurations.exporttypes.name == 'Ticket'
        &&
        <TouchableOpacity onPress={() => navigation.navigate("EditPrinterScreen")}>
          <ListItem bottomDivider>
            <Icon name={'print'} size={20} color={Theme.colors.icon} />
            <ListItem.Content>
              <Text h2>Configurar impresora</Text>
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
            <Icon name={'user'} size={20} color={Theme.colors.icon} />
            <ListItem.Content>
              <Text h2>Cambiar Servidor</Text>
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
