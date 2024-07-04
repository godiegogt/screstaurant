import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IOrder, IReservation, ISelectors } from '../../interfaces'
import { TableType } from '../../components/tables/TablesComponent';
import { IModifiers } from '../../interfaces/IOrder';
import { IDeleteDetailReqItem } from './interfaces/IDeleteDetailReq';
import { IChangeCustomerReq } from './interfaces/IChangeCustomerReq';

const initialState={
    currentOrder: {
        UUID: 0,
        room: 0,
        table: {} as TableType,
        MesaID: 0,
        state: "",
        DetalleOrden: [] as Array<IOrder>,
        paymentMethod: "",
        paymentType: 'UNIFICADO',
        UsuarioID: 0,
        Terminal: "",
        OrdenID: "",
        CodigoError: 0,
        DescripcionError: "",
        Total: 0,
    } as IReservation,
    toDelete:[] as IDeleteDetailReqItem[]
}

export const orderSlide = createSlice({
    name: 'order',
    initialState ,
    reducers: {

        updateOrder: (state, action: PayloadAction<IReservation>) => {
            console.log('Updating Order...')
            state.currentOrder = action.payload;
        },
        addDetail: (state, action: PayloadAction<IOrder>) => {
            state.currentOrder.DetalleOrden.push(action.payload)
        },
        addModifier: (state, action: PayloadAction<{DetalleID:number,modifier:IModifiers}>) => {
           // state.currentOrder.DetalleOrden.push(action.payload);
           const { DetalleID, modifier } = action.payload;
           const orderItem = state.currentOrder.DetalleOrden.find(item => item.DetalleID === DetalleID);
           if (orderItem) {
            orderItem.DetalleModificadores = [...orderItem.DetalleModificadores,modifier];
            orderItem.state='edited'
        }
        },
        deleteDetail:(state,action: PayloadAction<number>)=>{
            state.currentOrder.DetalleOrden=state.currentOrder.DetalleOrden.filter(order=>order.DetalleID!=action.payload)
        },
        removeDetalleModificadorItem(state, action: PayloadAction<{ DetalleOrdenID: number, ModificadorID: number }>) {
            const { DetalleOrdenID, ModificadorID } = action.payload;
            const orderItem = state.currentOrder.DetalleOrden.find(item => item.DetalleID === DetalleOrdenID);
            console.log('Order found: ',orderItem)
            if (orderItem) {
                orderItem.DetalleModificadores = orderItem.DetalleModificadores.filter(
                    modificador => modificador.DetalleModificadorID !== ModificadorID
                );
            }
        },
        addToDeleteStore:(state, action: PayloadAction<IDeleteDetailReqItem>)=>{
            state.toDelete.push(action.payload)
        },
        restart:() => initialState,
        changeCustomer: (state, action: PayloadAction<IChangeCustomerReq>) => {
      
            const order = state.currentOrder.DetalleOrden.find(item => item.DetalleID == action.payload.DetalleID);
            if (order) {
              order.ComensalNo = action.payload.ComensalNo;
            }
      
          },

    },
})

export const { updateOrder,addDetail,addModifier,deleteDetail,removeDetalleModificadorItem,addToDeleteStore,restart,changeCustomer } = orderSlide.actions

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
