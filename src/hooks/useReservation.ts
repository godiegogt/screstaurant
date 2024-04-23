import { useDispatch, useSelector } from 'react-redux'
import { IRootState } from '../app/store'
import IOrder, { IDish } from '../interfaces/IOrder'
import { IReservation } from '../interfaces'
import { addReservation,addOrder as addOrderR, deleteOrder as _deleteOrder, changeCustomer} from '../features/reservation/reservationSlice'
import { generateuuid } from '../utils/idgenerator'


const useReservation = () => {
    const {reservations,selectors} = useSelector((state: IRootState) => state.reservations);
    const dispatch = useDispatch()
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
                orders: []
            }
            let order: IOrder = {
                customer: selectors.customer,
                dish: dish,
                state: 'new',
                UUID: generateuuid(),
                reservation_UUID:reservation.UUID

            }
            order.dish.amount=0;
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

    return (
        {
            addOrder,
            getOrdersByReservation,
            deleteOrder,
            changeOfCustomer
        }
    )
}

export default useReservation

