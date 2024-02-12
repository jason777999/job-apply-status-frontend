import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./slices/auth";
import messageReducer from "./slices/message";
import jobReducer from './slices/job'

const reducer = {
  auth: authReducer,
  message: messageReducer,
  job : jobReducer
}

const store = configureStore({
  reducer: reducer,
  devTools: true,
})

export default store;
