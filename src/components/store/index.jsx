import {configureStore} from '@reduxjs/toolkit'
import { ProductSlice, productsFetch } from './features/ProductSlide'
import { productsApi } from './features/ProductApi'
import { CartSlice } from './features/CartSlice'


const store = configureStore({
    reducer:{
        products:ProductSlice.reducer,
        cart:CartSlice.reducer,
        [productsApi.reducerPath] : productsApi.reducer
    },
    middleware:(getDefaultMiddleware)=>{
        return getDefaultMiddleware().concat(productsApi.middleware)
    }
})



export default store