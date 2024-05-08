import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { BottomSheet, Button, ListItem } from '@rneui/themed'
import { materialTheme } from '../../constants'
import { useReservation } from '../../hooks'
import { useNavigation } from '@react-navigation/native'

const OrderButtonsSection = () => {
  const {navigate}=  useNavigation();
 const reservationhook= useReservation()
  const [isVisible, setIsVisible] = useState(false)
  const list = [
    { title: 'Pre-cuenta' ,
    onPress: () => setIsVisible(false),},
    // { title: 'Cambiar orden de comensal',
    // onPress: () => setIsVisible(false), },
    { title: 'Facturar' ,
    onPress: () => {setIsVisible(false);navigate('BillScreen')}},
    { title: 'Descuentos' ,
    onPress: () => setIsVisible(false),},
    {
      title: 'Cancel',
      containerStyle: { backgroundColor: 'red' },
      titleStyle: { color: 'white' },
      onPress: () => setIsVisible(false),
    },
  ];

const _sendReservation=()=>{
  reservationhook.sendReservation();
}

  return (
    <View style={styles.OrderButtonsSection}>
      <View style={styles.buttonContainer}>
      <Button title="Enviar Orden"  onPress={_sendReservation}/>
      </View>
      <View style={styles.buttonContainer}>
      <Button title="Otras opciones"  onPress={()=>{setIsVisible(true)}}/>
      </View>
      <Button title="Salir"  />

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
    OrderButtonsSection:{
        
    },
    buttonContainer:{
        marginBottom:materialTheme.sizes.BASE/2,
       
    }
})