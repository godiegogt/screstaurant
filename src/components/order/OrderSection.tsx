import { ActivityIndicator, StyleSheet, View } from 'react-native'
import React from 'react'
import { Button, Card } from '@rneui/themed'
import OrderComponent from './OrderComponent'
import OrderButtonsSection from './OrderButtonsSection'
import { materialTheme } from '../../constants'
import { Text } from '../common'
import { useDispatch, useSelector } from 'react-redux'
import useOrder from '../../hooks/useOrder'
import { IRootState } from '../../app/store'
import { useFocusEffect } from '@react-navigation/native'
import Theme from '../../constants/Theme'
import { updateCustomerNumberDefinition } from '../../features/configurations/configurationSlice'

const OrderSection = () => {
  const dispatch = useDispatch()
  const Table = useSelector((state: IRootState) => state.reservations.selectors.table);
  const { order, getOrderById,isLoading } = useOrder();
  useFocusEffect(
    React.useCallback(() => {
      if (Table.OrdenID) {
        getOrderById(Table.OrdenID,0)
      }else{
        //Reset number customers
        resetCustomersNumber()
      }
    }, [])
  );


  const resetCustomersNumber=()=>{
    dispatch(updateCustomerNumberDefinition(0))
  }

  return (
    <Card containerStyle={styles.OrderSectionCOntainer}>
      <Card.Title><Text h4 bold>Orden</Text></Card.Title>
      <Card.Divider/>
     {
      !isLoading
      ?
      <OrderComponent order={order}/>
      :
      <ActivityIndicator color={Theme.colors.primary}/>
     }
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