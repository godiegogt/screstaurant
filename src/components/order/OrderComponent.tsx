import { StyleSheet,  TouchableOpacity, View } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { materialTheme } from '../../constants'
import { BottomSheet, ListItem } from '@rneui/themed'
import { Alert, Text } from '../common'
import { useDispatch, useSelector } from 'react-redux'
import { IRootState } from '../../app/store'
import { useReservation } from '../../hooks'
import { IOrder } from '../../interfaces'


import ChangeCustomerModal from './ChangeCustomerModal'



const OrderComponent = () => {
const [ordrs, setOrdrs] = useState<IOrder[]>([]);
const reservations=useSelector((state:IRootState)=>state.reservations)
useEffect(() => {
  loadOrders()
}, [reservations])

const loadOrders=()=>{
  const orders=getOrdersByReservation();
  orders!=undefined&&setOrdrs(orders);

}

const {getOrdersByReservation}=useReservation()

  return (
    <View style={styles.container}>
     
      <>
      <View style={[styles.tr, styles.headerTr]}>
        <Text bold>Mesa No. 01</Text>
        <Text bold>Orden No. 00127</Text>
      </View>
      <View style={[styles.tr, styles.headerTr]}>
        <Text bold>#</Text>
       
        <Text bold>Detalle</Text>
        <Text bold>Precio</Text>
      </View>
      </>
     
     
      {
        ordrs.map((item, key) => <OrderItem key={key} item={item} />)
      }
      <View style={[styles.tr, styles.headerTr, { backgroundColor: '#fff' }]}>
        <Text bold>Total</Text>
        <Text bold>{'Q '+ordrs.reduce((accumulator, currentValue) => accumulator + currentValue.dish.price,0,).toFixed(2)}</Text>
      </View>
    </View>
  )
}

interface IOrderItem{
  item:IOrder
}

const OrderItem: FC<IOrderItem> = ({item}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleChangeCustomerModal, setIsVisibleChangeCustomerModal] = useState(false);
  const [newCustomer, setNewCustomer] = useState('')
 const {deleteOrder,changeOfCustomer} = useReservation();



  const _deleteOrder=()=>{
deleteOrder(item)
setIsVisible(!isVisible)
  }


  const changeCustomer=(CustomerId:string)=>{
    setIsVisibleChangeCustomerModal(!isVisibleChangeCustomerModal);
    // item.customer=Number(CustomerId);
    // console.log('order',item);
    // console.log('new customer: ',CustomerId);
    // console.log('item',item)
    changeOfCustomer(item,Number(CustomerId))
  }

  const list = [
    { title: 'Eliminar', onPress: ()=>_deleteOrder() },
    { title: 'Cambiar de comensal', onPress: () => { setIsVisible(false), setIsVisibleChangeCustomerModal(true)}, },
    {
      title: 'Cancel',
      containerStyle: { backgroundColor: materialTheme.colors.error },
      titleStyle: { color: 'white' },
      onPress: () => setIsVisible(false),
    },
  ];

  return <TouchableOpacity style={[styles.tr, styles.itemTr, item.state=='new'&&styles.pendingOrder]} onPress={() => { setIsVisible(!isVisible) }}>
    <ChangeCustomerModal changeCustomer={changeCustomer} isVisible={isVisibleChangeCustomerModal} order={item} toggleModal={()=>setIsVisibleChangeCustomerModal(!setIsVisibleChangeCustomerModal)}/>
    {/* <View style={[styles.tr, styles.itemTrAmount]}>
      <Text>{item.dish.amount?.toString()}</Text>
    </View> */}
    <View style={[styles.tr, styles.itemTrAmount]}>
      <Text>{item.customer.toString()}</Text>
    </View>
    <View style={[styles.tr, styles.itemTrDetail]}>
      <Text>{item.dish.name}</Text>
    </View>
    <View style={[styles.tr, styles.itemTrPrice]}>
      <Text  styles={{ textAlign: 'right' }}>{'Q '+item.dish.price.toString()}</Text>
    </View>
    <BottomSheet modalProps={{}} isVisible={isVisible}>
      {list.map((l, i) => (
        <ListItem
          key={i}
          containerStyle={l.containerStyle}
          onPress={l.onPress}
        >
          <ListItem.Content>
            <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      ))}
    </BottomSheet>
  </TouchableOpacity>
}

export default OrderComponent

const styles = StyleSheet.create({
  container: {
    borderWidth: materialTheme.sizes.ORDER_BORDER_WIDTH,
    borderColor: materialTheme.colors.ORDER_BORDER_COLOR,
    borderRadius: materialTheme.sizes.ORDER_BORDER_RADIUS,
    marginBottom:materialTheme.sizes.BASE
  },
  tr: {
    minHeight: materialTheme.sizes.ORDER_TR_HEIGHT,
    borderWidth: materialTheme.sizes.ORDER_BORDER_WIDTH,
    borderColor: materialTheme.colors.ORDER_BORDER_COLOR,
    maxHeight: materialTheme.sizes.ORDER_TR_HEIGHT * 2

  },
  headerTr: {
    flexDirection: 'row',
    backgroundColor: materialTheme.colors.ORDER_BORDER_COLOR,
    justifyContent: 'space-between',
    padding: 5
  },
  itemTr: {
    flexDirection: 'row',
  },
  itemTrAmount: {
    width: '10%',

  },
  itemTrDetail: {
    width: '60%',

  },
  itemTrPrice: {
    width: '30%',
    flex: 1,
    justifyContent: 'flex-end'
  },
  pendingOrder:{
    backgroundColor:materialTheme.colors.primary_light
  }
})