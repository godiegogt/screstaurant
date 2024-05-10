import React from 'react'
import { useEffect, useState } from 'react';
import { Text, View, KeyboardAvoidingView } from "react-native";

import { useDispatch, useSelector } from 'react-redux';
import {Alert, FormInput} from '../common';
import Theme from '../../constants/Theme';
import { CheckBox,Button } from '@rneui/themed';
import { updatePaymentMethod } from '../../features/reservation/reservationSlice';

const methods=[
  {
    FormaPago:'Credito',
    FormaPagoID:'1'
  },
  {
    FormaPago:'Contado',
    FormaPagoID:'2'
  },
  {
    FormaPago:'Cheque',
    FormaPagoID:'3'
  },
  {
    FormaPago:'Visa',
    FormaPagoID:'4'
  },
  
]

const MixedPayment = ({ amount}) => {
  const [message, setmessage] = useState("");
  const [isCredit, setIsCredit] = React.useState(false);
  const [paymentMethodStateInitial, setpaymentMethodStateInitial] = useState([]);
  const [paymentMethodState, setpaymentMethodState] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    loadPaymentMethds();
  }, []);

  useEffect(() => {

    const changeToCredit=()=>{
     if(isCredit){
      dispatch(updatePaymentMethod('Credito'));
      setpaymentMethodState(paymentMethodStateInitial.map(item => item.FormaPago=='Crédito' ? { ...item, Monto: amount} : item));
     
     }else{
      dispatch(updatePaymentMethod('Combinado'));
     }
    }

    changeToCredit();
   
  }, [isCredit]);
  


  const loadPaymentMethds = async () => {
    const request = methods
    const paymentMethods=request.map(item => { return { ...item ,Monto: parseFloat(0.00) } });
   
    setpaymentMethodStateInitial(paymentMethods);
    setpaymentMethodState(paymentMethods);
  }

  const handleChange = (value, item) => {
    setpaymentMethodState(paymentMethodState.map(item2 => item2.FormaPagoID == item.FormaPagoID ? { ...item2, Monto: (value)} : item2));
  }


  const submit = () => {
    addCombinatedPayment();

  }

  const addCombinatedPayment = () => {
    try {
      if (validateFields()) {

        const payload = paymentMethodState.map((item) => { return { ...item, Monto: parseFloat(item.Monto)} });
     
        callback(payload);
      } else {
        setmessage(`La suma de todos los métodos de pago debe dar un total de: ${parseFloat(amount).toFixed(2)}`)
      }
    } catch (error) {
      console.log(error)
      setmessage("Caracteres inválidos.")
    }
  }

  const validateFields = () => {
    try {
     //Validate if is payment method credit
   
     if(isCredit){
return true;
     }else{
      var sum = paymentMethodState.reduce((accumulator, item) => {
        return parseFloat(accumulator) + parseFloat(item.Monto)
      }, 0);
  
      return sum == amount
     }
    } catch (error) {
      console.log(error)
      return false
    }
  }

  return (
    
        <View>
          <Alert setMessage={setmessage} type={'warning'}  message={message} />
          <View style={{ flex: 1, width: '100%' }}>
            <Text>{`La suma de todos los métodos de pago debe dar un total de: Q ${parseFloat(amount).toFixed(2)}`}</Text>

            <CheckBox
              center
              title='Crédito'
              checked={isCredit}
              onPress={() => setIsCredit(!isCredit)}
            />

            {!isCredit && paymentMethodState.filter(item => item.Tipo != "Crédito").map(item => {
              return <FormInput key={item.FormaPago} color={Theme.colors.primary} title={item.FormaPago} type='text' placeholder={item.Monto.toString()} val={item.Monto.toString()} onChange={(value) => { handleChange(value, item) }} />

            })}
          </View>
          {/* <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', height: 70 }}>
            <Button
              onPress={submit}
              buttonStyle={{ borderRadius: 10 }}
              title={'Aceptar'}
              color="success"
            />
           
          </View> */}
        </View>

  )
}

export default MixedPayment