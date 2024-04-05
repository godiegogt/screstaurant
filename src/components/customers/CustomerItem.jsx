import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { FC } from 'react'

import {Text} from '../common'
import { materialTheme } from '../../constants'
import { useNavigation } from '@react-navigation/native'

import Icon from "react-native-vector-icons/FontAwesome5";

const  CustomerItem = ({item,pickCustomer,customerSelected}) => {
const {navigate}=  useNavigation();


const pickRoom2=()=>{
    pickCustomer(item.title);
    navigate('OrderScreen')
}

  return (
    <TouchableOpacity style={[styles.container,item.title==customerSelected&&styles.selected]} onPress={pickRoom2}>
        <Icon
              size={50}
              name="user"
              solid
              color={item.title==customerSelected? materialTheme.colors.primary:materialTheme.colors.primary_light}
            />
      <Text h3 bold  style={{textAlign:'center',color:materialTheme.colors.primary}}>{item.title}</Text>
    </TouchableOpacity>
  )
}

export default CustomerItem

export const styles = StyleSheet.create({
  container:{
    width:50,
    height:50,
    backgroundColor:'transparent',
    margin:materialTheme.sizes.BASE,
    // borderWidth:3,
    // borderColor:materialTheme.colors.primary
  },
  selected:{
    // backgroundColor:materialTheme.colors.primary_light
  },
  text:{
    
  }
})