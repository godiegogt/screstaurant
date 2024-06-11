import { StyleSheet, Text, View } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { IOrder, IReservation } from '../interfaces'
import { addArticles, createOrder, deleteDetails, getOrderByOrdenId } from '../services/OrderService';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../app/store';
import { updateOrder, addDetail, deleteDetail, addToDeleteSate, restart } from '../features/order/orderSlice';
import { generateuuid } from '../utils/idgenerator';
import { IDish, IModifiers } from '../interfaces/IOrder';
import { IDeleteDetailReq, IDeleteDetailReqItem } from '../features/order/interfaces/IDeleteDetailReq';
import { buildCreateOrder, buildDetailDelete } from '../features/order/helpers/OrderBuilder';

type userOrderProps = {
    OrderID?: number
}

const useOrder = () => {
    const { currentOrder, toDelete } = useSelector((state: IRootState) => state.order);
    const { userData } = useSelector((state: IRootState) => state.configuration);
    const { selectors } = useSelector((state: IRootState) => state.reservations);
    const [isLoading, setisLoading] = useState(false);
    const dispatch = useDispatch()

    // useEffect(() => {
    //     if (props.OrderID) {
    //         getOrderById(props.OrderID)
    //     }
    // }, [props.OrderID])


    const changeOrder = (order: IReservation) => {
        dispatch(updateOrder(order))
    }

    const getOrderById = async (OrderID: number) => {
        const response = await getOrderByOrdenId(OrderID);
        if (response != null && response?.CodigoError == 0 && response.DetalleOrden.length > 0) {
            changeOrder(response)
            console.log('Orden', response)
        }


    }

    const _addDetail = (dish: IDish, modifiers: IModifiers[]) => {
        const order: IOrder = {
            ComensalNo: selectors.customer,
            state: 'new',
            DetalleID: generateuuid(),
            ProductoID: dish.ProductoID,
            Descripcion: dish.Nombre,
            Precio: dish.Precio,
            Cantidad: 1,
            DetalleModificadores: modifiers,
        }
        dispatch(addDetail(order))

    }

    const sendOrder = async () => {
        try {
            let response1 = null;
            let response2 = null;
            let response3 = null;
            setisLoading(true)
//This method must does 2 main actions. 1 Create new Orders, 2 Delete orders


//Step 1 Create new order/s
            //Verify if the order already exists
            //Otherwise just add new orders and use other service
            if (!selectors.table.OrdenID) {
                const reservation = buildCreateOrder(selectors.table, userData.userId, 'Terminal 1', currentOrder.DetalleOrden.map((item) => { return { ...item, DetalleID: 0, } }));
                console.log('New reservation: ', reservation)
                 response1=await createOrder(reservation);
            } else {
                const orders = currentOrder.DetalleOrden.filter(item => item.state == 'new').map((item) => { return { ...item, DetalleID: 0 } });
                const reservation = buildCreateOrder(selectors.table, userData.userId, 'Terminal 1', orders);
                console.log('Add articles: ', reservation);
                response2=addArticles(reservation);
            }
          
//Step 2 Delete orders
            if (toDelete.length > 0) {
                //Build data request
                let details: IDeleteDetailReq = buildDetailDelete(selectors.table.OrdenID as number, userData.userId, 'Temrinal 1', toDelete);
                response3 = await deleteDetails(details);

            }
            //If all ok Restart Order State
            dispatch(restart())


        } catch (error) {

        } finally {
            setisLoading(false)
        }


    }
    const _deleteDetail = (item: any, type: string) => {
        //If the article exists in the server, delete  from server and store
        let detail: IDeleteDetailReqItem = {
            DetalleID: item.DetalleID,
            Tipo: type
        }
        if (item.state != 'new') {
            //1. Step Add item to todelete store
            dispatch(addToDeleteSate(detail))
            //2. Step Delete item from store
            dispatch(deleteDetail(item.DetalleID))

            //Otherwise only delete from store
        } else {
            dispatch(deleteDetail(item.DetalleID))
        }


    }


    return (
        {
            addDetail: _addDetail,
            deleteDetail: _deleteDetail,
            order: currentOrder,
            changeOrder,
            getOrderById,
            isLoading,
            sendOrder
        }
    )
}

export default useOrder

