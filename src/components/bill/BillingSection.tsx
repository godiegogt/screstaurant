import { StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, ButtonGroup, Card } from '@rneui/themed';
import { materialTheme } from '../../constants';
import { RadioButtonList, Text } from '../common';
import { methospayment } from '../../constants/variables';
import OrderVariationModalCustomerContainer from '../order/OrderVariationModalCustomerContainer';
import { useDispatch } from 'react-redux';

import MixedPayment from './MixedPayment';
import { updatePaymentType } from '../../features/reservation/reservationSlice';
import { useReservation } from '../../hooks';
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
const BillingSection = () => {
 const dispatch= useDispatch()
 const {getReservationTotal,getOrderByClintId} = useReservation()
  const [paymentMethod, setpaymentMethod] = useState('');
  const [isOpenMixedMethod, setIsOpenMixedMethod] = useState('');
  const [total, setTotal] = useState('0');

  const [billingType, setBillingType] = useState(0);
  const [customerId, setCustomerId] = useState('');

useEffect(() => {
  
  calTotal();
 
}, [billingType,customerId])

const calTotal=()=>{
  //Calc total if it's "UNIFICADO"
  if(billingType!=1){
let total=getReservationTotal();
total!=undefined&&total>0&&setTotal(total.toFixed(2))
  }else{
      //Calc total if it's "COMBINADO"
      let total=getOrderByClintId(Number(customerId));
      total!=undefined&&total>0&&setTotal(total.toFixed(2))
  }
}
  
  return (
    <Card containerStyle={styles.BillingSectionContainer}>
      <Card.Title><Text h4 bold>Cuenta</Text></Card.Title>
      <Card.Divider />
      <ButtonGroup
        buttons={['UNIFICADO', 'SEPARADO']}
        selectedIndex={billingType}
        onPress={(value) => {
          setBillingType(value);
          console.log('billingType',value)
          dispatch(updatePaymentType(value==0?'UNIFICADO':'DIVIDIDO'))

        }}
        containerStyle={{ marginBottom: 20 }}
      />
      {
        billingType != 0 && <OrderVariationModalCustomerContainer customers={customers} changeCustomer={(id: string) => { setCustomerId(id) }} customerId={customerId} />
      }
      <RadioButtonList title='Método de pago' items={methospayment} onChange={setpaymentMethod} value={paymentMethod} />
      {/* {
        paymentMethod=='Combinado'&&
        <RadioButtonList title='Método Combinado' items={methospayment} onChange={setMixedMethodSelected} value={mixedMethodSelected} />
      } */}
      {
        paymentMethod=='Combinado'&&<MixedPayment amount={total} />
      }
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <Text h3>Saldo: </Text>
        <Text h3 styles={{ color: materialTheme.colors.primary }}>{'Q. '+total.toString()}</Text>
      </View>

      <Button title={'Facturar'} onPress={() => { }} />

    </Card>
  )
}

export default BillingSection

const styles = StyleSheet.create({
  BillingSectionContainer: {
    marginBottom: materialTheme.sizes.BASE
  }
})