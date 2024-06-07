import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IOrder, IReservation, ISelectors } from '../../interfaces'
import { TableType } from '../../components/tables/TablesComponent';

export const orderSlide = createSlice({
  name: 'order',
  initialState: {
   currentOrder:{ 
    UUID:0,
    room:0,
    table:{} as TableType,
    MesaID:0,
    state:"",
    DetalleOrden:[] as Array<IOrder>,
    paymentMethod:"",
    paymentType:'UNIFICADO',
    UsuarioID:0,
    Terminal:"",
    OrdenID:"",
    CodigoError: 0,
    DescripcionError: "",
    Total: 0,} as IReservation
  },
  reducers: {

    updateOrder: (state, action: PayloadAction<IReservation>) => {
     state.currentOrder=action.payload;
    }

  },
})

export const { updateOrder } = orderSlide.actions

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

export default orderSlide.reducer
