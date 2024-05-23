import React, { Component, useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from '../common'
import TableItem from './TableItem'
import { Card } from '@rneui/themed'
import PageNavigator from '../common/PageNavigator'
import axiosClient from '../../utils/axiosClient'
import { useSelector } from 'react-redux'
import { IRootState } from '../../app/store'

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
  const [rooms, setRooms] = useState<RoomType[]>([]);
  const [tables, setTables] = useState<TableType[]>([]);
  const roomDefault = useSelector((state: IRootState) => state.configuration.userData.roomDefaultId);
  const [roomSelected, setRoomSelected] = useState(roomDefault);

  useEffect(() => {
    getRooms();

  }, [roomSelected]);


  const getRooms = () => {
    axiosClient.post('/ObtenerSalones').then(data => {
      setRooms((data.data as unknown) as RoomType[]);
      axiosClient.post('/ObtenerMesas', { SalonID: roomSelected }).then(data2 => {
        setTables((data2.data as unknown) as TableType[]);

        axiosClient.post('/ObtenerMesasStatus', { SalonID: roomSelected }).then(data3 => {
          const oldTables=(data2.data as unknown) as TableType[]
          
          //Check if there are new orders
          const newSstatesTables = (data3 as unknown) as TableType[];
          if (newSstatesTables.length > 0) {
            const tablesWithStatus = oldTables.map((oldStatus) => {
              for (let index = 0; index < newSstatesTables.length; index++) {
                // const newState = newSstatesTables[index];
             
                if (oldStatus.MesaID == newSstatesTables[index].MesaID) {
                
                  return { ...oldStatus, OrdenID: newSstatesTables[index].OrdenID }
                }               }
            
              return oldStatus
            });
           
            setTables(tablesWithStatus)
          } else {
            //DOnt do anything because there arent new orders
          }
        });

      })
    })
  }





  return (
    <Card>
      <Card.Title><Text h4 bold>Mesas</Text></Card.Title>
      <Card.Divider />
      {rooms != undefined && rooms.length > 0 && <PageNavigator rooms={rooms} roomSelected={roomSelected} setRoomSelected={setRoomSelected} />}
      <View style={styles.container}>
        {
          tables != undefined && tables.map(table => <TableItem key={table.MesaID} item={table} />)
        }
      </View>

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
