import React, { Component, FC, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import CustomerItem from './CustomerItem'
import { materialTheme } from '../../constants'
import { useDispatch, useSelector } from 'react-redux'
import { selectCustomer } from '../../features/reservation/reservationSlice'
import { IRootState } from '../../app/store'


const tables = [
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
]

type CustomersContainerState = {
 
}

const CustomersContainer: FC<CustomersContainerState> = () => {
 
  const dispatch = useDispatch();
const customerSelected = useSelector((state:IRootState) => state.reservations.selectors.customer )

  const pickCustomer = (customerid: number) => {
   
    dispatch(selectCustomer(customerid))

  }


  return (
    <View style={styles.container}>

      <View style={styles.container}>
        {
          tables.map(item => <CustomerItem key={item.title} item={item} pickCustomer={pickCustomer} customerSelected={customerSelected} />)
        }
      </View>

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
