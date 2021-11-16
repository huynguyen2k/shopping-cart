import { configureStore } from '@reduxjs/toolkit'
import authReducer from 'features/Auth/authSlice'
import cartReducer from 'features/Cart/cartSlice'

const rootReducer = {
	auth: authReducer,
	cart: cartReducer,
}

const store = configureStore({
	reducer: rootReducer,
})

export default store
