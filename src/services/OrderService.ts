import { IDeleteDetailReq } from "../features/order/interfaces/IDeleteDetailReq";
import { IReservation } from "../interfaces";
import axiosClient from "../utils/axiosClient"

export const getOrderByOrdenId = async (id: number) => {
    const { data, status } = await axiosClient.post('/ObtenerOrden', { OrdenID: id });

    if (status == 200) {
        return data as IReservation
    } else {
        return null
    }


}

export const createOrder=async (order:ICreateOrder)=>{
    const { data, status } = await axiosClient.post('/CrearOrden',  order );

    if (status == 200) {
        return data as IReservation
    } else {
        return null
    }
}

export const addArticles=async (order:IAddOrder)=>{
    const { data, status } = await axiosClient.post('/OrdenAgregarDetalle',  order );

    if (status == 200) {
        return data as IReservation
    } else {
        return null
    }
}

export const deleteDetails = async (details: IDeleteDetailReq) => {
    const { data, status } = await axiosClient.post('/OrdenEliminarDetalle',  details );

    if (status == 200) {
        return data as IReservation
    } else {
        return null
    }


}