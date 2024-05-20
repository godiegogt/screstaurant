import { useDispatch, useSelector } from 'react-redux'
import { IRootState } from '../app/store'
import IOrder, { IDish } from '../interfaces/IOrder'
import { IReservation } from '../interfaces'
import { addReservation,addOrder as addOrderR, deleteOrder as _deleteOrder, changeCustomer, updateOrder,updatePaymentType as updatePayment} from '../features/reservation/reservationSlice'
import { generateuuid } from '../utils/idgenerator'
import axiosClient from '../utils/axiosClient'


const useReservation = () => {
    const {reservations,selectors} = useSelector((state: IRootState) => state.reservations);
    const dispatch = useDispatch()
    
    const getReservation=()=>{
       return reservations.find(item => item.room == selectors.room && item.table == selectors.table);
    }
    
    const addOrder = (dish: IDish) => {

        //Check if there is any reservation

        let reservation = reservations.find(item => item.room == selectors.room && item.table == selectors.table);

       
        
       
        if (reservation == undefined) {
            //Let's to create a new reservation
            let reservation: IReservation = {
                UUID: generateuuid(),
                room: selectors.room,
                table: selectors.table,
                state: 'new',
                orders: [],
                paymentType:'UNIFICADO'
            }
            let order: IOrder = {
                customer: selectors.customer,
                dish: dish,
                state: 'new',
                UUID: generateuuid(),
                reservation_UUID:reservation.UUID

            }
            order.dish.amount=1;
            reservation.orders.push(order)

            //Add reservation to state

            dispatch(addReservation(reservation));


        }else{
            let order: IOrder = {
                customer: selectors.customer,
                dish: dish,
                state: 'new',
                UUID: generateuuid(),
                reservation_UUID:reservation.UUID

            }
            order.dish.amount=1;

           

            //Add reservation to state

            dispatch(addOrderR(order));
            
        }

    }

    const deleteOrder=(order:IOrder)=>{
        dispatch(_deleteOrder(order));
    }
const getOrdersByReservation=()=>{

    const order:IOrder[]|undefined=reservations.find(item=>item.room==selectors.room && item.table==selectors.table)?.orders
return order

}

const changeOfCustomer=(order:IOrder,newCustomerId:number)=>{
   const order2:IOrder={
UUID:order.UUID,
dish:order.dish,
customer:newCustomerId,
reservation_UUID:order.reservation_UUID,
state:order.state
   }
//    console.log('item',order2);
//    console.log('Rservations',reservations[0].orders[0])

   dispatch(changeCustomer(order2)) 

}

const updateOrders=(orders:IOrder[])=>{

dispatch(updateOrder(orders))

}

const sendReservation= async ()=>{
try {
    const orders=reservations.find(item=>item.table==selectors.table&&item.room==selectors.room)?.orders.filter(item=>item.state=='new') as IOrder[];
    const response=  await axiosClient.post('/sendorder',orders) as IOrder[];
    console.log('response',response);
    const orders2=reservations.find(item=>item.table==selectors.table&&item.room==selectors.room)?.orders.filter(item=>item.state!='new').concat(response);
    updateOrders(orders2 as IOrder[])

   
    
 
    
} catch (error) {
    console.log(axiosClient.getUri())
}
}

const updatePaymentType=(method:'UNIFICADO'|'DIVIDIDO')=>{
dispatch(updatePayment(method));
}

const getReservationTotal=()=>{

   return getOrdersByReservation()?.reduce((accumulator, currentValue) => accumulator + currentValue.dish.Precio,0,)
}

const getOrderByClintId=(id:number)=>{
return getOrdersByReservation()?.filter(item=>item.customer==id&&item.state!='canceled').reduce((accumulator, currentValue) => accumulator + currentValue.dish.Precio,0,)
}

    return (
        {
            addOrder,
            changeOfCustomer,
            deleteOrder,
            getOrderByClintId,
            getOrdersByReservation,
            getReservation,
            getReservationTotal,
            sendReservation,
            updateOrders,
            updatePaymentType,
        }
    )
}

export default useReservation

