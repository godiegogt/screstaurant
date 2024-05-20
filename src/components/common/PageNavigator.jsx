import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Box from './Box'
import { Button, Text } from '@rneui/themed'
import { materialTheme } from '../../constants'
import { useDispatch, useSelector } from 'react-redux'
import { selectRoom } from '../../features/reservation/reservationSlice'



const PageNavigator = ({ rooms, roomSelected, setRoomSelected }) => {
  const dispatch = useDispatch();
  const [room, setRoom] = useState(rooms.find(item => item.SalonID == roomSelected));
  const ROOMS_NUMBER = rooms.length;

useEffect(() => {
  //console.log(rooms)
  //console.log(room,roomSelected)
  
}, [room])

  const navigateToRoom = (symbol) => {

    rooms.forEach((element, index) => {
     
      //Looking for room selected in rooms
      if (element.SalonID == room.SalonID) {
       
       //Later, to see if it must moves to next or previous room
        if (symbol == '+' && ROOMS_NUMBER - 1 > index) {
         changeRoom(index+1)
        } else if (symbol == '-' && index > 0) {
          changeRoom(index-1)
        }

      }
    });


  }
const changeRoom=(index)=>{
  setRoom(rooms[index])
  setRoomSelected(rooms[index].SalonID)
  dispatch(selectRoom(rooms[index].SalonID));
}

  return (
    <View style={styles.container}>
      <Text>Salon: </Text>
      <TouchableOpacity style={styles.button} onPress={() => { navigateToRoom('-') }}><Text style={styles.buttonText}>{'<'}</Text></TouchableOpacity>
      {/* <Text >{roomSelected.toString()}</Text> */}
      <TouchableOpacity style={styles.button} onPress={() => { navigateToRoom('+') }} ><Text style={styles.buttonText}>{'>'}</Text></TouchableOpacity>
      {/* <Button size='sm' type="outline" onPress={()=>{changeRoom('+')}}>+</Button> */}
    {
      room!=undefined&&  <Text>{room.Nombre}</Text>
    }
    </View>
  )

}

export default PageNavigator

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    width: materialTheme.sizes.BASE * 1.8,
    height: materialTheme.sizes.BASE * 1.8,

    borderRadius: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    margin: 3,
    backgroundColor: materialTheme.colors.secondary


  },
  buttonText: {
    color: '#fff'
  }
})