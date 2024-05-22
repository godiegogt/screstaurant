import { ScrollView, StyleSheet, View } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { ButtonGroup, Dialog, Divider } from '@rneui/themed'
import { Alert, Text } from '../common'
import { IDish, IModifiers } from '../../interfaces/IOrder'
import { addOrder } from '../../features/reservation/reservationSlice'
import { useReservation } from '../../hooks'


interface IOrderVariationModal {
  isVisible: boolean,
  toggleModal: () => void
  addOrder: () => void,
  ProductoID: number
}

const OrderVariationModal: FC<IOrderVariationModal> = ({ isVisible, toggleModal, addOrder, ProductoID }) => {

  const [modifiers, setModifiers] = useState<IModifiers[]>([]);

  const { getModifiersByProductoID } = useReservation();
  useEffect(() => {
    getModifiers()
  }, [])


  const getModifiers = async () => {
    const responseModifiers = await getModifiersByProductoID(ProductoID);
    if (responseModifiers != null && responseModifiers.length > 0) {
      console.log('Modifiers: ', responseModifiers)
      setModifiers(responseModifiers);
    }
  }

  return (
    <Dialog isVisible={isVisible} onBackdropPress={toggleModal}>

      <ScrollView><Text h4 bold>Seleccione preferencias:</Text>
        <Divider />
        {modifiers.map((item, key) => <OrderVariationModalItem key={key} item={item} />)}<Dialog.Actions>
          <Dialog.Button
            type='solid'
            title="AGREGAR"
            onPress={() => {

              addOrder();
            }}
          />
          <Dialog.Button title="CANCELAR" onPress={toggleModal} />
        </Dialog.Actions></ScrollView>
    </Dialog>
  )
}

interface IOrderVariationModalItem {
  item: IModifiers
}

const OrderVariationModalItem: FC<IOrderVariationModalItem> = ({ item }) => {
  const [selectedIndex, setSelectedIndex] = useState(10)
  return <View>
    <Text >{item.Pregunta}</Text>
    <View>
      <ButtonGroup
        buttons={item.Respuestas?.map(mod => mod.Nombre)}
        selectedIndex={selectedIndex}
        onPress={(value) => {
          if (value != selectedIndex) {
            setSelectedIndex(value);
          } else {
            setSelectedIndex(10)
          }
        }}
        containerStyle={{ marginBottom: 20 }}
      />
    </View>

  </View>
}

export default OrderVariationModal

const styles = StyleSheet.create({})