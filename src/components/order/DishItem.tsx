import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC, useState } from 'react'
import { Image, Tile } from '@rneui/themed'

import { materialTheme } from '../../constants'

import OrderVariationModal from './OrderVariationModal'
import { useDispatch } from 'react-redux'
import { IDish } from '../../interfaces/IOrder'
import { IReservation } from '../../interfaces'
import { useReservation } from '../../hooks'

interface IDishItemProps {
  item: IDish

}

const DishItem: FC<IDishItemProps> = ({ item }) => {
  const [isVisible, setIsVisible] = useState(false);
  const { addOrder } = useReservation()

  const toggleModal = () => {
    setIsVisible(!isVisible)
  }

  const _addOrder = () => {


    addOrder(item)
    toggleModal();
  }


  return (

    <TouchableOpacity style={styles.container} onPress={toggleModal}>
      <Text style={styles.text}>{item.Nombre}</Text>
      <Image
        source={{ uri: 'https://i.pinimg.com/736x/c6/dc/94/c6dc940457e1a8e6fc55082fd10dd04c.jpg' }}
        containerStyle={styles.image}
        PlaceholderContent={<ActivityIndicator />}

      />
      <OrderVariationModal isVisible={isVisible} toggleModal={toggleModal} addOrder={_addOrder} />
    </TouchableOpacity>

  )
}

export default DishItem

const styles = StyleSheet.create({
  container: {
    margin: materialTheme.sizes.BASE / 6,
    width: 70,
    height: 70,
    maxWidth: 70,
    minWidth: 70,
    backgroundColor: materialTheme.colors.primary,
    flex: 1,

    borderRadius: materialTheme.sizes.BASE / 2,
    justifyContent: 'center'

  },
  image: {
    aspectRatio: 1,
    width: '70%',
    flex: 1,
    opacity: 0.1
  },
  text: {
    position: 'absolute',
    zIndex: 1000,


    fontWeight: 'bold',
    alignSelf: 'center',
    flex: 1,
    textAlign: 'center',
    paddingBottom: 10,
    fontSize: 12

  }
})