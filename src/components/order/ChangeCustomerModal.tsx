import { StyleSheet, View } from 'react-native'
import React, { FC, useState } from 'react'
import { Dialog, Divider } from '@rneui/themed';
import { Text } from '../common'
import { ICustomer, IOrder } from '../../interfaces';
import OrderVariationModalCustomerContainer from './OrderVariationModalCustomerContainer';



interface IChangeCustomerModal {
  isVisible: boolean
  toggleModal: () => void,
  order: IOrder,
  changeCustomer: (customerId: string) => void


}



const ChangeCustomerModal: FC<IChangeCustomerModal> = ({ isVisible, toggleModal, order, changeCustomer }) => {

  const [newCustomer, setNewCustomer] = useState(order.customer.toString())

  const change = () => {
    setNewCustomer(newCustomer);
    changeCustomer(newCustomer);
  }
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