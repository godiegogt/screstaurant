import { ScrollView, StyleSheet, Alert, ActivityIndicator } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { ButtonGroup, Dialog, Divider } from '@rneui/themed'
import { Text } from '../common'
import { IDish, IModifiers } from '../../interfaces/IOrder'
import { addOrder } from '../../features/reservation/reservationSlice'
import { useReservation } from '../../hooks'
import Formulario from './FormModifiers'
import { generateuuid } from '../../utils/idgenerator'
import Theme from '../../constants/Theme'


interface IOrderVariationModal {
  isVisible: boolean,
  toggleModal: () => void
  addOrder: (selecciones: any) => void,
  ProductoID: number,
  changeDish: (newDish: IDish) => void
}

const OrderVariationModal: FC<IOrderVariationModal> = ({ isVisible, toggleModal, addOrder, ProductoID, changeDish }) => {

  const [modifiers, setModifiers] = useState<IModifiers[]>([]);
  const [selecciones, setSelecciones] = useState([]);
  const [isLoading, setisLoading] = useState(false)
  const { getModifiersByProductoID } = useReservation();
  useEffect(() => {
    getModifiers();

  }, [])


  const getModifiers = async () => {
    try {
      setisLoading(true)
      const responseModifiers = await getModifiersByProductoID(ProductoID);
      if (responseModifiers != null && responseModifiers.length > 0) {
        setModifiers(responseModifiers);
      } else if (responseModifiers.length == 0) {
        handleSubmit()
      }
    } catch (error) {

    } finally {
      setisLoading(false)
    }
  }

  const handleSubmit = () => {
    const obligatoriosCompletados = modifiers
      .filter(p => p.Tipo === 'Obligatorio')
      .every(p => selecciones[p.ModificadorID]);

    if (!obligatoriosCompletados) {
      Alert.alert('Por favor, selecciona todas las opciones obligatorias.');
      return;
    }

    // Transformar selecciones a un array con la estructura de salida deseada
    const resultado = Object.values(selecciones)
      .filter(seleccion => seleccion !== null)
      .map((seleccion: IModifiers) => ({
        ModificadorID: seleccion.ModificadorID,
        Descripcion: seleccion.Nombre,
        Precio: seleccion.Precio,
        RespuestaModificadorID: seleccion.RespuestaModificadorID,
        DetalleModificadorID: generateuuid(),
        state: 'new'
      }));


    addOrder(resultado)


  };

  return (
    <Dialog isVisible={isVisible} onBackdropPress={toggleModal}>

      <ScrollView><Text h4 bold>Seleccione preferencias:</Text>
        <Divider />
        {
          !isLoading
            ?
            <Formulario modifiers={modifiers} selecciones={selecciones} changeSelecciones={setSelecciones} />
            :
            <ActivityIndicator color={Theme.colors.primary} />
        }
        {
          !isLoading
          &&
          <Dialog.Actions>
            <Dialog.Button
              type='solid'
              title="AGREGAR"
              onPress={() => {

                handleSubmit();
              }}
            />
            <Dialog.Button title="CANCELAR" onPress={toggleModal} />
          </Dialog.Actions>
        }
      </ScrollView>
    </Dialog>
  )
}



export default OrderVariationModal

const styles = StyleSheet.create({})