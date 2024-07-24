import React, { Component, useEffect, useState } from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import { Text } from '../common'
import TableItem from './TableItem'
import { Card } from '@rneui/themed'
import PageNavigator from '../common/PageNavigator'
import axiosClient from '../../utils/axiosClient'
import { useSelector } from 'react-redux'
import { IRootState } from '../../app/store'
import { useFocusEffect } from '@react-navigation/native';
import { restart } from '../../features/order/orderSlice'
import Theme from '../../constants/Theme'
import useRooms from '../../hooks/useRooms'
import { IRoom } from '../../features/configurations/interfaces/IRoom'
export type TableType = {
  MesaID: number,
  Nombre: string,
  NumeroPersonas: number
  OrdenID?: number;
}

type RoomType = {
  Nombre: string,
  SalonID: number
}

const TablesComponent = () => {
  const [tables, setTables] = useState<TableType[]>([]);
  const roomDefault = useSelector((state: IRootState) => state.configuration.userData.roomDefaultId);
  const [rooms, setRooms] = useState<RoomType[]>([]);
  const [isLoading, setisLoading] = useState(false)
  const [roomSelected, setRoomSelected] = useState(roomDefault);
  const roomsHook=useRooms();

  useFocusEffect(
    React.useCallback(() => {
      getRooms();
    }, [roomSelected])
  );
  const getRooms = async () => {
    try {
      //Verify if there are not rooms
      if(roomsHook.rooms.length == 0){
        await roomsHook.getRooms();
      }

      await roomsHook.getTablesStatus(roomSelected)

      
      // if (roomsHook.rooms.length == 0) {
      //   await roomsHook.getRooms();
      //   if (roomsHook.tables.length==0) {
      //     await roomsHook.getTables(roomSelected);
      //   }
      // }


    // setisLoading(true);
    // axiosClient.post('/ObtenerSalones').then(data => {
    //   setRooms((data.data as unknown) as RoomType[]);
    //   axiosClient.post('/ObtenerMesas', { SalonID: roomSelected }).then(data2 => {
    //    setTables((data2.data as unknown) as TableType[]);
    //     axiosClient.post('/ObtenerMesasStatus', { SalonID: roomSelected }).then(data3 => {
    //       const oldTables=(data2.data as unknown) as TableType[]
    
    //       //Check if there are new orders
    //       const newSstatesTables = (data3.data as unknown) as TableType[];
        
    //       if (newSstatesTables.length > 0) {
    //         const tablesWithStatus = oldTables.map((oldStatus) => {
    //           for (let index = 0; index < newSstatesTables.length; index++) {
    //             // const newState = newSstatesTables[index];
             
    //             if (oldStatus.MesaID == newSstatesTables[index].MesaID) {
                
    //               return { ...oldStatus, OrdenID: newSstatesTables[index].OrdenID }
    //             }               }
            
    //           return oldStatus
    //         });
    //         setTables(tablesWithStatus);
    //         setisLoading(false)
    //       } else {
    //         //DOnt do anything because there arent new orders
    //       }
    //     }).catch(e=>{
    //       console.log(e)
    //       setisLoading(false)
    //     });

    //   }).catch(err=>{
    //     setisLoading(false)
    //   })
    // }).catch(err=>{
    //   setisLoading(false)
    // })
   } catch (error) {
    
   }
  }





  return (
    <Card>
      <Card.Title><Text h4 bold>Mesas</Text></Card.Title>
      <Card.Divider />
      {roomsHook.rooms != undefined && roomsHook.rooms.length > 0 && <PageNavigator rooms={roomsHook.rooms} roomSelected={roomSelected} setRoomSelected={setRoomSelected} />}
      {
        !roomsHook.isLoading
        ?
        <View style={styles.container}>
        {
          roomsHook.rooms.find((room:IRoom)=>room.SalonID==roomSelected) != undefined && roomsHook.rooms.find((room:IRoom)=>room.SalonID==roomSelected)?.tables.map((table:TableType) => <TableItem key={table.MesaID} item={table} />)
        }
      </View>
      :
      <ActivityIndicator color={Theme.colors.primary}/>
      }

    </Card>
  )

}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',


  }
})



export default TablesComponent
