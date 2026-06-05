
import {configureStore} from '@reduxjs/toolkit'
import countReducer from './features/countSlice/countSlice'
import cartReducer from './features/cartSlice/cartSlice'
import { ecommerceApi } from '@/service/ecommerce';

// set up the store
export const makeStore = () =>  configureStore({
   reducer:{
    count: countReducer,
    cart: cartReducer,
    [ecommerceApi.reducerPath]: ecommerceApi.reducer
   },
   middleware: (getDefaultMiddleware) => 
      getDefaultMiddleware()
      .concat(ecommerceApi.middleware)
});

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
