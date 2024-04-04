import { StyleSheet,  View,Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { materialTheme } from '../../constants'
import { Text } from '../common'

const TableItem = ({item}) => {
  return (
    <TouchableOpacity style={styles.container}>
        <Text style={styles.title} >{item.title}</Text>
     <Image  source={require('../../assets/img/mesa-de-cena.png')} width={20} height={20}/>
    </TouchableOpacity>
  )
}

export default TableItem

const styles = StyleSheet.create({
    container:{
      width:50,
      height:50,
      margin:materialTheme.sizes.BASE
    },
    title:{
        position:'absolute',
        marginLeft:25,
        marginTop:20,
        color:materialTheme.colors.primary,
        fontWeight:'bold'
    }
  })