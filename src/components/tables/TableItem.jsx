import { StyleSheet,  View,Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { materialTheme } from '../../constants'
import { Text } from '../common'
import { useDispatch } from 'react-redux'
import { selectTable } from '../../features/reservation/reservationSlice'
import Theme from '../../constants/Theme'

const TableItem = ({item}) => {
  const navigation=  useNavigation();
 const dispatch= useDispatch();
  return (
    <TouchableOpacity style={[styles.container,item.OrdenID>0&&styles.tableReserved]} onPress={()=>{dispatch(selectTable(item));navigation.navigate('OrderScreen',{table:item})}}>
   
  <Image  source={require('../../assets/img/mesa-de-cena.png')}style={styles.img}/>
  <Text center style={[styles.title]} >{item.Nombre}</Text>
    </TouchableOpacity>
  )
}

export default TableItem

const styles = StyleSheet.create({
    container:{
      width:50,
      height:50,
      margin:materialTheme.sizes.BASE,

    },
    tableReserved:{
      backgroundColor:'rgba(255, 223, 153,0.4);'
    }
    ,
    title:{
       
        color:materialTheme.colors.primary,
        fontWeight:'bold',
        fontSize:10,
        zIndex:1000,
        alignSelf:'center'
    },
    textWhite:{
color:'#fff'
    },
    img:{
      width:'100%',
      height:'80%'
    }
  })