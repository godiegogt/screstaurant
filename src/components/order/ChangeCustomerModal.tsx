import { StyleSheet, View } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { Dialog, Divider } from '@rneui/themed';
import { Text } from '../common'
import { ICustomer, IOrder } from '../../interfaces';
import OrderVariationModalCustomerContainer from './OrderVariationModalCustomerContainer';
import { useSelector } from 'react-redux';
import { IRootState } from '../../app/store';



interface IChangeCustomerModal {
  isVisible: boolean
  toggleModal: () => void,
  order: IOrder,
  changeCustomer: (customerId: string) => void


}



const ChangeCustomerModal: FC<IChangeCustomerModal> = ({ isVisible, toggleModal, order, changeCustomer }) => {

  const [newCustomer, setNewCustomer] = useState(order.ComensalNo.toString());
  const [customers, setcustomers] = useState<any[]>([]);
  const customersNumber = useSelector((state:IRootState) => state.reservations.selectors.table ).NumeroPersonas;

useEffect(() => {
  buildCustomersData()
}, [customersNumber]);


const buildCustomersData=()=>{
  let data=[];
  for (let index = 0; index < customersNumber; index++) {
   data.push({title:index+1})
  }
  setcustomers(data)
}

  const change = () => {
    setNewCustomer(newCustomer);
    changeCustomer(newCustomer);
  }
 
  
  return (
    <Dialog isVisible={isVisible} onBackdropPress={toggleModal}>
      <View>
        <Text h4>Seleccione un nuevo comensal:</Text>
        <Divider />
        <OrderVariationModalCustomerContainer customers={customers} changeCustomer={(id: string) => { setNewCustomer(id) }} customerId={newCustomer} />
        <Dialog.Actions>
          <Dialog.Button
            type='solid'
            title="ACEPTAR"
            onPress={() => {
              change();
            }}
          />
          <Dialog.Button title="CANCELAR" onPress={toggleModal} />
        </Dialog.Actions>
      </View>
    </Dialog>
  )
}

export default ChangeCustomerModal

const styles = StyleSheet.create({})