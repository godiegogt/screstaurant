import React, { Component, FC, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import CustomerItem from './CustomerItem'
import { materialTheme } from '../../constants'
import { useDispatch, useSelector } from 'react-redux'
import { selectCustomer } from '../../features/reservation/reservationSlice'
import { IRootState } from '../../app/store'

type CustomersContainerState = {
 
}

const CustomersContainer: FC<CustomersContainerState> = () => {
 
  const dispatch = useDispatch();
//const customerSelected = useSelector((state:IRootState) => state.reservations.selectors.customer );
const [customerSelected, setCustomerSelected] = useState(1)

const customersNumber = useSelector((state:IRootState) => state.reservations.selectors.table ).NumeroPersonas
  const pickCustomer = (customerid: number) => {
dispatch(selectCustomer(customerid))
setCustomerSelected(customerid)
  }

  const PrintCustomers=()=>{
    let customers:Array<any>=[];



    for (let index = 0; index < customersNumber; index++) {
      
     //customers+=<CustomerItem key={index+1} item={index+1} pickCustomer={pickCustomer} customerSelected={customerSelected} />
    customers.push(<CustomerItem key={index+1} item={index+1} pickCustomer={pickCustomer} customerSelected={customerSelected} />)
    
    }

    return customers
  }

  return (
    <View style={styles.container}>

      
        
         <PrintCustomers/>
        
    

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
