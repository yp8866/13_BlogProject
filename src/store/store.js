import {configureStore} from '@reduxjs/toolkit'
import authreducers from './authSlice'
const store= configureStore({
    reducer:{
        authreducers
    }
})

export default store;