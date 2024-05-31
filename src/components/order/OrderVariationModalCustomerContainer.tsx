import { FC, useEffect, useState } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'

import CustomerItem from '../customers/CustomerItem'
import { materialTheme } from '../../constants'
import { ICustomer } from '../../interfaces'




type OrderVariationModalCustomerContainer = {
 
  customerId: string,
  changeCustomer: (newCustomerId: string) => void
  customers:any[]
}

const OrderVariationModalCustomerContainer: FC<OrderVariationModalCustomerContainer> = ({  customers,customerId, changeCustomer }) => {
 




  return (
    <View style={styles.container}>
      <FlatList
        data={customers}
        // renderItem={({item}) => <CategoryItem pickRoom={setRoomSelected} roomSelected={roomSelected} key={item.title} title={item.title} />}
        renderItem={({ item }) => <CustomerItem key={item.title} item={item} pickCustomer={changeCustomer} customerSelected={customerId} />}
        keyExtractor={item => item.title.toString()}
        horizontal
      />

      {/* {
          customers.map(item => <CustomerItem key={item.title} item={item} pickCustomer={changeCustomer} customerSelected={customerId} />)
        } */}


    </View>
  )

}



export const styles = StyleSheet.create({
  container: {
    height: 50,

    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: materialTheme.sizes.BASE



  }
})



export default OrderVariationModalCustomerContainer
