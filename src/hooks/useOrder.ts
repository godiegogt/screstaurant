import { StyleSheet, Text, View } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { IOrder, IReservation } from '../interfaces'
import { getOrderByOrdenId } from '../services/OrderService';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../app/store';
import { updateOrder } from '../features/order/orderSlice';

type userOrderProps = {
    OrderID?: number
}

const useOrder = (props: userOrderProps) => {
    const { currentOrder } = useSelector((state: IRootState) => state.order);
    const dispatch = useDispatch()

    useEffect(() => {
        if (props.OrderID) {
            getOrderById(props.OrderID)
        }
    }, [props.OrderID])

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

    const addDetail = (article: IOrder) => {
        currentOrder?.DetalleOrden.push(article)
        if (currentOrder) {
            changeOrder(currentOrder);
        }

    }

    return (
        {
            addDetail,
            order: currentOrder,
            changeOrder,
            getOrderById
        }
    )
}

export default useOrder

