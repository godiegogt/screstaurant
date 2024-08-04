import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { BottomSheet, Button, ListItem } from '@rneui/themed'
import { materialTheme } from '../../constants'
import { useReservation } from '../../hooks'
import { useNavigation } from '@react-navigation/native'
import { Alert, LoaderModal } from '../common'
import useOrder from '../../hooks/useOrder'
import { useDispatch } from 'react-redux'
import { restart } from '../../features/order/orderSlice'

const OrderButtonsSection = () => {
  const navigation = useNavigation();
  const [errormessage, seterrormessage] = useState('')
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const orderHook = useOrder();
  const list = [
    // { title: 'Pre-cuenta' ,
    // onPress: () => setIsVisible(false),},
    // { title: 'Cambiar orden de comensal',
    // onPress: () => setIsVisible(false), },
    {
      title: 'Pre-cuenta',
      onPress: () => { billing() }
    },
    // { title: 'Descuentos' ,
    // onPress: () => setIsVisible(false),},
    {
      title: 'Cancel',
      containerStyle: { backgroundColor: 'red' },
      titleStyle: { color: 'white' },
      onPress: () => setIsVisible(false),
    },
  ];

  const billing = () => {

    // reservationhook.sendReservation().then(()=>{
    //   //console.log('Ir a facturacion')
    //   setIsVisible(false);
    //   navigate('BillScreen');
    // }).catch(e=>{
    //   console.log('Error')
    // });
    setIsVisible(false)
    navigation.navigate('BillScreen');

  }

  const _sendReservation = async () => {
    setisLoading(true)
    try {
      const response = await orderHook.sendOrder();
      if (response == null) {
        navigation.navigate("RoomsScreen");
      } else {
        seterrormessage(response);
      }


    } catch (error) {
      
    }finally{
      setisLoading(false)
    }

  }

  const returnToIndex = () => {
    navigation.navigate("RoomsScreen");
  }

  return (
    <View style={styles.OrderButtonsSection}>
      {
        isLoading && <LoaderModal />
      }
      {
        orderHook.isLoading
        &&
        <LoaderModal />}
      <Alert message={errormessage} type='warning' setMessage={() => { seterrormessage('') }} />
      <View style={styles.buttonContainer}>
        <Button title="Enviar Orden" disabled={orderHook.isLoading} loading={orderHook.isLoading} onPress={_sendReservation} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Otras opciones" onPress={() => { setIsVisible(true) }} />
      </View>
      <Button title="Salir" onPress={_sendReservation} />

      <BottomSheet modalProps={{}} isVisible={isVisible}>
        {list.map((l, i) => (
          <ListItem
            key={i}
            containerStyle={l.containerStyle}
            onPress={l.onPress}
          >
            <ListItem.Content>
              <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </BottomSheet>
    </View>
  )
}

export default OrderButtonsSection

const styles = StyleSheet.create({
  OrderButtonsSection: {

  },
  buttonContainer: {
    marginBottom: materialTheme.sizes.BASE / 2,

  }
})