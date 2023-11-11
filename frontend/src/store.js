import {configureStore} from '@reduxjs/toolkit';
import apiSlice from './slices/apiSlice';
import authSlice from './slices/authSlice';
const store = configureStore({
    reducer:{
        // api reducer
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth:authSlice
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(apiSlice.middleware)
})

export default store;