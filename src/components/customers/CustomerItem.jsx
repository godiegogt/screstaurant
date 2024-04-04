import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { FC } from 'react'

import {Text} from '../common'
import { materialTheme } from '../../constants'
import { useNavigation } from '@react-navigation/native'


const  CustomerItem = ({item,pickCustomer,customerSelected}) => {
const {navigate}=  useNavigation();


const pickRoom2=()=>{
    pickCustomer(item.title);
    navigate('OrderScreen')
}

  return (
    <TouchableOpacity style={[styles.container,item.title==customerSelected&&styles.selected]} onPress={pickRoom2}>
      <Text h3 bold  style={{textAlign:'center',color:materialTheme.colors.primary}}>{item.title}</Text>
    </TouchableOpacity>
  )
}

export default CustomerItem

export const styles = StyleSheet.create({
  container:{
    width:30,
    height:30,
    backgroundColor:'transparent',
    margin:materialTheme.sizes.BASE,
    borderWidth:3,
    borderColor:materialTheme.colors.primary
  },
  selected:{
    backgroundColor:materialTheme.colors.primary_light
  },
  text:{
    
  }
})