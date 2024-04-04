import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { FC } from 'react'

import {Text} from '../common'
import { materialTheme } from '../../constants'
import { useNavigation } from '@react-navigation/native'


const RoomItem = ({title,roomSelected,pickRoom}) => {
const {navigate}=  useNavigation();


const pickRoom2=()=>{
 pickRoom(title);
}

  return (
    <TouchableOpacity style={[styles.container,title==roomSelected&&styles.selected]} onPress={pickRoom2}>
      <Text h3 bold  style={{textAlign:'center',color:materialTheme.colors.primary}}>{title}</Text>
    </TouchableOpacity>
  )
}

export default RoomItem

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