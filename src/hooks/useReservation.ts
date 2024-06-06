import { useDispatch, useSelector } from 'react-redux'
import { IRootState } from '../app/store'
import IOrder, { IDish, IModifiers } from '../interfaces/IOrder'
import { IReservation } from '../interfaces'
import { addReservation, addOrder as addOrderR, deleteOrder as _deleteOrder, changeCustomer, updateOrder, updatePaymentType as updatePayment, updateReservation } from '../features/reservation/reservationSlice'
import { generateuuid } from '../utils/idgenerator'
import axiosClient from '../utils/axiosClient'
import { useState } from 'react'
import { getTerminalID } from '../utils/getTerminalID'
import { AxiosResponse } from 'axios'


const useReservation = () => {
    const [isLoadingReservation, setisLoadingReservation] = useState(false)
    const { reservations, selectors } = useSelector((state: IRootState) => state.reservations);
    const { userData } = useSelector((state: IRootState) => state.configuration);
    const dispatch = useDispatch()

    const getReservation = () => {
        return reservations.find(item => item.room == selectors.room && item.table.MesaID == selectors.table.MesaID);
    }

    const addOrder = async (dish: IDish, selecciones: any) => {

        //Check if there is any reservation

        let reservation = reservations.find(item => item.room == selectors.room && item.table.MesaID == selectors.table.MesaID);
        console.log('reservation: ', reservation)
        if (reservation == undefined) {
            //Let's to create a new reservation
            let reservation: IReservation = {
                UUID: generateuuid(),
                room: selectors.room,
                table: selectors.table,
                MesaID: selectors.table.MesaID,
                state: 'new',
                DetalleOrden: [],
                paymentType: 'UNIFICADO',
                UsuarioID: userData.userId,
                Terminal: 'PRUEBA_TERMINAL'
            }
            let order: IOrder = {
                ComensalNo: selectors.customer,
                state: 'new',
                DetalleID: generateuuid(),
                reservation_UUID: reservation.UUID,
                ProductoID: dish.ProductoID,
                Descripcion: dish.Nombre,
                Precio: dish.Precio,
                Cantidad: 1,
                DetalleModificadores: selecciones,
            }

            reservation.DetalleOrden.push(order)

            //Add reservation to state

            dispatch(addReservation(reservation));


        } else {
            let order: IOrder = {
                ComensalNo: selectors.customer,
                state: 'new',
                DetalleID: generateuuid(),
                reservation_UUID: reservation.UUID,
                ProductoID: dish.ProductoID,
                Descripcion: dish.Nombre,
                Precio: dish.Precio,
                Cantidad: 1,
                DetalleModificadores: selecciones,

            }




            //Add reservation to state

            dispatch(addOrderR(order));

        }

    }

    const deleteOrder = async (order: IOrder) => {
        try {
            setisLoadingReservation(true);
            //Delete first from server
            const reservation = getReservation();
            let response = null;
            //Verify if the order has been already created
            if (reservation?.OrdenID && order.state != 'new') {
                response = await axiosClient.post('/OrdenEliminarDetalle', {
                    OrdenID: reservation?.OrdenID,
                    DetalleID: order.DetalleID,
                    Tipo: 'A',
                    UsuarioID: userData.userId,
                    Terminal: getTerminalID()

                });
                //If detail was deleted then
                if (response.data.CodigoError == 0) {
                    dispatch(_deleteOrder(order));
                }
                //If the order has not been created, jusst delete from store
            } else {
                dispatch(_deleteOrder(order));
            }

        } catch (error) {
            console.log(error)
        } finally {
            setisLoadingReservation(false);
        }
    }
    const getOrdersByReservation = () => {

        const order: IOrder[] | undefined = reservations.find(item => item.room == selectors.room && item.table.MesaID == selectors.table.MesaID)?.DetalleOrden
        return order

    }

    const changeOfCustomer = (order: IOrder, newCustomerId: number) => {
        const order2: IOrder = {
            ...order,
            ComensalNo: newCustomerId,
            reservation_UUID: order.reservation_UUID,
            state: order.state
        }
        //    console.log('item',order2);
        //    console.log('Rservations',reservations[0].orders[0])

        dispatch(changeCustomer(order2))

    }

    const updateOrders = (orders: IOrder[]) => {

        dispatch(updateOrder(orders))

    }

    const sendReservation = async () => {
        try {
            setisLoadingReservation(true)
            let reservation = reservations.find(item => item.table.MesaID == selectors.table.MesaID && item.room == selectors.room) as unknown as IReservation;
            reservation.DetalleOrden = reservation?.DetalleOrden.filter(item => item.state == 'new') as unknown as IOrder[];
            const { data, status } = await axiosClient.post('/CrearOrden', reservation);
            // const orders2=reservations.find(item=>item.table.MesaID==selectors.table.MesaID&&item.room==selectors.room)?.DetalleOrden.filter(item=>item.state!='new').concat(response.data);

            //add orders


            if (status == 200 && data.CodigoError == 0) {

                const response = await axiosClient.post('/ObtenerOrden', { OrdenID: data.OrdenID });
                //Modify orders state
                response.data.DetalleOrden = response.data.DetalleOrden.map((item: IOrder) => { return { ...item, state: 'created' } }) as IOrder[];
                //Update reservation data
                reservation = { ...reservation, ...response.data, OrdenID: data.OrdenID };
                //Update reservation redux
                dispatch(updateReservation(reservation));


                //updateOrders(reservation.DetalleOrden.map(item=>{return {...item,state:'created'}}) as IOrder[]);
                setisLoadingReservation(false)
                return null
            } else {
                setisLoadingReservation(false)
                return data.DescripcionError
            }







        } catch (error) {
            // console.log(axiosClient.getUri())
        } finally {
            setisLoadingReservation(false)
        }
    }

    const updatePaymentType = (method: 'UNIFICADO' | 'DIVIDIDO') => {
        dispatch(updatePayment(method));
    }

    const getReservationTotal = () => {

        return getOrdersByReservation()?.reduce((accumulator, currentValue) => accumulator + currentValue.Precio, 0,)
    }

    const getOrderByClintId = (id: number) => {
        return getOrdersByReservation()?.filter(item => item.ComensalNo == id && item.state != 'canceled').reduce((accumulator, currentValue) => accumulator + currentValue.Precio, 0,)
    }

    const getModifiersByProductoID = async (id: number) => {
        const request = await axiosClient.post('/ObtenerProductoModificadores', { ProductoID: id });

        return (request.data as unknown) as IModifiers[]

    }


    return (
        {
            addOrder,
            changeOfCustomer,
            deleteOrder,
            getOrderByClintId,
            getModifiersByProductoID,
            getOrdersByReservation,
            getReservation,
            getReservationTotal,
            sendReservation,
            updateOrders,
            updatePaymentType,
            isLoadingReservation
        }
    )
}

export default useReservation

