import React, { Component, useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import {  Text } from '../common'
import TableItem from './TableItem'
import { Card } from '@rneui/themed'
import PageNavigator from '../common/PageNavigator'
import axiosClient from '../../utils/axiosClient'
import { useSelector } from 'react-redux'
import { IRootState } from '../../app/store'

type TableType={
  MesaID:number,
  Nombre:string,
  NumeroPersonas:number
}

type RoomType={
  Nombre:string,
  SalonID:number
}

const TablesComponent=()=> {
  const [rooms, setRooms] = useState<RoomType[]>([]);
  const [tables, setTables] = useState<TableType[]>([]);
  const roomDefault=useSelector((state:IRootState)=>state.configuration.userData.roomDefaultId);
  const [roomSelected, setRoomSelected] = useState(roomDefault);

  useEffect(() => {
   getRooms();
   console.log('RoomDefault',roomDefault)

  }, [roomSelected]);


  const getRooms=()=>{
    axiosClient.post('/ObtenerSalones').then(data=>{
      setRooms((data as unknown) as RoomType[]);
      axiosClient.post('/ObtenerMesas',{SalonID:roomSelected}).then(data2=>{
        console.log(data2)
        setTables((data2 as unknown) as TableType[]);
      })
    })
  }





    return (
      <Card>
          <Card.Title><Text h4  bold>Mesas</Text></Card.Title>
          <Card.Divider />
        {rooms.length>0&&<PageNavigator rooms={rooms} roomSelected={roomSelected} setRoomSelected={setRoomSelected}/>}  
          <View style={styles.container}>
          {
        tables.map(table=><TableItem key={table.MesaID} item={table}/>)
       }
          </View>
     
      </Card>
    )
  
}



const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'row',
    flexWrap:'wrap',
    justifyContent:'space-around',
    

    }
})



export default TablesComponent
