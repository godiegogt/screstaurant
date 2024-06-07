import { StyleSheet,  View,Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { materialTheme } from '../../constants'
import { Text } from '../common'
import { useDispatch } from 'react-redux'
import { selectTable } from '../../features/reservation/reservationSlice'

const TableItem = ({item}) => {
  const navigation=  useNavigation();
 const dispatch= useDispatch();
  return (
    <TouchableOpacity style={styles.container} onPress={()=>{dispatch(selectTable(item));navigation.navigate('OrderScreen',{table:item})}}>
        <Text style={[styles.title,item.OrdenID>0&&{color:materialTheme.colors.muted}]} >{item.Nombre}</Text>
   {
    !item.OrdenID>0?<Image  source={require('../../assets/img/mesa-de-cena.png')} width={20} height={20}/>
  :
  <Image  source={require('../../assets/img/mesa-de-cena-disabled.png')} width={20} height={20}/> 
  }  
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
        fontWeight:'bold',
        fontSize:10
    }
  })