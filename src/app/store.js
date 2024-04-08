import { configureStore } from '@reduxjs/toolkit'
import configurationReducer from '../features/configurations/configurationSlide'
export default configureStore({
  reducer: {
    configuration:configurationReducer
  }
})