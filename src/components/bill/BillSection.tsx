import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { ButtonGroup, Card } from '@rneui/themed'
import { Text } from '../common'
import OrderComponent from '../order/OrderComponent'
import { materialTheme } from '../../constants'
import OrderVariationModalCustomerContainer from '../order/OrderVariationModalCustomerContainer'

const customers = [
  {
    title: 1,
    reserved: false,

  },
  {
    title: 2,
    reserved: false,

  },
  {
    title: 3,
    reserved: false,

  },
  {
    title: 4,
    reserved: false,

  }
  ,
  {
    title: 5,
    reserved: false,

  }
  ,
  {
    title: 6,
    reserved: false,

  }
  ,
  {
    title: 7,
    reserved: false,

  },
  {
    title: 8,
    reserved: false,

  }
]
const BillSection = () => {
    const [billingType, setBillingType] = useState(0)
    const [customerId, setCustomerId] = useState('')
  return (
    <Card containerStyle={styles.BillSectionContainer}>
      <Card.Title><Text h4  bold>Orden</Text></Card.Title>
      <Card.Divider/>
      <OrderComponent/>
     
    </Card>
  )
}

export default BillSection

const styles = StyleSheet.create({
    BillSectionContainer:{
        marginBottom:materialTheme.sizes.BASE
    }
})