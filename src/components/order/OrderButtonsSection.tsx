import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button } from '@rneui/themed'
import { materialTheme } from '../../constants'

const OrderButtonsSection = () => {
  return (
    <View style={styles.OrderButtonsSection}>
      <View style={styles.buttonContainer}>
      <Button title="Enviar Orden"  />
      </View>
      <View style={styles.buttonContainer}>
      <Button title="Otras opciones"  />
      </View>
      
      <Button title="Salir"  />
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