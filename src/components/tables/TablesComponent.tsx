import React, { useCallback, useState } from 'react'
import { View, StyleSheet, ActivityIndicator, ScrollView, RefreshControl } from 'react-native'
import { Text } from '../common'
import TableItem from './TableItem'
import { Card } from '@rneui/themed'
import PageNavigator from '../common/PageNavigator'
import { useDispatch, useSelector } from 'react-redux'
import { IRootState } from '../../app/store'
import { useFocusEffect } from '@react-navigation/native';
import Theme from '../../constants/Theme'
import useRooms from '../../hooks/useRooms'
import { IRoom } from '../../features/configurations/interfaces/IRoom'
import roomsService from '../../services/RoomsService'
import { updateRooms, updateTableStatus } from '../../features/configurations/configurationSlice'
export type TableType = {
  MesaID: number,
  Nombre: string,
  NumeroPersonas: number
  OrdenID?: number;
}



const TablesComponent = () => {
  const roomDefault = useSelector((state: IRootState) => state.configuration.userData.roomDefaultId);
  const [roomSelected, setRoomSelected] = useState(roomDefault);
  const rooms = useSelector((state: IRootState) => state.configuration.rooms);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch()
  const _getRooms = async () => {
    let roomsData = null;
    try {
      setIsLoading(true);
      roomsData = await roomsService.getRooms();

      //Fill out rooms and tables
      for (let index = 0; index < roomsData.length; index++) {
        //Do request for each room to fill out its tables
        roomsData[index].tables = await roomsService.getTables(roomsData[index].SalonID);
      }

      return roomsData

    } catch (err) {
      console.log(err)
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
      return roomsData;
    }


  }

  // const getTables = async (SalondID: number) => {
  //     try {
  //         setIsLoading(true);
  //         const tablesData = await roomsService.getTables(SalondID);
  //         // dispatch(updateTables(tablesData))
  //     } catch (err) {
  //         if (err instanceof Error) {
  //             setError(err.message);
  //         } else {
  //             setError('An unexpected error occurred');
  //         }
  //     } finally {
  //         setIsLoading(false);
  //     }


  // }

  const getTablesStatus = async (SalondID: number, newRooms: IRoom[]) => {

    try {
      setIsLoading(true);
      const tableStatusData = await roomsService.getTablesStatus(SalondID);

      if (tableStatusData.length > 0) {
        const room = newRooms.find(room => room.SalonID == SalondID)
        const tablesWithStatus = room?.tables.map((oldStatus) => {
          for (let index = 0; index < tableStatusData.length; index++) {
            if (oldStatus.MesaID == tableStatusData[index].MesaID) {
              return { ...oldStatus, OrdenID: tableStatusData[index].OrdenID }
            }
          }

          return oldStatus
        });

        if (tablesWithStatus) {
          const newrooms = newRooms.map((salon) =>
            salon.SalonID === SalondID
              ? { ...salon, tables: tablesWithStatus }
              : salon
          );
          dispatch(updateRooms(newrooms))
        }
      }

    } catch (err) {
      console.log('status error', err)
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  }



  useFocusEffect(
    React.useCallback(() => {
      getRooms();
    }, [roomSelected])
  );
  const getRooms = async () => {
    try {
      //Verify if there are not rooms

      const newRooms: any = await _getRooms();
      await getTablesStatus(roomSelected, newRooms)

    } catch (error) {
      setIsLoading(false)
    }
  }

  const onRefresh = useCallback(() => {
    getRooms();
  }, []);


  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
      }>
      <Card>
        <Card.Title><Text h4 bold>Mesas</Text></Card.Title>
        <Card.Divider />
        {rooms != undefined && rooms.length > 0 && <PageNavigator rooms={rooms} roomSelected={roomSelected} setRoomSelected={setRoomSelected} />}
        {
          !isLoading
            ?
            <View style={styles.container}>
              {
                rooms.find((room: IRoom) => room.SalonID == roomSelected) != undefined && rooms.find((room: IRoom) => room.SalonID == roomSelected)?.tables.map((table: TableType) => <TableItem key={table.MesaID} item={table} />)
              }
            </View>
            :
            <ActivityIndicator color={Theme.colors.primary} />
        }

      </Card>
    </ScrollView>
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
