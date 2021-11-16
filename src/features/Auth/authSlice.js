import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authApi from 'api/authApi'
import StorageKeys from 'constants/storage-keys'

export const register = createAsyncThunk(
	'auth/register',
	async (payload, thunkAPI) => {
		try {
			const data = await authApi.register(payload)
			localStorage.setItem(StorageKeys.TOKEN, data.jwt)
			localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user))
			return data.user
		} catch (error) {
			return thunkAPI.rejectWithValue(error.message[0].messages[0].message)
		}
	}
)

export const login = createAsyncThunk(
	'auth/login',
	async (payload, thunkAPI) => {
		try {
			const data = await authApi.login(payload)
			localStorage.setItem(StorageKeys.TOKEN, data.jwt)
			localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user))
			return data.user
		} catch (error) {
			return thunkAPI.rejectWithValue(error.message[0].messages[0].message)
		}
	}
)

const authSlice = createSlice({
	name: 'auth',
	initialState: {
		user: JSON.parse(localStorage.getItem(StorageKeys.USER)),
	},
	reducers: {
		logout(state) {
			localStorage.removeItem(StorageKeys.TOKEN)
			localStorage.removeItem(StorageKeys.USER)

			state.user = null
		},
	},
	extraReducers: {
		[register.fulfilled]: (state, action) => {
			state.user = action.payload
		},
		[login.fulfilled]: (state, action) => {
			state.user = action.payload
		},
	},
})

const { reducer, actions } = authSlice
export const { logout } = actions

export default reducer
