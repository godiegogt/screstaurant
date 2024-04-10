import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Box from './Box'
import { Button,Text } from '@rneui/themed'
import { materialTheme } from '../../constants'

const PageNavigator = () => {
    const [room, setRoom] = useState(0);

  const changeRoom=(symbol:string)=>{
    let newRoom=room
    symbol=='+'?newRoom++:room>0&&newRoom--;
    setRoom(newRoom)
  }  


  return (
    <View style={styles.container}>
        <Text>Salon: </Text>
        <TouchableOpacity style={styles.button} onPress={()=>{changeRoom('-')}}><Text style={styles.buttonText}>{'<'}</Text></TouchableOpacity>
      <View><Text >{room.toString()}</Text></View>
      <TouchableOpacity style={styles.button} onPress={()=>{changeRoom('+')}} ><Text style={styles.buttonText}>{'>'}</Text></TouchableOpacity>
      {/* <Button size='sm' type="outline" onPress={()=>{changeRoom('+')}}>+</Button> */}
    </View>
  )
  
}

export default PageNavigator

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        alignSelf:'flex-end',
        justifyContent:'center',
        alignItems:'center'
    },
    button:{
        width:materialTheme.sizes.BASE*1.8,
        height:materialTheme.sizes.BASE*1.8,
       
        borderRadius:1,
        justifyContent:'center',
        alignItems:'center',
        textAlign:'center',
        margin:3,
        backgroundColor:materialTheme.colors.secondary
        

    },
    buttonText:{
color:'#fff'
    }
})