import { StyleSheet, View, Alert, NativeSyntheticEvent, TextInputChangeEventData } from 'react-native'
import React, { FC, useState } from 'react'
import { IModifiers } from '../../interfaces/IOrder'
import { Dialog, Divider, Input } from '@rneui/themed'
import { TextComponent as Text } from '../common'
import { generateuuid } from '../../utils/idgenerator'
type AddManualModifierModalProps = {
  isVisible: boolean,
  toggleModal: () => void
  addManualModifier: (modifier: IModifiers) => void,

}
const AddManualModifierModal: FC<AddManualModifierModalProps> = ({ isVisible, toggleModal, addManualModifier }) => {
  const [description, setdescription] = useState("")
  const [price, setprice] = useState(0)
  const handleSubmit = () => {
    if (description.length > 0 && price>=0) {
      const modifier: IModifiers = {
        Descripcion: description,
        Precio: price,
        state: 'new',
        DetalleModificadorID: generateuuid(),
        ModificadorID: 0
      }

      addManualModifier(modifier);
      toggleModal()

    } else {
      Alert.alert('Los datos son incorrectos.');
    }


  }

  return (
    <Dialog isVisible={isVisible} onBackdropPress={toggleModal}>

      <View><Text h4 bold>Agregar modificador manual:</Text>
        <Divider />
        <View>
          <Input
            placeholder='Descripción: '
            value={description}
            onChangeText={(value) => { setdescription(value) }}
          />
          <Input
            placeholder='Precio: '
            value={price.toString()}
            onChangeText={(value2) => { value2==""?setprice(0):setprice(parseFloat(value2)) }}
            keyboardType='numeric'
          />
        </View>
        <Dialog.Actions>
          <Dialog.Button
            type='solid'
            title="AGREGAR"
            onPress={() => {

              handleSubmit();
            }}
          />
          <Dialog.Button title="CANCELAR" onPress={toggleModal} />
        </Dialog.Actions></View>
    </Dialog>
  )
}

export default AddManualModifierModal

const styles = StyleSheet.create({})