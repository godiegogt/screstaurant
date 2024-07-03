import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { materialTheme } from '../../constants'
import { BottomSheet, ListItem } from '@rneui/themed'
import { Text } from '../common'
import { useSelector } from 'react-redux'
import { IRootState } from '../../app/store'
import { useReservation } from '../../hooks'
import { IOrder, IReservation } from '../../interfaces'


import ChangeCustomerModal from './ChangeCustomerModal'
import { IModifiers } from '../../interfaces/IOrder'
import useOrder from '../../hooks/useOrder'
import AddManualModifierModal from './AddManualModifierModal'
import { IChangeCustomerReq } from '../../features/order/interfaces/IChangeCustomerReq'
import { calcularPrecioTotal } from '../../features/order/helpers/CalcTotal'
import { useFocusEffect } from '@react-navigation/native'

type OrderComponentType={
  order:IReservation
}

const OrderComponent:FC<OrderComponentType> = ({order}) => {
  const Table = useSelector((state: IRootState) => state.reservations.selectors.table);
  // const [ordrs, setOrdrs] = useState<IOrder[]>([]);
  // const { reservations } = useSelector((state: IRootState) => state.reservations);
  // const { getOrdersByReservation, getReservation } = useReservation();
  // const [reservation, setReservation] = useState<IReservation>();
  // useEffect(() => {
  //   loadOrders()
  //   setReservation(getReservation())
  // }, [reservations])

  // const loadOrders = () => {
  //   const orders = getOrdersByReservation();
  //   orders != undefined && setOrdrs(orders);

  // }
 
  // const { order, getOrderById } = useOrder();
  // useFocusEffect(
  //   React.useCallback(() => {
  //     if (Table.OrdenID) {
  //       getOrderById(Table.OrdenID,0)
  //     }
  //   }, [])
  // );



  return (
    <View style={styles.container}>

      <>
        <View style={[styles.tr, styles.headerTr]}>
          <Text bold>{Table?.Nombre ? Table.Nombre : 'Sin Asignar'}</Text>
          <Text bold>{Table?.OrdenID ? Table.OrdenID.toString() : "Sin Asignar"}</Text>
        </View>
        <View style={[styles.tr, styles.headerTr]}>
          <Text bold>#</Text>

          <Text bold>Detalle</Text>
          <Text bold>Precio</Text>
        </View>
      </>


      {
        order?.DetalleOrden.map((item, key) => <OrderItem key={key} item={item} />)
      }
      <View style={[styles.tr, styles.headerTr, { backgroundColor: '#fff' }]}>
        <Text bold>Total</Text>
        <Text bold>{'Q ' + calcularPrecioTotal(order).toFixed(2)}</Text>
      </View>
    </View>
  )
}

interface IOrderItem {
  item: IOrder
}

const OrderItem: FC<IOrderItem> = ({ item }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);
  const [isVisibleChangeCustomerModal, setIsVisibleChangeCustomerModal] = useState(false);
  const [newCustomer, setNewCustomer] = useState('')
  const { deleteDetail, deleteModifier,addModifier,changeOfCustomer } = useOrder();
  const [modifierSelected, setModifierSelected] = useState<IModifiers>();
  const [manualModifierModal, setManualModifierModal] = useState(false)



  const _deleteOrder = () => {
    //A for Articles, M for Modifiers
    deleteDetail(item)
    setIsVisible(!isVisible)
  }

  const _deleteModifier = () => {
    setIsVisible2(!isVisible2);
    deleteModifier(item.DetalleID,modifierSelected)
  }
  const _addModifier = (modifier:IModifiers) => {
addModifier(item.DetalleID,modifier)
  }

  const changeCustomer = (CustomerId: string) => {
    setIsVisibleChangeCustomerModal(!isVisibleChangeCustomerModal);
    changeOfCustomer(item.DetalleID,parseInt(CustomerId));
  }

  const list = [
    { title: 'Agregar modificador', onPress: () => { setIsVisible(false), setManualModifierModal(true) } },
    { title: 'Eliminar', onPress: () => _deleteOrder() },
    { title: 'Cambiar de comensal', onPress: () => { setIsVisible(false), setIsVisibleChangeCustomerModal(true) }, },
    {
      title: 'Cancel',
      containerStyle: { backgroundColor: materialTheme.colors.error },
      titleStyle: { color: 'white' },
      onPress: () => setIsVisible(false),
    },
  ];

  const list2 = [
    { title: 'Eliminar', onPress: () => _deleteModifier() },
    {
      title: 'Cancel',
      containerStyle: { backgroundColor: materialTheme.colors.error },
      titleStyle: { color: 'white' },
      onPress: () => setIsVisible2(false),
    },
  ];

  const OrderItemChildren = () => {
    return <TouchableOpacity style={[styles.tr, styles.itemTr, (item.state == 'new' ||item.state=='edited' ) && styles.pendingOrder]} onPress={() => { setIsVisible(!isVisible) }}>
      <ChangeCustomerModal changeCustomer={changeCustomer} isVisible={isVisibleChangeCustomerModal} order={item} toggleModal={() => setIsVisibleChangeCustomerModal(!setIsVisibleChangeCustomerModal)} />
      <AddManualModifierModal key={item.DetalleID} isVisible={manualModifierModal} toggleModal={()=>setManualModifierModal(!manualModifierModal)} addManualModifier={_addModifier}/>
      {/* <View style={[styles.tr, styles.itemTrAmount]}>
      <Text>{item.dish.amount?.toString()}</Text>
    </View> */}
      <View style={[styles.tr, styles.itemTrAmount]}>
        <Text>{item.ComensalNo.toString()}</Text>
      </View>
      <View style={[styles.tr, styles.itemTrDetail]}>
        <Text>{item.Descripcion}</Text>
      </View>
      <View style={[styles.tr, styles.itemTrPrice]}>
        <Text styles={{ textAlign: 'right' }}>{'Q ' + item.Precio.toFixed(2)}</Text>
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

  type OrderItemChildren_1Type = {
    modifier: IModifiers
  }

  const OrderItemChildren_1: FC<OrderItemChildren_1Type> = ({ modifier }) => {
    return <TouchableOpacity style={[styles.tr, styles.itemTr, modifier.state == 'new' && styles.pendingOrder]} onPress={() => { setIsVisible2(!isVisible2),setModifierSelected(modifier) }}>
      <View style={[styles.tr, styles.itemTrAmount]}>
        <Text>{item.ComensalNo.toString()}</Text>
      </View>
      <View style={[styles.tr, styles.itemTrDetail]}>
        <Text>{'-->' + modifier.Descripcion}</Text>
      </View>
      <View style={[styles.tr, styles.itemTrPrice]}>
        <Text styles={{ textAlign: 'right' }}>{'Q ' + modifier.Precio.toFixed(2)}</Text>
      </View>
      
    </TouchableOpacity>
  }

  return <>
    <OrderItemChildren />
    {
      item.DetalleModificadores.map((modifier: IModifiers) => <OrderItemChildren_1 key={modifier.RespuestaModificadorID} modifier={modifier} />)
    }
    <BottomSheet modalProps={{}} isVisible={isVisible2}>
        {list2.map((l, i) => (
          <ListItem
            key={i}
            containerStyle={l.containerStyle}
            onPress={() => { l.onPress() }}
          >
            <ListItem.Content>
              <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </BottomSheet>
  </>
}

export default OrderComponent

const styles = StyleSheet.create({
  container: {
    borderWidth: materialTheme.sizes.ORDER_BORDER_WIDTH,
    borderColor: materialTheme.colors.ORDER_BORDER_COLOR,
    borderRadius: materialTheme.sizes.ORDER_BORDER_RADIUS,
    marginBottom: materialTheme.sizes.BASE
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
  pendingOrder: {
    backgroundColor: materialTheme.colors.primary_light
  }
})