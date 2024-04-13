import { configureStore} from "@reduxjs/toolkit";
import configReducer from "../features/configurations/configurationSlide";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { persistReducer, persistStore,persistCombineReducers } from 'redux-persist';
import thunk from 'redux-thunk';


const rootReducer = { 
  configuration:configReducer
 }

const persistConfig = {
  key: 'root',
  storage:AsyncStorage,
}

const persistedReducer = persistCombineReducers(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: thunk
})

export const persistor = persistStore(store)