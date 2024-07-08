import { StyleSheet, } from 'react-native'
import React from 'react'
import { Card } from '@rneui/themed'
import CustomersContainer from '../customers/CustomersContainer'
import Text from './Text'

const CustomerSection = () => {
  return (
    <Card>
    <Card.Title><Text h4  bold>Comensal</Text></Card.Title>
    <Card.Divider/>
 
    <CustomersContainer/>
</Card>
  )
}

export default CustomerSection

const styles = StyleSheet.create({})