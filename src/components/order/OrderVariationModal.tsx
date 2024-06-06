import { ScrollView, StyleSheet, View } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { ButtonGroup, Dialog, Divider } from '@rneui/themed'
import { Alert, Text } from '../common'
import { IDish, IModifiers } from '../../interfaces/IOrder'
import { addOrder } from '../../features/reservation/reservationSlice'
import { useReservation } from '../../hooks'
import Formulario from './FormModifiers'


interface IOrderVariationModal {
  isVisible: boolean,
  toggleModal: () => void
  addOrder: (selecciones:any) => void,
  ProductoID: number,
  changeDish:(newDish:IDish)=>void
}

const OrderVariationModal: FC<IOrderVariationModal> = ({ isVisible, toggleModal, addOrder, ProductoID,changeDish }) => {

  const [modifiers, setModifiers] = useState<IModifiers[]>([]);
  const [selecciones, setSelecciones] = useState([]);
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

  const handleSubmit = () => {
    const obligatoriosCompletados = modifiers
      .filter(p => p.Tipo === 'Obligatorio')
      .every(p => selecciones[p.ModificadorID]);

    if (!obligatoriosCompletados) {
      alert('Por favor, selecciona todas las opciones obligatorias.');
      return;
    }

    // Transformar selecciones a un array con la estructura de salida deseada
    const resultado = Object.values(selecciones)
      .filter(seleccion => seleccion !== null)
      .map(seleccion => ({
        ModificadorID: seleccion.RespuestaModificadorID,
        Descripcion: seleccion.Nombre,
        Precio: seleccion.Precio,
      }));

    console.log('resultado',resultado);
   addOrder(resultado)


  };

  return (
    <Dialog isVisible={isVisible} onBackdropPress={toggleModal}>

      <ScrollView><Text h4 bold>Seleccione preferencias:</Text>
        <Divider />
       <Formulario modifiers={modifiers} selecciones={selecciones} changeSelecciones={setSelecciones}/>
        <Dialog.Actions>
          <Dialog.Button
            type='solid'
            title="AGREGAR"
            onPress={() => {

              handleSubmit();
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
    <Text>{item.Pregunta}</Text>
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