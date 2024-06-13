import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { IOrder, IReservation } from '../interfaces'
import { addArticles, changeOfCustomer, createOrder, deleteDetails, getOrderByOrdenId } from '../services/OrderService';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../app/store';
import { updateOrder, addDetail, deleteDetail, removeDetalleModificadorItem, addToDeleteStore, restart, addModifier, changeCustomer } from '../features/order/orderSlice';
import { generateuuid } from '../utils/idgenerator';
import { IDish, IModifiers } from '../interfaces/IOrder';
import { IDeleteDetailReq, IDeleteDetailReqItem } from '../features/order/interfaces/IDeleteDetailReq';
import { buildAddOrder, buildCreateOrder, buildDetailDelete } from '../features/order/helpers/OrderBuilder';
import { IChangeCustomerReq } from '../features/order/interfaces/IChangeCustomerReq';

type userOrderProps = {
    OrderID?: number
}

const useOrder = () => {
    const { currentOrder, toDelete } = useSelector((state: IRootState) => state.order);
    const { userData } = useSelector((state: IRootState) => state.configuration);
    const { selectors } = useSelector((state: IRootState) => state.reservations);
    const [isLoading, setisLoading] = useState(false);
    const dispatch = useDispatch()

    const changeOrder = (order: IReservation) => {
        dispatch(updateOrder(order))
    }

    const getOrderById = async (OrderID: number) => {
        const response = await getOrderByOrdenId(OrderID);
        if (response != null && response?.CodigoError == 0 && response.DetalleOrden.length > 0) {
            changeOrder(response)
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

    const _addModifier = (DetalleID: number, modifier: IModifiers) => {
        console.log(modifier)
        dispatch(addModifier({ DetalleID, modifier }))
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
                response1 = await createOrder(reservation);
            } else {
                //Filter by state new and edited (it has new modifiers)
                //Then filter modifiers by state new
                const orders = currentOrder.DetalleOrden.filter(item => item.state == 'new' || item.state == 'edited').map((item2) => { return { ...item2, DetalleID: item2.state == 'new' ? 0 : item2.DetalleID, DetalleModificadores: item2.DetalleModificadores.filter(item3 => item3.state == 'new') } });
                const reservation = buildAddOrder(selectors.table, userData.userId, 'Terminal 1', orders);
                response2 = addArticles(reservation);
            }

            //Step 2 Delete orders
            if (toDelete.length > 0) {
                //Build data request
                let details: IDeleteDetailReq = buildDetailDelete(selectors.table.OrdenID as number, userData.userId, 'Temrinal 1', toDelete);
                response3 = await deleteDetails(details);

            }



        } catch (error) {

        } finally {
            //If all ok Restart Order State
            dispatch(restart())
            setisLoading(false)
        }


    }
    const _deleteDetail = (item: any) => {
        //If the article exists in the server, delete  from server and store
        let detail: IDeleteDetailReqItem = {
            DetalleID: item.DetalleID,
            Tipo: 'A'
        }
        if (item.state != 'new') {
            //1. Step Add item to todelete store
            dispatch(addToDeleteStore(detail))
            //2. Step Delete item from store
            dispatch(deleteDetail(item.DetalleID))

            //Otherwise only delete from store
        } else {
            dispatch(deleteDetail(item.DetalleID))
        }


    }

    const _deleteModifier = (DetalleOrdenID: number, modifier: any) => {
        if (modifier.state != 'new') {
            let detail: IDeleteDetailReqItem = {
                DetalleID: modifier.DetalleModificadorID,
                Tipo: 'M'
            };
            //1. Step Add item to todelete store
            dispatch(addToDeleteStore(detail))
            //2. Step Delete item from store
            dispatch(removeDetalleModificadorItem({ DetalleOrdenID, ModificadorID: modifier.DetalleModificadorID }))

            //Otherwise only delete from store
        } else {
            dispatch(removeDetalleModificadorItem({ DetalleOrdenID, ModificadorID: modifier.DetalleModificadorID }))
        }
    }

    const _changeOfCustomer = async (DetalleID: number, CustomerID: number) => {

        const changeCustomerData: IChangeCustomerReq = {
            ComensalNo: CustomerID,
            OrderID: selectors.table.OrdenID,
            DetalleID: DetalleID,
            Terminal: 'Terminal 1',
            Usuario: userData.userId
        }
        // console.log('CHange COmensal: ', changeCustomerData)
        // return

        try {
            setisLoading(true);
            const response = await changeOfCustomer(changeCustomerData);
            if (response == null) {
                Alert.alert('No fue posible cambiar comensal.');
                return
            }
            dispatch(changeCustomer(changeCustomerData))
        } catch (error) {

        } finally {
            setisLoading(false)
        }



    }


    return (
        {
            addDetail: _addDetail,
            addModifier: _addModifier,
            deleteDetail: _deleteDetail,
            deleteModifier: _deleteModifier,
            changeOfCustomer: _changeOfCustomer,
            order: currentOrder,
            changeOrder,
            getOrderById,
            isLoading,
            sendOrder
        }
    )
}

export default useOrder

