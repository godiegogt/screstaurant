import { ActivityIndicator, Alert, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, ButtonGroup, Card } from '@rneui/themed'
import { Text } from '../common'

import { materialTheme } from '../../constants'

import { useDispatch, useSelector } from 'react-redux'
import { IRootState } from '../../app/store'
import BillComponent from './BillComponent'
import CustomersContainer from '../customers/CustomersContainer'
import { updatePaymentType } from '../../features/reservation/reservationSlice'
import usePrinter from '../../hooks/usePrinter'
import useOrder from '../../hooks/useOrder'
import Theme from '../../constants/Theme'
import { useFocusEffect } from '@react-navigation/native'
import { printPreOrderService } from '../../services/OrderService'

const BillSection = () => {
 const dispatch = useDispatch()
  const [billingType, setBillingType] = useState(0);
  const {printPreBill}=usePrinter();
  const Table = useSelector((state: IRootState) => state.reservations.selectors.table);
  const BTPOS = useSelector((state: IRootState) => state.configuration.POSBT);
  const havePrinter = useSelector((state: IRootState) => state.configuration.havePrinter);
  const { order, getOrderById,isLoading } = useOrder();
  const customerSelected = useSelector((state:IRootState) => state.reservations.selectors.customer );
const [isLoading2, setisLoading2] = useState(false)
  useFocusEffect(
    React.useCallback(() => {

setTimeout(() => {
  if(Table.OrdenID){
    if(billingType==1){
      getOrderById(Table.OrdenID, customerSelected)
    }else{
      getOrderById(Table.OrdenID, 0)
    }
   }
}, 2000);

     
    }, [customerSelected,billingType])
  );



  const printPre=async ()=>{

    if (BTPOS){
      printPreBill(order)
    }else{
      if(Table.OrdenID!=undefined){
       try {
        setisLoading2(true)
        const response = await printPreOrderService(Table.OrdenID,customerSelected);
        setisLoading2(false)
       if(response!=null){
        Alert.alert("Pre-orden enviada.")
       }
       } catch (error) {
        setisLoading2(false)
       }
      }


    }





  }

  return (
    <Card containerStyle={styles.BillSectionContainer}>
      <Card.Title><Text h4 bold>Orden</Text></Card.Title>
      <Card.Divider />
    {
      !isLoading
      ?
<BillComponent order={order}/>
:
<ActivityIndicator color={Theme.colors.primary}/>
    }
      
      <Card.Divider />
      <ButtonGroup
        buttons={['UNIFICADO', 'SEPARADO']}
        selectedIndex={billingType}
        onPress={(value) => {
          setBillingType(value);
        
          dispatch(updatePaymentType(value==0?'UNIFICADO':'DIVIDIDO'))

        }}
        containerStyle={{ marginBottom: 20 }}
      />
{
billingType==1&&<CustomersContainer />
}
    {
      BTPOS!='' || havePrinter.index==0 && <Button loading={isLoading2} onPress={printPre} disabled={isLoading2}>Imprimir precuenta</Button>
    }
        
      
       
          
     
      
     
    </Card>
  )
}

export default BillSection

const styles = StyleSheet.create({
  BillSectionContainer: {
    marginBottom: materialTheme.sizes.BASE
  }
})