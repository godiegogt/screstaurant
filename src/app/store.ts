import { configureStore} from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore,persistCombineReducers } from 'redux-persist';
import thunk from 'redux-thunk';

import configReducer from "../features/configurations/configurationSlice";
import reservationReducer from "../features/reservation/reservationSlice";
import orderReducer from "../features/order/orderSlice";
const rootReducer = { 
  configuration:configReducer,
  reservations:reservationReducer,
  order:orderReducer
 }



const persistConfig = {
  key: 'root',
  storage:AsyncStorage,
}

const persistedReducer = persistCombineReducers(persistConfig, rootReducer)


export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  // middleware: thunk
})

export type IRootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const persistor = persistStore(store)