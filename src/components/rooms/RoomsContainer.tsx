import { FlatList, StyleSheet,  View } from 'react-native'
import React, { useState } from 'react'
import { Box, Text } from '../common'
import RoomItem from './RoomItem'
import { useNavigation } from '@react-navigation/native'

const rooms=[
    {
        title:'1'
    },
    {
        title:'2'
    },
    {
        title:'3'
    },
    {
        title:'4'
    },
    {
        title:'5'
    },
    {
        title:'6'
    }, {
        title:'7'
    },
    {
        title:'8'
    }
]

const RoomsContainer = () => {
   const [roomSelected, setRoomSelected] = useState(0);
   const [tableSelected, setTableSelected] = useState(0);

  return (
    < >
        {/* <Text h1 bold>Salones</Text> */}
    <View style={styles.container}>
    <FlatList
        data={rooms}
        renderItem={({item}) => <RoomItem pickRoom={setRoomSelected} roomSelected={roomSelected} key={item.title} title={item.title} />}
        keyExtractor={item => item.title}
        horizontal
      />
   
    </View>
    </>
  )
}

export default RoomsContainer

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'row',
    flexWrap:'wrap',
    justifyContent:'space-between'

    }
})