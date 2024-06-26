import { StyleSheet, View } from 'react-native'
import React, { FC, useEffect } from 'react'
import { materialTheme } from '../../constants'

import { Text } from '../common'
import { useSelector } from 'react-redux'
import { IRootState } from '../../app/store'

import { IOrder } from '../../interfaces'

import { IModifiers } from '../../interfaces/IOrder'
import useOrder from '../../hooks/useOrder'
import { calcularPrecioTotal } from '../../features/order/helpers/CalcTotal'


const BillComponent = () => {
  const Table = useSelector((state: IRootState) => state.reservations.selectors.table);
  const { order, getOrderById } = useOrder();

  useEffect(() => {

    if (Table.OrdenID) {
      getOrderById(Table.OrdenID)
    }
  }, [Table.OrdenID])



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
        <Text bold>Subtotal</Text>
        <Text bold>{'Q ' + calcularPrecioTotal(order).toFixed(2)}</Text>
      </View>
    </View>
  )
}

interface IBillItem {
  item: IOrder
}

const OrderItem: FC<IBillItem> = ({ item }) => {
 
 const BillItemChildren = () => {
    return <View style={[styles.tr, styles.itemTr, (item.state == 'new' ||item.state=='edited' ) && styles.pendingOrder]} >
     
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
        <Text styles={{ textAlign: 'right' }}>{'Q ' + item.Precio.toString()}</Text>
      </View>
    </View>
  }

  type BillItemChildren_1Type = {
    modifier: IModifiers
  }

  const BillItemChildren_1: FC<BillItemChildren_1Type> = ({ modifier }) => {
    return <View style={[styles.tr, styles.itemTr, modifier.state == 'new' && styles.pendingOrder]} >
      <View style={[styles.tr, styles.itemTrAmount]}>
        <Text>{item.ComensalNo.toString()}</Text>
      </View>
      <View style={[styles.tr, styles.itemTrDetail]}>
        <Text>{'-->' + modifier.Descripcion}</Text>
      </View>
      <View style={[styles.tr, styles.itemTrPrice]}>
        <Text styles={{ textAlign: 'right' }}>{'Q ' + modifier.Precio.toString()}</Text>
      </View>
      
    </View>
  }

  return <>
    <BillItemChildren />
    {
      item.DetalleModificadores.map((modifier: IModifiers) => <BillItemChildren_1 key={modifier.RespuestaModificadorID} modifier={modifier} />)
    }
  </>
}

export default BillComponent

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