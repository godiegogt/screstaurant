import { StyleSheet,  TouchableOpacity, View } from 'react-native'
import React, { FC, useState } from 'react'
import { materialTheme } from '../../constants'
import { BottomSheet, ListItem } from '@rneui/themed'
import { Alert, Text } from '../common'

const products = [
  {
    amount: 5,
    detail: 'Hamburguesa doble',
    price: 45.99
  },
  {
    amount: 5,
    detail: 'Pasta Alfredo',
    price: 90.99
  },
  {
    amount: 5,
    detail: 'Cafe de la casa ñldfgsgsdf sdfsdf sdfsd sds sdfsdf sdfsdf sdfsdf sdfsdf sdf',
    price: 20.45
  },
]

const OrderComponent = () => {

const [errormessage, setErrormessage] = useState('Autenticación exitosa!')

  return (
    <View style={styles.container}>
      <Alert message={errormessage} setMessage={setErrormessage} type='success'/>
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
        products.map(({ amount, price, detail }, key) => <OrderItem key={key} amount={amount} detail={detail} price={price} />)
      }
      <View style={[styles.tr, styles.headerTr, { backgroundColor: '#fff' }]}>
        <Text bold>Total</Text>
        <Text bold>{'Q '+products.reduce((accumulator, currentValue) => accumulator + currentValue.price,0,).toFixed(2)}</Text>
      </View>
    </View>
  )
}

interface IOrderItem {
  amount: number | string,
  detail: string,
  price: number|string
}

const OrderItem: FC<IOrderItem> = (item) => {
  const [isVisible, setIsVisible] = useState(false)
  const list = [
    { title: 'Eliminar', onPress: () => setIsVisible(false), },
    { title: 'Cambiar de comensal', onPress: () => setIsVisible(false), },
    {
      title: 'Cancel',
      containerStyle: { backgroundColor: materialTheme.colors.error },
      titleStyle: { color: 'white' },
      onPress: () => setIsVisible(false),
    },
  ];

  return <TouchableOpacity style={[styles.tr, styles.itemTr]} onPress={() => { setIsVisible(!isVisible) }}>
    <View style={[styles.tr, styles.itemTrAmount]}>
      <Text>{item.amount.toString()}</Text>
    </View>
    <View style={[styles.tr, styles.itemTrDetail]}>
      <Text>{item.detail}</Text>
    </View>
    <View style={[styles.tr, styles.itemTrPrice]}>
      <Text  styles={{ textAlign: 'right' }}>{'Q '+item.price.toString()}</Text>
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
    flexDirection: 'row'
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
  }
})