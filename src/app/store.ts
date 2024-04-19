import { configureStore} from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore,persistCombineReducers } from 'redux-persist';
import thunk from 'redux-thunk';

import configReducer from "../features/configurations/configurationSlide";
import reservationReducer from "../features/reservation/reservationSlice";

const rootReducer = { 
  configuration:configReducer,
  reservations:reservationReducer
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

export const persistor = persistStore(store)