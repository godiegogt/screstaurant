import { StyleSheet, Text, View,ScrollView } from 'react-native';
import React from 'react';

import {
    BLEPrinter,
    USBPrinter,
 
  } from "react-native-thermal-receipt-printer-image-qrv2";
import {PrinterPicker} from '../../components/common/index';
import { useSelector } from 'react-redux';
import { IRootState } from '../../app/store';
import { materialTheme } from '../../constants';


const EditPrinterScreen = () => {
 const [currentPrinter, setCurrentPrinter] = React.useState<any>();
 const POSBT=useSelector((state:IRootState)=>state.configuration.POSBT)

    React.useEffect(() => {
        BLEPrinter.init().then(()=> {
          BLEPrinter.connectPrinter(POSBT).then(
            setCurrentPrinter,
            error => console.warn(error))
        });
      }, []);

      

  return (
    <ScrollView style={styles.container}>
     
      <PrinterPicker/>

    </ScrollView>
  );
};

export default EditPrinterScreen;

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
        padding:materialTheme.sizes.padding_screen
    }
});
