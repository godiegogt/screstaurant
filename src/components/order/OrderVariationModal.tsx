import { ScrollView, StyleSheet,  View } from 'react-native'
import React, { FC, useState } from 'react'
import { ButtonGroup, Dialog, Divider } from '@rneui/themed'
import { Alert, Text } from '../common'
import { IDish } from '../../interfaces/IOrder'
import { addOrder } from '../../features/reservation/reservationSlice'


interface IOrderVariationModal{
    isVisible:boolean,
    toggleModal:()=>void
    addOrder:()=>void
}

const variations=[
    {title:'¿Quiere cebolla?',options:['Si','No']},
    {title:'Quiere tomate?',options:['Si','No']},
    {title:'¿Que término de la carne necesita?',options:['1/2','3/4','Cocida']},
    {title:'¿Guarnición?',options:['Pure','Ensalada','Aguacate']},
    {title:'¿Tortilla o pan?',options:['Tortilla','Pan']},
    {title:'¿Bebida?',options:['Jamaica','Cocacola','Café']}]

const OrderVariationModal:FC<IOrderVariationModal> = ({isVisible,toggleModal,addOrder}) => {
  return (
    <Dialog isVisible={isVisible} onBackdropPress={toggleModal}>
      
    <ScrollView><Text h4 bold>Seleccione preferencias:</Text>
     <Divider/>
     {variations.map((item,key)=><OrderVariationModalItem key={key} item={item}/>)}<Dialog.Actions>
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

interface IOrderVariationModalItem{
    item:any
}

const OrderVariationModalItem:FC<IOrderVariationModalItem>=({item})=>{
    const [selectedIndex, setSelectedIndex] = useState(0)
    return <View>
<Text >{item.title}</Text>
<View>
<ButtonGroup
      buttons={item.options}
      selectedIndex={selectedIndex}
      onPress={(value) => {
        setSelectedIndex(value);
      }}
      containerStyle={{ marginBottom: 20 }}
    />
</View>

    </View>
}

export default OrderVariationModal

const styles = StyleSheet.create({})