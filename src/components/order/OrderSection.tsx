import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Button, Card } from '@rneui/themed'
import OrderComponent from './OrderComponent'
import OrderButtonsSection from './OrderButtonsSection'
import { materialTheme } from '../../constants'
import { Text } from '../common'

const OrderSection = () => {
  return (
    <Card containerStyle={styles.OrderSectionCOntainer}>
      <Card.Title><Text h4 bold>Orden</Text></Card.Title>
      <Card.Divider/>
      <OrderComponent/>
     <OrderButtonsSection/>
    </Card>
  )
}

export default OrderSection

const styles = StyleSheet.create({
  OrderSectionCOntainer:{
    marginBottom:materialTheme.sizes.BASE
  }
})