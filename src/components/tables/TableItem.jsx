import { StyleSheet,  View,Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { materialTheme } from '../../constants'
import { Text } from '../common'

const TableItem = ({item}) => {
  const {navigate}=  useNavigation();
  return (
    <TouchableOpacity style={styles.container} onPress={()=>{navigate('OrderScreen')}}>
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