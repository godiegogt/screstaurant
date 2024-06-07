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