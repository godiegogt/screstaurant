import { StyleSheet, TouchableOpacity, View,Text } from 'react-native'
import React, { FC } from 'react'

import { materialTheme } from '../../constants'


import Icon from "react-native-vector-icons/FontAwesome5";

const  CustomerItem = ({item,pickCustomer,customerSelected}) => {



const pickRoom2=()=>{
    pickCustomer(item);
    // navigate('OrderScreen')
}

  return (
    <TouchableOpacity style={styles.container} onPress={pickRoom2}>
        <Icon
              size={30}
              name="user"
              solid
              color={item==customerSelected?materialTheme.colors.primary:materialTheme.colors.primary_light}
            />
      <Text style={styles.text}>{item}</Text>
    </TouchableOpacity>
  )
}

export default CustomerItem

export const styles = StyleSheet.create({
  container:{
    
   
    marginHorizontal:10,
    // borderWidth:3,
    // borderColor:materialTheme.colors.primary
    
    alignItems:'center'
   
  },
  selected:{
   backgroundColor:materialTheme.colors.primary_light
  },
  text:{
    textAlign:'center',color:'#000',
    fontSize:12,
    position:'absolute',
    zIndex:10000,
    color:'#fff'
    
    
  }
})