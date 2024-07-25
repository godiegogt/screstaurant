import React, { Component, FC, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import CustomerItem from './CustomerItem'
import { materialTheme } from '../../constants'
import { useDispatch, useSelector } from 'react-redux'
import { selectCustomer } from '../../features/reservation/reservationSlice'
import { IRootState } from '../../app/store'
import { useFocusEffect } from '@react-navigation/native'

type CustomersContainerState = {

}

const CustomersContainer: FC<CustomersContainerState> = () => {

  const dispatch = useDispatch();
  const customerSelected = useSelector((state: IRootState) => state.reservations.selectors.customer);
  const customersNumber = useSelector((state: IRootState) => state.reservations.selectors.table.NumeroPersonas)
  const customersNumberDefinited = useSelector((state: IRootState) => state.configuration.customerNumberDefinided)

  useFocusEffect(
    React.useCallback(() => {
      pickCustomer(1);
    }, [])
  );


  const pickCustomer = (customerid: number) => {
    console.log('customer num: ' + customerid)
    dispatch(selectCustomer(customerid))
    //setCustomerSelected(customerid)
  }

  const PrintCustomers = () => {
    let customers: Array<any> = [];
    const customersNumberTemp = customersNumber == 0 ? customersNumberDefinited : customersNumber
    for (let index = 0; index < customersNumberTemp; index++) {
      customers.push(<CustomerItem key={index + 1} item={index + 1} pickCustomer={pickCustomer} customerSelected={customerSelected} />)
    }

    return customers
  }

  return (
    <View style={styles.container}>
      <PrintCustomers />
    </View>
  )

}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    marginVertical: materialTheme.sizes.BASE / 3



  }
})



export default CustomersContainer
