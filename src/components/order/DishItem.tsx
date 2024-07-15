import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC, useState } from 'react'
import { Image, Tile } from '@rneui/themed'

import { materialTheme } from '../../constants'

import OrderVariationModal from './OrderVariationModal'
import { useDispatch } from 'react-redux'
import { IDish, IModifiers } from '../../interfaces/IOrder'
import { IReservation } from '../../interfaces'
import { useReservation } from '../../hooks'
import useOrder from '../../hooks/useOrder'

interface IDishItemProps {
  item: IDish

}

const DishItem: FC<IDishItemProps> = ({ item }) => {
  const [isVisible, setIsVisible] = useState(false);
  const { addDetail } = useOrder();
  const [newDish, setNewDish] = useState(item)

  const toggleModal = () => {
    setIsVisible(!isVisible)
  }

  const _addOrder = (selecciones:any) => {


    addDetail(newDish,selecciones)
    toggleModal();
  }


  return (

    <TouchableOpacity style={styles.container} onPress={toggleModal}>
      <Text style={styles.text}>{newDish.Nombre}</Text>
      {/* <Image
        source={{ uri: 'https://i.pinimg.com/736x/c6/dc/94/c6dc940457e1a8e6fc55082fd10dd04c.jpg' }}
        containerStyle={styles.image}
        PlaceholderContent={<ActivityIndicator />}

      /> */}
      {
        isVisible&&<OrderVariationModal ProductoID={newDish.ProductoID} isVisible={isVisible} toggleModal={toggleModal} addOrder={_addOrder} changeDish={setNewDish}/>
      }
    </TouchableOpacity>

  )
}

export default DishItem

const styles = StyleSheet.create({
  container: {
    marginVertical: materialTheme.sizes.BASE / 6,
    marginHorizontal: materialTheme.sizes.BASE / 3,
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
    fontSize: 12,
    color:'#fff'

  }
})