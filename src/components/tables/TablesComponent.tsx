import React, { useCallback,  useState } from 'react'
import { View, StyleSheet, ActivityIndicator, ScrollView, RefreshControl } from 'react-native'
import { Text } from '../common'
import TableItem from './TableItem'
import { Card } from '@rneui/themed'
import PageNavigator from '../common/PageNavigator'
import { useSelector } from 'react-redux'
import { IRootState } from '../../app/store'
import { useFocusEffect } from '@react-navigation/native';
import Theme from '../../constants/Theme'
import useRooms from '../../hooks/useRooms'
import { IRoom } from '../../features/configurations/interfaces/IRoom'
export type TableType = {
  MesaID: number,
  Nombre: string,
  NumeroPersonas: number
  OrdenID?: number;
}



const TablesComponent = () => {
  const roomDefault = useSelector((state: IRootState) => state.configuration.userData.roomDefaultId);
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

   } catch (error) {
    
   }
  }


  const onRefresh = useCallback(() => {
    getRooms();
  }, []);


  return (
   <ScrollView
   refreshControl={
    <RefreshControl refreshing={roomsHook.isLoading} onRefresh={onRefresh} />
  }>
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
