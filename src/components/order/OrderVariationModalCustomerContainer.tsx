import  {  FC } from 'react'
import { View, StyleSheet } from 'react-native'

import CustomerItem from '../customers/CustomerItem'
import { materialTheme } from '../../constants'



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
]

type OrderVariationModalCustomerContainer = {
 customerId:string,
 changeCustomer:(newCustomerId:string)=>void
}

const OrderVariationModalCustomerContainer: FC<OrderVariationModalCustomerContainer> = ({customerId,changeCustomer}) => {

  return (
    <View style={styles.container}>

    
        {
          customers.map(item => <CustomerItem key={item.title} item={item} pickCustomer={changeCustomer} customerSelected={customerId} />)
        }
     

    </View>
  )

}



export const styles = StyleSheet.create({
  container: {
    height:50,
   
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: materialTheme.sizes.BASE 



  }
})



export default OrderVariationModalCustomerContainer
