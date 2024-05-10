import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IOrder, IReservation, ISelectors } from '../../interfaces'
import { IDIshR } from './interfaces'

export const reservationSlide = createSlice({
  name: 'reservations',
  initialState: {
    selectors: { room: 1, table: 0, customer: 1 } as ISelectors,
    reservations: [] as Array<IReservation>
  },
  reducers: {

    selectRoom: (state, action: PayloadAction<number>) => {

      state.selectors.room = action.payload;
    },
    selectTable: (state, action: PayloadAction<number>) => {

      state.selectors.table = action.payload;
    },
    selectCustomer: (state, action: PayloadAction<number>) => {

      state.selectors.customer = action.payload;
    },

    addReservation: (state, action: PayloadAction<IReservation>) => {

      state.reservations = [...state.reservations, action.payload]
    },
    updateOrder: (state, action: PayloadAction<IOrder[]>) => {
let reservation=state.reservations.find(item=>item.UUID==action.payload[0].reservation_UUID);
      if(reservation){
        reservation.orders=action.payload;
      }
    },
    
    deleteReservation: (state, action: PayloadAction<number>) => {

      state.reservations = state.reservations.filter(item => item.UUID != action.payload)
    },
    addOrder: (state, action: PayloadAction<IOrder>) => {

      state.reservations.filter(item => item.UUID == action.payload.reservation_UUID)[0].orders.push(action.payload)
    },
    deleteOrder: (state, action: PayloadAction<IOrder>) => {

      const reservation: IReservation | undefined = state.reservations.find(item => item.UUID == action.payload.reservation_UUID);

      if (reservation != undefined && reservation.orders != undefined) {
        const orders: IOrder[] = reservation.orders.filter(item => item.UUID != action.payload.UUID);
        reservation.orders = orders;
      }


    },
    updatePaymentType: (state, action: PayloadAction<'UNIFICADO'|'DIVIDIDO'>) => {
let reservation=state.reservations.find(item=>item.room==state.selectors.room&&item.table==state.selectors.table);
     if(reservation){
      reservation.paymentType=action.payload
     }
    },
    updatePaymentMethod: (state, action: PayloadAction<string>) => {
      let reservation=state.reservations.find(item=>item.room==state.selectors.room&&item.table==state.selectors.table);
           if(reservation){
            reservation.paymentMethod=action.payload
           }
          },
    changeCustomer: (state, action: PayloadAction<IOrder>) => {
      //console.log('State: ',state.reservations.find(item=>item.UUID==action.payload.reservation_UUID)?.orders.filter(item=>item.UUID!=action.payload.UUID).push(action.payload));

      // const reservation = state.reservations.find(item => item.UUID == action.payload.reservation_UUID);

      // if (reservation != undefined && reservation.orders != undefined) {
      //   let orders: IOrder[] = reservation.orders.filter(item => item.UUID != action.payload.UUID);
      //   orders = [...orders, action.payload]
      //   console.log('orders: ',orders)
      //   reservation.orders = orders;
      // }

      const order = state.reservations.find(item => item.UUID == action.payload.reservation_UUID)?.orders.find(item => item.UUID == action.payload.UUID);
     if(order){
    order.customer=action.payload.customer;
     }
     
    },
    addDish: (state, action: PayloadAction<IDIshR>) => {

      const reservation = state.reservations.filter(item => item.UUID == action.payload.reservation_UUID)[0];
      reservation.orders.filter(item => item.UUID == action.payload.order_UUID)[0].dish = action.payload.dish
      state.reservations = [...state.reservations, reservation]
    },
    deleteDish: (state, action: PayloadAction<IDIshR>) => {

      // const dishes = state.reservations.filter(item => item.UUID == action.payload.reservation_UUID)[0].order.filter(item => item.UUID == action.payload.order_UUID)[0].dish.filter(item => item.UUID != action.payload.dish.UUID);
      // const reservation = state.reservations.filter(item => item.UUID == action.payload.reservation_UUID)[0];
      // reservation.order.filter(item => item.UUID == action.payload.order_UUID)[0].dish = dishes
      // state.reservations = [...state.reservations, reservation];
    },



  },
})

export const { addReservation, deleteReservation, addOrder, deleteOrder, addDish, deleteDish, selectRoom, selectTable, selectCustomer, changeCustomer,updateOrder,updatePaymentType,updatePaymentMethod } = reservationSlide.actions

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
// export const incrementAsync = (amount:number) => (dispatch:any) => {
//   setTimeout(() => {
//     dispatch(incrementByAmount(amount))
//   }, 1000)
// }

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectReservations = (state: any) => state.reservations

export default reservationSlide.reducer
