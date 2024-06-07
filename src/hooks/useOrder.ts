import { StyleSheet, Text, View } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { IOrder, IReservation } from '../interfaces'
import { getOrderByOrdenId } from '../services/OrderService';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../app/store';
import { updateOrder,addDetail } from '../features/order/orderSlice';
import { generateuuid } from '../utils/idgenerator';
import { IDish, IModifiers } from '../interfaces/IOrder';

type userOrderProps = {
    OrderID?: number
}

const useOrder = () => {
    const { currentOrder } = useSelector((state: IRootState) => state.order);
    const {  selectors } = useSelector((state: IRootState) => state.reservations);
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

    const _addDetail = (dish: IDish,modifiers:IModifiers[]) => {
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

    const _deleteDetail=(order:IOrder)=>{

        

    }

    return (
        {
            addDetail:_addDetail,
            deleteDetail:_deleteDetail,
            order: currentOrder,
            changeOrder,
            getOrderById
        }
    )
}

export default useOrder

