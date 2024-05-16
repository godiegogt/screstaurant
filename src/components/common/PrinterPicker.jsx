import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert } from 'react-native'
import {
  BLEPrinter,

} from "react-native-thermal-receipt-printer-image-qrv2";
import { useDispatch, useSelector } from 'react-redux'
import Icon from "react-native-vector-icons/FontAwesome5";



import Theme from '../../constants/Theme';
import { updatePOSID } from '../../features/configurations/configurationSlide';



const PrinterPicker = () => {
  const configurations = useSelector(state => state.configuration);
  const dispatch = useDispatch();
  const [printers, setPrinters] = useState([]);
  const [currentPrinter, setCurrentPrinter] = useState();

  useEffect(() => {
    configurations.BTPermission != "" && initComponent();
  }, []);

  const initComponent = () => {
    BLEPrinter.init().then(() => {
      BLEPrinter.getDeviceList().then(setPrinters);
    });
  }

  const _connectPrinter = (printer) => {
    dispatch(updatePOSID(printer.inner_mac_address));
    //connect printer
    BLEPrinter.connectPrinter(printer.inner_mac_address).then(
      () => {
        setCurrentPrinter;
        alert("Dispositivo connectado");

      },
      error => console.warn(error))
    // console.log(printer.inner_mac_address)
  }

  const _disconnect = () => {
    BLEPrinter.closeConn().then(function (res, rej) {
      // console.log("Desconectamos la impresora.");
      alert("Se desconectó la impresora.")
      dispatch(updatePOSID(""));
    }).catch(function (error) {

      alert("Hubo un problema para desconectar la impresora." + error)
    })
  }
  const alert = (text) => {
    Alert.alert(
      "Notificación",
      text,
      [

        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );
  }
  return (
    <ScrollView>
      {configurations.BTPermission != "" ? <View>
        <View>
          <Text>
            Por favor, debe seleccionar una impresora:
          </Text>
        </View>
        {

          printers != undefined && printers.length > 0 ?
            <>

              {


                printers.map(printer => (
                  <TouchableOpacity style={[styles.printerItem, configurations.POSBT == printer.inner_mac_address && styles.itemSelected]} key={printer.inner_mac_address} onPress={() => _connectPrinter(printer)}>

                    <View style={{ flex: 6 }}>
                      <Text style={styles.itemText}>{`Nombre: ${printer.device_name}, ID: ${printer.inner_mac_address}`}</Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItem: 'center' }}>
                      <Icon
                        name='check-circle'
                        size={24}
                        color='#fff'
                      />

                    </View>

                  </TouchableOpacity>
                ))
              }

              {configurations.POSBT != "" && <>
                <View>
                  <Text>
                    Seleccione esta opción si está experimentando problemas para imprimir:
                  </Text>
                </View>
                <TouchableOpacity style={[styles.printerItem, styles.itemDisconnect]} onPress={_disconnect} >

                  <View style={{ flex: 6 }}>

                    <Text style={styles.itemText}>{`Desconectar.`}</Text>
                  </View>
                  <View style={{ flex: 1, justifyContent: 'center', alignItem: 'center' }}>
                    <Icon
                      name='ban'
                      size={24}
                      color='#fff'
                    />

                  </View>

                </TouchableOpacity>
              </>
              }

            </>
            :
            <Text style={{ marginTop: Theme.sizes.BASE, justifyContent: 'center', textAlign: 'center' }}>No se encontraron impresoras.</Text>
        }
      </View> : <Text style={{ marginTop: Theme.sizes.BASE, justifyContent: 'center', textAlign: 'center' }}>No hay permisos para acceder al bluetooth.</Text>}
    </ScrollView>
  )
}


export default PrinterPicker

const styles = StyleSheet.create({
  printerItem: {
    backgroundColor: Theme.colors.primary,
    padding: Theme.sizes.BASE,
    margin: Theme.sizes.BASE,
    flexDirection: 'row',
    borderRadius: Theme.sizes.BASE / 2
  },
  itemSelected: {
    backgroundColor: Theme.colors.success,
  },
  itemDisconnect: {
    backgroundColor: Theme.colors.error,
  },
  itemText: {
    color: '#fff',
    textAlign: 'center'
  }
})
