import { useDispatch, useSelector } from "react-redux"
import { IRootState } from "../app/store"
import { useState } from "react";
import roomsService from "../services/RoomsService";
import { updateRooms, updateTableStatus } from "../features/configurations/configurationSlice";


const useRooms = () => {
    const dispatch = useDispatch()
    const rooms = useSelector((state: IRootState) => state.configuration.rooms);
    const [isLoading, setisLoading] = useState(false);
    const [error, setError] = useState("");

    const getRooms = async () => {
        let roomsData = null;
        try {
            setisLoading(true);
            roomsData = await roomsService.getRooms();

            //Fill out rooms and tables
            for (let index = 0; index < roomsData.length; index++) {
                //Do request for each room to fill out its tables
                roomsData[index].tables = await roomsService.getTables(roomsData[index].SalonID);
            }
            dispatch(updateRooms(roomsData))
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unexpected error occurred');
            }
        } finally {
            setisLoading(false);
            return roomsData;
        }


    }

    // const getTables = async (SalondID: number) => {
    //     try {
    //         setisLoading(true);
    //         const tablesData = await roomsService.getTables(SalondID);
    //         // dispatch(updateTables(tablesData))
    //     } catch (err) {
    //         if (err instanceof Error) {
    //             setError(err.message);
    //         } else {
    //             setError('An unexpected error occurred');
    //         }
    //     } finally {
    //         setisLoading(false);
    //     }


    // }

    const getTablesStatus = async (SalondID: number) => {
        try {
setisLoading(true);
            const tableStatusData = await roomsService.getTablesStatus(SalondID);

            if (tableStatusData.length > 0) {
                const room = rooms.find(room => room.SalonID == SalondID)
                const tablesWithStatus = room?.tables.map((oldStatus) => {
                    for (let index = 0; index < tableStatusData.length; index++) {
                        if (oldStatus.MesaID == tableStatusData[index].MesaID) {
                            return { ...oldStatus, OrdenID: tableStatusData[index].OrdenID }
                        }
                    }

                    return oldStatus
                });

               if(tablesWithStatus){
                dispatch(updateTableStatus({ SalondID, tables: tablesWithStatus }))
               }
            }

            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An unexpected error occurred');
                }
            } finally {
                setisLoading(false);
            }
        }



    return (
            {
                rooms,
                getTablesStatus,
                getRooms,
                isLoading,
                error
            }
        )
    }

    export default useRooms

